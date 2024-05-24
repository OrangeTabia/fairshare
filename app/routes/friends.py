from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy import select, delete

from app.models import User, db, friends, FriendsExpense
from app.forms import AddFriendForm

friends_routes = Blueprint("friends", __name__)


@friends_routes.route("")
@login_required
def friends_list():
    """
    Query for all current user's friends and returns them in a list of user dictionaries
    """

    added_by_friend = (
        db.session.query(User)
        .join(friends, User.id == friends.c.user_id)
        .filter(friends.c.friend_id == current_user.id)
    ).all()
    added_by_me = (
        db.session.query(User)
        .join(friends, User.id == friends.c.friend_id)
        .filter(friends.c.user_id == current_user.id)
    ).all()

    all_friends = added_by_friend + added_by_me

    return [friend.to_dict() for friend in all_friends]


@friends_routes.route("/new", methods=["GET", "POST"])
@login_required
def new_friend():
    """
    Add a friend by email to the current user's friends list
    """

    form = AddFriendForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        user = User.query.get(current_user.id)
        friend = User.query.filter_by(email=form.data["email"]).first()
        user.friends.append(friend)

        db.session.commit()

        return friend.to_dict()
    else:
        return form.errors, 401


@friends_routes.route("/<int:friends_id>/delete")
@login_required
def delete_friend(friends_id):
    """
    Delete a friendship by friend ID and user ID from the current user's friends list, and the corresponding friends list
    """

    added_by_me = (
        db.session.query(friends)
        .filter_by(user_id=current_user.id, friend_id=friends_id)
        .first()
    )

    if added_by_me:
        db.session.execute(
            db.delete(friends).filter_by(
                friend_id=friends_id, user_id=current_user.id
            )
        )
    else:
        db.session.execute(
            db.delete(friends).filter_by(friend_id=current_user.id, user_id=friends_id)
        )

    # Because of the structure of the join table I do not know how to set a cascade on delete
    # This is brute force code - to change in the future
    # When an expense is deleted, all corresponding payments and comments are deleted
    payerExpenses = FriendsExpense.query.filter_by(payer_id=current_user.id, receiver_id=friends_id).all()
    receiverExpenses = FriendsExpense.query.filter_by(payer_id=friends_id, receiver_id=current_user.id).all()

    for expense in payerExpenses:
        db.session.delete(expense)
    for expense in receiverExpenses:
        db.session.delete(expense)

    db.session.commit()

    return {"message": "Friend successfully deleted"}

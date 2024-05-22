from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy import select, delete

from app.models import User, db, friends
from app.forms import AddFriendForm

friends_routes = Blueprint("friends", __name__)


@friends_routes.route("")
@login_required
def friends_list():
    """
    Query for all current user's friends and returns them in a list of user dictionaries
    """
    # print(help(friends.c.__getitem__("friend_id")))
    added_by_friend = (
        db.session.query(User)
        .join(friends, User.id == friends.c.user_id)
        .filter(friends.c.friend_id == 55)
    ).all()
    # added_by_friend = db.session.execute(
    #     f"SELECT users.* FROM users JOIN friends ON users.id = friends.user_id WHERE friends.friend_id = {current_user.id};"
    # ).all()
    added_by_me = (
        db.session.query(User)
        .join(friends, User.id == friends.c.friend_id)
        .filter(friends.c.user_id == 55)
    ).all()
    # added_by_me = db.session.execute(
    #     f"SELECT users.* FROM users JOIN friends ON users.id = friends.friend_id WHERE friends.user_id = {current_user.id};"
    # ).all()
    # db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")

    user_55 = User.query.get(55)

    all_friends = added_by_friend + added_by_me

    print("-------------->", user_55.name, all_friends)

    # return [friend for friend in all_friends]
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
        friend.friends.append(user)

        db.session.commit()

        friends_info = User.query.get(friend.id)

        return friends_info.to_dict()
    else:
        return form.errors, 401


@friends_routes.route("/<int:friends_id>/delete")
@login_required
def delete_friend(friends_id):
    """
    Delete a friendship by friend ID and user ID from the current user's friends list, and the corresponding friends list
    """

    db.session.execute(
        db.delete(friends).filter_by(friend_id=friends_id, user_id=current_user.id)
    )
    db.session.execute(
        db.delete(friends).filter_by(friend_id=current_user.id, user_id=friends_id)
    )

    db.session.commit()

    return {"message": "Friend successfully deleted"}

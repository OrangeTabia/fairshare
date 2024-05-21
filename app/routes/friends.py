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
    user = User.query.get(current_user.id)
    friends = user.friends.all()

    return [friend.to_dict() for friend in friends]


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
        friend = User.query.filter_by(email=form.data['email']).first()
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

    db.session.execute(db.delete(friends).filter_by(friend_id=friends_id, user_id=current_user.id))
    db.session.execute(db.delete(friends).filter_by(friend_id=current_user.id, user_id=friends_id))

    db.session.commit()

    return {"message": "Friend successfully deleted"}

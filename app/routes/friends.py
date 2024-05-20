from flask import Blueprint, request
from flask_login import login_required, current_user

from app.models import User, Friend, db
from app.forms import AddFriendForm

friends_routes = Blueprint("friends", __name__)


@friends_routes.route("/")
@login_required
def friends_list():
    """
    Query for all current user's friends and returns them in a list of user dictionaries
    """
    friends = Friend.query.filter_by(user_id=current_user.id).all()

    friends_info = [
        User.query.filter_by(id=friend.friend_id).first() for friend in friends
    ]

    # sorted(friends_info, key=lambda friend: friend.to_dict()["name"])

    return [friend.to_dict() for friend in friends_info]


@friends_routes.route("/add_friend", methods=["GET", "POST"])
def new_friend():
    """
    Add a friend by email to the current user's friends list
    """

    form = AddFriendForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        friend = User.query.filter_by(email=form.data["email"]).first()

        is_friend = list(
            Friend.query.filter_by(user_id=current_user.id, friend_id=friend.id)
        )

        if len(is_friend) >= 1:
            return {"message": f"You are already friends with {friend.name}"}

        new_friend = Friend(user_id=current_user.id, friend_id=friend.id)

        db.session.add(new_friend)
        db.session.commit()

        return new_friend.to_dict()
    else:
        return form.errors, 401


@friends_routes.route("/<int:friendship_id>/delete")
def delete_friend(friendship_id): 
    """
    Delete a friend by friendship ID (from table Friend.id) from the current user's friends list
    """
    
    friendship_to_delete = Friend.query.get(friendship_id)

    db.session.delete(friendship_to_delete)
    db.session.commit()

    return {"message": "Friend successfully deleted"}
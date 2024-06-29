from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import UpdateForm

user_routes = Blueprint("users", __name__)


@user_routes.route("")
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route("/<int:id>")
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """

    user = User.query.get(id)

    print("user_routes", current_user)
    return user.to_dict()

@user_routes.route('/<int:id>/update', methods=['POST'])
def update_walkthrough(id):
    """
    Updates the walkthrough boolean field for a user
    """
    form = UpdateForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # update the seen_walkthrough field for the user
        user = User.query.filter(User.id == current_user.id).first()
        setattr(user, 'seen_walkthrough', True)

        db.session.commit()

        return user.to_dict()
    return form.errors, 401

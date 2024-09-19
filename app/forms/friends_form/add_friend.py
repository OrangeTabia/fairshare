from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import InputRequired, Email, ValidationError
from flask_login import current_user

from app.models import User

# from forms.user_forms.login_form import user_exists


def user_is_valid(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError("Email provided not found.")

    curr_user = User.query.get(current_user.id)

    friend = curr_user.friends.filter_by(email=form.data["email"]).first()

    if friend:
        raise ValueError(f"You are already friends with {friend.name}")


class AddFriendForm(FlaskForm):
    email = StringField("Email", validators=[InputRequired(), user_is_valid])

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError

from app.models import User

# from forms.user_forms.login_form import user_exists


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError("Email provided not found.")


class AddFriendForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), user_exists])

    # submit = SubmitField("Submit")

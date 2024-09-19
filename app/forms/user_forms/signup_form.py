from flask_wtf import FlaskForm
from wtforms import StringField, EmailField
from wtforms.validators import InputRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")


# def name_exists(form, field):
#     # Checking if username is already in use
#     name = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    name = StringField("name", validators=[InputRequired(), Length(min=2, max=100)])
    email = EmailField(
        "email", validators=[InputRequired(), Length(max=50), Email(), user_exists]
    )
    password = StringField(
        "password", validators=[InputRequired(), Length(min=8, max=255)]
    )
    profile_image = StringField(
        "profile_image",
        default="https://nationwidecoins.com/cdn/shop/articles/shutterstock_1914066904.jpg",
        validators=[Length(max=1000)],
    )

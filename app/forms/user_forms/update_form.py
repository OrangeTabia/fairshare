from flask_wtf import FlaskForm
from wtforms import  BooleanField
from wtforms.validators import InputRequired


class UpdateForm(FlaskForm):
    seen_walkthrough = BooleanField('seen walkthrough', validators=[InputRequired()])

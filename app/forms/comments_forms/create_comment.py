from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class CommentForm(FlaskForm):
    friends_expense_id = IntegerField("friends_expense_id", validators=[DataRequired()])
    comment = StringField("comment", validators=[Length(max=200)])

    # submit = SubmitField("Submit")

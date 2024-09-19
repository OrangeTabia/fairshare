from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import InputRequired, Length


class CommentForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[InputRequired()])
    friends_expense_id = IntegerField("friends_expense_id", validators=[InputRequired()])
    comment = StringField("comment", validators=[Length(max=200)])

    # submit = SubmitField("Submit")

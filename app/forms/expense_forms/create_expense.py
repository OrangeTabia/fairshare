from flask_wtf import FlaskForm
from wtforms import DateTimeField, StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length, NumberRange


class CreateFriendsExpenseForm(FlaskForm):
    payer_id = IntegerField("payer_id", validators=[DataRequired()])
    receiver_id = IntegerField("receiver_id", validators=[DataRequired()])
    description = StringField("description", validators=[Length(max=1000)])
    amount = IntegerField("amount", validators=[DataRequired(), NumberRange(min=1)])
    expense_date = StringField("expense_date", validators=[DataRequired()])
    settled = BooleanField("settled", false_values={False, "false", ""})
    notes = StringField("notes", validators=[Length(max=200)])

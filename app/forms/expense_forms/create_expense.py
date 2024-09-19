from flask_wtf import FlaskForm
from wtforms import DateTimeField, StringField, IntegerField, BooleanField
from wtforms.validators import InputRequired, Length, NumberRange


class CreateFriendsExpenseForm(FlaskForm):
    payer_id = IntegerField("payer_id", validators=[InputRequired()])
    receiver_id = IntegerField("receiver_id", validators=[InputRequired()])
    description = StringField("description", validators=[Length(max=1000)])
    amount = IntegerField("amount", validators=[InputRequired(), NumberRange(min=1)])
    expense_date = StringField("expense_date", validators=[InputRequired()])
    settled = BooleanField("settled", false_values={False, "false", ""})
    notes = StringField("notes", validators=[Length(max=200)])

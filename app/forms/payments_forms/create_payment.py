from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, NumberRange

from app.models import Payment


class AddPaymentForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    friends_expense_id = IntegerField("friends_expense_id", validators=[DataRequired()])
    amount = IntegerField("amount", validators=[DataRequired(), NumberRange(min=0.01)])
    payment_date = StringField("payment_date", validators=[DataRequired()])

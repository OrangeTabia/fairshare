from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import InputRequired, NumberRange, ValidationError

from app.models import FriendsExpense


def check_payment_amount(form, field):
    total = 0

    expense_id = form.data["friends_expense_id"]
    amount = field.data

    expense = FriendsExpense.query.get(expense_id)
    if not expense:
        raise ValidationError("Expense do not exist")
    payments = expense.payments

    for payment in payments:
        total += payment.amount

    difference = expense.amount - total

    if expense.settled:
        raise ValidationError("This expense has been paid")

    if difference < amount:
        raise ValidationError("Payment cannot be more than expense")


class AddPaymentForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[InputRequired()])
    friends_expense_id = IntegerField("friends_expense_id", validators=[InputRequired()])
    amount = IntegerField(
        "amount",
        validators=[InputRequired(), NumberRange(min=1), check_payment_amount],
    )
    payment_date = StringField("payment_date", validators=[InputRequired()])

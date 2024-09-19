from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime

from app.forms import AddPaymentForm
from app.models import User, FriendsExpense, Payment, db

payments_routes = Blueprint("payments", __name__)


@payments_routes.route("")
@login_required
def all_payments():
    """
    Query for all current user's prior and pending payments
    """
    payer_payments = Payment.query.filter_by(user_id=current_user.id).all()
    payer_payments = [payment.to_dict() for payment in payer_payments]

    receiver_expenses = FriendsExpense.query.filter_by(
        receiver_id=current_user.id
    ).all()
    receiver_payments = []
    for expense in receiver_expenses:
        for payment in expense.payments:
            receiver_payments.append(payment.to_dict())

    return {"payerPayments": payer_payments, "receiverPayments": receiver_payments}


@payments_routes.route("/new", methods=["GET", "POST"])
@login_required
def add_payment():
    """
    Add a payment to one of the current user's expenses
    """
    form = AddPaymentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        formatted_date = datetime.strptime(
            form.data["payment_date"], "%Y-%m-%d %H:%M:%S"
        )

        new_payment = Payment(
            user_id=form.data["user_id"],
            friends_expense_id=form.data["friends_expense_id"],
            amount=form.data["amount"],
            payment_date=formatted_date,
        )

        db.session.add(new_payment)
        db.session.commit()

        return new_payment.to_dict()
    else:
        return form.errors, 401

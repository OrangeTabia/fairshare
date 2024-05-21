from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime

from app.forms import AddPaymentForm
from app.models import User, Friend, FriendsExpense, Payment, db

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

        print(new_payment)

        return new_payment.to_dict()
    else:
        return form.errors, 401


# @friends_expenses_routes.route("/<int:friends_expense_id>/update", methods=["GET", "POST"])
# def update_friends_expense(friends_expense_id):
#     """
#     Update an expense between the current user and one of their friends
#     """
#     form = CreateFriendsExpenseForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]

#     if form.validate_on_submit():

#         formatted_date = datetime.strptime(form.data["expense_date"], '%Y-%m-%d %H:%M:%S')

#         current_friends_expense = FriendsExpense.query.filter_by(id=friends_expense_id).update(dict(
#             payer_id=form.data["payer_id"],
#             receiver_id=form.data["receiver_id"],
#             description=form.data["description"],
#             amount=form.data["amount"],
#             expense_date=formatted_date,
#             settled=form.data['settled'],
#             notes=form.data["notes"]
#         ))

#         db.session.commit()

#         return current_friends_expense
#     else:
#         return form.errors, 401


# @friends_expenses_routes.route("/<int:friends_expense_id>/delete")
# def delete_friends_expense(friends_expense_id):
#     """
#     Delete a friends expense by friends_expense ID (from table FriendsExpenses) from the current user's expense list
#     """

#     friends_expense_to_delete = FriendsExpense.query.get(friends_expense_id)

#     db.session.delete(friends_expense_to_delete)
#     db.session.commit()

#     return {"message": "Friends Expense successfully deleted"}

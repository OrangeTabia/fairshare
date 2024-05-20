from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime

from app.models import FriendsExpense, db
from app.forms import CreateFriendsExpenseForm

friends_expenses_routes = Blueprint("friends_expenses", __name__)


@friends_expenses_routes.route("/")
@login_required
def all_friends_expenses():
    """
    Query for all current user's pending and settled expenses
    """
    payer_friends_expenses = FriendsExpense.query.filter_by(payer_id=current_user.id).order_by(FriendsExpense.expense_date).all()
    payer_friends_expenses = [expense.to_dict() for expense in payer_friends_expenses]

    receiver_friends_expenses = FriendsExpense.query.filter_by(receiver_id=current_user.id).order_by(FriendsExpense.expense_date).all()
    receiver_friends_expenses = [expense.to_dict() for expense in receiver_friends_expenses]

    return {
        'payerFriendsExpenses': payer_friends_expenses,
        'receiverFriendsExpenses': receiver_friends_expenses
    }



@friends_expenses_routes.route("/new", methods=["GET", "POST"])
def create_friends_expense():
    """
    Create an expense between the current user and one of their friends
    """
    form = CreateFriendsExpenseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        formatted_date = datetime.strptime(form.data["expense_date"], '%Y-%m-%d %H:%M:%S')

        new_friends_expense = FriendsExpense(
            payer_id=form.data["payer_id"],
            receiver_id=form.data["receiver_id"],
            description=form.data["description"],
            amount=form.data["amount"],
            expense_date=formatted_date,
            settled=form.data["settled"],
            notes=form.data["notes"])

        db.session.add(new_friends_expense)
        db.session.commit()

        return new_friends_expense.to_dict()
    else:
        return form.errors, 401



@friends_expenses_routes.route("/<int:friends_expense_id>/update", methods=["GET", "POST"])
def update_friends_expense(friends_expense_id):
    """
    Update an expense between the current user and one of their friends
    """
    form = CreateFriendsExpenseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        formatted_date = datetime.strptime(form.data["expense_date"], '%Y-%m-%d %H:%M:%S')

        current_friends_expense = FriendsExpense.query.filter_by(id=friends_expense_id).update(dict(
            payer_id=form.data["payer_id"],
            receiver_id=form.data["receiver_id"],
            description=form.data["description"],
            amount=form.data["amount"],
            expense_date=formatted_date,
            settled=form.data['settled'],
            notes=form.data["notes"]
        ))

        db.session.commit()

        return current_friends_expense
    else:
        return form.errors, 401



@friends_expenses_routes.route("/<int:friends_expense_id>/delete")
def delete_friends_expense(friends_expense_id):
    """
    Delete a friends expense by friends_expense ID (from table FriendsExpenses) from the current user's expense list
    """

    friends_expense_to_delete = FriendsExpense.query.get(friends_expense_id)

    db.session.delete(friends_expense_to_delete)
    db.session.commit()

    return {"message": "Friends Expense successfully deleted"}

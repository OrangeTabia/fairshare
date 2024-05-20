from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import date, datetime
from distutils.util import strtobool

from app.models import User, Friend, FriendsExpense, db
from app.forms import CreateFriendsExpenseForm

friends_expenses_routes = Blueprint("friends_expenses", __name__)


@friends_expenses_routes.route("/")
@login_required
def all_friends_expenses():
    """
    Query for all current user's pending and settled expenses
    """
    friends_expenses_list_payer = list(FriendsExpense.query.filter_by(payer_id=current_user.id).order_by(FriendsExpense.expense_date))
    friends_expenses_list_receiver = list(FriendsExpense.query.filter_by(receiver_id=current_user.id).order_by(FriendsExpense.expense_date))

    all_expenses = friends_expenses_list_payer + friends_expenses_list_receiver

    return {"Expenses": [expense.to_dict() for expense in all_expenses]}



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



@friends_expenses_routes.route("/<int:friends_expense_id>/update", methods=["POST"])
def update_friends_expense(friends_expense_id):
    """
    Update an expense between the current user and one of their friends
    """
    form = CreateFriendsExpenseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        current_friends_expense = FriendsExpense.query.get(friends_expense_id)

        formatted_date = datetime.strptime(form.data["expense_date"], '%Y-%m-%d %H:%M:%S')
        formatted_boolean = strtobool(form.data["settled"])
        

        print("========>", formatted_date)

        current_friends_expense.payer_id=form.data["payer_id"], 
        current_friends_expense.receiver_id=form.data["receiver_id"], 
        current_friends_expense.description=form.data["description"],
        current_friends_expense.amount=form.data["amount"],
        # current_friends_expense.expense_date=formatted_date,
        current_friends_expense.settled=formatted_boolean,
        current_friends_expense.notes=form.data["notes"]

        db.session.commit()

        return current_friends_expense.to_dict()
    else:
        return form.errors, 401
    


# @friends_routes.route("/<int:friendship_id>/delete")
# def delete_friend(friendship_id): 
#     """
#     Delete a friend by friendship ID (from table Friend.id) from the current user's friends list
#     """
    
#     friendship_to_delete = Friend.query.get(friendship_id)

#     db.session.delete(friendship_to_delete)
#     db.session.commit()

#     return {"message": "Friend successfully deleted"}
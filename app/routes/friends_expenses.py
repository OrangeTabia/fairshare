from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime

from app.models import FriendsExpense, Payment, db
from app.forms import CreateFriendsExpenseForm

friends_expenses_routes = Blueprint("friends_expenses", __name__)

def format_input_date(str): 
    new_date = str.replace("T", " ").replace(".000Z", "")
    return new_date




@friends_expenses_routes.route("")
@login_required
def all_friends_expenses():
    """
    Query for all current user's pending and settled expenses
    """
    payer_friends_expenses = FriendsExpense.query.filter_by(payer_id=current_user.id).order_by(FriendsExpense.expense_date).all()

    updated_payer_expenses = []

    for expense in payer_friends_expenses:
        expense_comments = []
        for comment in expense.comments:
            expense_comments.append(comment.to_dict())
        updated_expense=expense.to_dict()
        updated_expense['comments']=expense_comments
        updated_payer_expenses.append(updated_expense)

    receiver_friends_expenses = FriendsExpense.query.filter_by(receiver_id=current_user.id).order_by(FriendsExpense.expense_date).all()

    updated_receiver_expenses = []

    for expense in receiver_friends_expenses:
        expense_comments = []
        for comment in expense.comments:
            expense_comments.append(comment.to_dict())
        updated_expense=expense.to_dict()
        updated_expense['comments']=expense_comments
        updated_receiver_expenses.append(updated_expense)

    return {
        'payerFriendsExpenses': updated_payer_expenses,
        'receiverFriendsExpenses': updated_receiver_expenses
    }



@friends_expenses_routes.route("/new", methods=["GET", "POST"])
@login_required
def create_friends_expense():
    """
    Create an expense between the current user and one of their friends
    """
    form = CreateFriendsExpenseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]


    if form.validate_on_submit():

        formatted_date = datetime.strptime(format_input_date(form.data["expense_date"]), '%Y-%m-%d %H:%M:%S')

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
        return form.errors, 400



@friends_expenses_routes.route("/<int:friends_expense_id>/update", methods=["GET", "POST"])
@login_required
def update_friends_expense(friends_expense_id):
    """
    Update an expense between the current user and one of their friends
    """
    form = CreateFriendsExpenseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        formatted_date = datetime.strptime(format_input_date(form.data["expense_date"]), '%Y-%m-%d %H:%M:%S')

    
        current_friends_expense = FriendsExpense.query.get(friends_expense_id)
        setattr(current_friends_expense, 'description', form.data["description"])
        setattr(current_friends_expense, 'amount', form.data["amount"])
        setattr(current_friends_expense, 'expense_date', formatted_date)
        setattr(current_friends_expense, 'settled', form.data['settled'])
        setattr(current_friends_expense, 'notes', form.data["notes"])
    
        db.session.commit()

        return current_friends_expense.to_dict()
    else:
        return form.errors, 401



@friends_expenses_routes.route("/<int:friends_expense_id>/delete")
@login_required
def delete_friends_expense(friends_expense_id):
    """
    Delete a friends expense by friends_expense ID (from table FriendsExpenses) from the current user's expense list
    """

    friends_expense_to_delete = FriendsExpense.query.get(friends_expense_id)

    db.session.delete(friends_expense_to_delete)
    db.session.commit()

    return {"message": "Friends Expense successfully deleted"}

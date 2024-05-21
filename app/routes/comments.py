from flask import Blueprint, request
from flask_login import login_required, current_user

from app.models import Comment, db
from app.forms import CommentForm

comments_routes = Blueprint("comments", __name__)


@comments_routes.route("/add", methods=["GET", "POST"])
@login_required
def create_comment():

    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        new_comment = Comment(
            user_id=current_user.id,
            friends_expense_id=form.data['friends_expense_id'],
            comment=form.data['comment']
        )

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()

    return form.errors, 401

@comments_routes.route("/<int:comment_id>/update", methods=["GET", "POST"])
@login_required
def update_comment(comment_id):

    """
    Edit a comment for an expense
    """

    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        updated_comment = Comment.query.filter_by(id=comment_id).update(dict(
            user_id=current_user.id,
            friends_expense_id=form.data['friends_expense_id'],
            comment=form.data['comment']
        ))

        db.session.commit()

        return updated_comment.to_dict()

    return form.errors, 401


@comments_routes.route("/<int:comment_id>/delete")
@login_required
def delete_comment(comment_id):
    """
    Delete a comment from an expense
    """

    comment_to_delete = Comment.query.get(comment_id)

    db.session.delete(comment_to_delete)
    db.session.commit()

    return {"message": "Comment has been successfully deleted"}

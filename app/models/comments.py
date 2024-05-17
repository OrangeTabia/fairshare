from datetime import datetime
from sqlalchemy.ext.hybrid import hybrid_property

from .db import db, environment, SCHEMA


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    friends_expense_id = db.Column(db.Integer, db.ForeignKey('friends_expenses.id'), nullable=True)
    group_expense_id = db.Column(db.Integer, db.ForeignKey('group_expenses.id'), nullable=True)
    comment = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship('User', back_populates='comments')
    friends_expense = db.relationship('FriendsExpense', back_populates='comments')
    group_expense = db.relationship('GroupExpense', back_populates='comments')

    @hybrid_property
    def expense_id(self):
        return self.friends_expense_id or self.group_expense_id

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'expenseId': self.expense_id,
            'comment': self.comment,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

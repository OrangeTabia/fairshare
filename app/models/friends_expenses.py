from datetime import datetime
from .user import User

from .db import db, environment, SCHEMA, add_prefix_for_prod

class FriendsExpense(db.Model):
    __tablename__ = 'friends_expenses'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    # receiver is the one who originaly paid the expense and receives funds
    # payer is the one who needs to pay funds

    id = db.Column(db.Integer, primary_key=True)
    payer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(User.id)), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(User.id)), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    expense_date = db.Column(db.Date, nullable=False)
    settled = db.Column(db.Boolean, nullable=False)
    notes = db.Column(db.String(200), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    payments = db.relationship('Payment', back_populates='friends_expense')
    comments = db.relationship('Comment', back_populates='friends_expense')

    payer = db.relationship(User, foreign_keys='FriendsExpense.payer_id', backref='payer')
    receiver = db.relationship(User, foreign_keys='FriendsExpense.receiver_id', backref='receiver')

    def to_dict(self):
        return {
            'id': self.id,
            'payerId': self.payer_id,
            'receiverId': self.receiver_id,
            'description': self.description,
            'amount': self.amount,
            'expenseDate': self.expense_date,
            'settled': self.settled,
            'notes': self.notes,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

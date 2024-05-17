from datetime import datetime

from .db import db, environment, SCHEMA

class FriendsExpense(db.Model):
    __tablename__ = 'friends_expenses'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    expense_date = db.Column(db.Date, nullable=False)
    settled = db.Column(db.Boolean, nullable=False)
    notes = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    payments = db.relationship('FriendsPayment', back_populates='friends_expenses')
    comments = db.relationship('Comment', back_populates='')
    payer = db.relationship('User', back_populates='payer_friends_expenses')
    receiver = db.relationship('User', back_populates='receiver_friends_expenses')

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'amount': self.amount,
            'expenseDate': self.expense_date,
            'settled': self.settled,
            'notes': self.notes,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

from datetime import datetime

from .db import db, environment, SCHEMA

class FriendsPayment(db.Model):
    __tablename__ = 'friends_payments'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    expense_id = db.Column(db.Integer, db.ForeignKey('friends_expenses.id'), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    payment_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship('User', back_populates='friends_payments')
    expense = db.relationship('FriendsExpense', back_populates='payments')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id
        }

from datetime import datetime
from sqlalchemy.ext.hybrid import hybrid_property

from .db import db, environment, SCHEMA, add_prefix_for_prod


class Payment(db.Model):
    __tablename__ = "payments"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        nullable=False
    )
    friends_expense_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("friends_expenses.id")),
        nullable=True,
    )
    # group_expense_id = db.Column(
    #     db.Integer,
    #     db.ForeignKey(add_prefix_for_prod('group_expenses.id')),
    #     nullable=True
    # )
    amount = db.Column(
        db.Integer,
        nullable=False
    )
    payment_date = db.Column(
        db.Date,
        nullable=False
    )
    created_at = db.Column(
        db.DateTime,
        default=datetime.now()
    )
    updated_at = db.Column(
        db.DateTime,
        default=datetime.now()
    )

    user = db.relationship(
        "User",
        back_populates="payments"
    )
    friends_expense = db.relationship(
        "FriendsExpense",
        back_populates="payments"
    )
    # group_expense = db.relationship(
        # 'GroupExpense',
        # back_populates='payments'
    # )

    # @hybrid_property
    # def expense_id(self):
    #     return self.friends_expense_id or self.group_expense_id

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "expenseId": self.friends_expense_id,
            "amount": self.amount,
            "paymentDate": self.payment_date,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }

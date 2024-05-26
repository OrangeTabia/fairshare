from app.models import db, Payment, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from datetime import date

fake = Faker()


def seed_payments():

    demo1 = Payment(
        user_id=1, friends_expense_id=1, amount=1000, payment_date=date(2023, 5, 10)
    )
    demo2 = Payment(
        user_id=3, friends_expense_id=3, amount=1000, payment_date=date(2023, 5, 10)
    )
    demo3 = Payment(
        user_id=100, friends_expense_id=6, amount=1000, payment_date=date(2023, 5, 10)
    )
    demo4 = Payment(
        user_id=100, friends_expense_id=6, amount=4000, payment_date=date(2023, 9, 9)
    )
    demo5 = Payment(
        user_id=100, friends_expense_id=7, amount=2500, payment_date=date(2023, 11, 18)
    )


    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_payments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.payments RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM payments"))

    db.session.commit()

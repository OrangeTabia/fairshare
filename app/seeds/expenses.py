from app.models import db, FriendsExpense, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_expenses():

    demo1 = FriendsExpense(
        payer_id=1,
        receiver_id=100,
        description='Pizza night!',
        amount=4000,
        expense_date=datetime(2023, 2, 28, 0, 0, 0),
        settled=False,
        notes='Extra peperoni for Stacy'
        )
    demo2 = FriendsExpense(
        payer_id=2,
        receiver_id=100,
        description='Night on the Town!',
        amount=6500,
        expense_date=datetime(2023, 2, 28, 0, 0, 0),
        settled=False,
        )
    demo3 = FriendsExpense(
        payer_id=3,
        receiver_id=100,
        description='Rent',
        amount=60000,
        expense_date=datetime(2023, 2, 28, 0, 0, 0),
        settled=False,
        notes='May rent'
        )
    demo4 = FriendsExpense(
        payer_id=100,
        receiver_id=4,
        description='Wine Tasting!',
        amount=5500,
        expense_date=datetime(2023, 2, 28, 0, 0, 0),
        settled=False,
        )
    demo5 = FriendsExpense(
        payer_id=100,
        receiver_id=5,
        description='Lazer tag',
        amount=2500,
        expense_date=datetime(2023, 2, 28, 0, 0, 0),
        settled=False,
        )
    demo6 = FriendsExpense(
        payer_id=100,
        receiver_id=6,
        description='Wine Tasting!',
        amount=5500,
        expense_date=datetime(2023, 2, 28, 0, 0, 0),
        settled=False,
        )
    demo7 = FriendsExpense(
        payer_id=100,
        receiver_id=7,
        description='Lazer tag',
        amount=2500,
        expense_date=datetime(2023, 2, 28, 0, 0, 0),
        settled=False,
        )

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_expenses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends_expenses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends_expenses"))

    db.session.commit()

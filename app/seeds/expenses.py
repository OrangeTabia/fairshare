from app.models import db, FriendsExpense, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_expenses():

    demo1 = FriendsExpense(
        payer_id=1,
        receiver_id=100,
        description='Pizza night!',
        amount=40,
        expense_date=date(2023, 5, 5),
        settled=False,
        notes='Extra peperoni for Stacy'
        )
    demo2 = FriendsExpense(
        payer_id=2,
        receiver_id=100,
        description='Night on the Town!',
        amount=65,
        expense_date=date(2023, 11, 22),
        settled=False,
        )
    demo3 = FriendsExpense(
        payer_id=3,
        receiver_id=100,
        description='Rent',
        amount=600,
        expense_date=date(2023, 6, 12),
        settled=False,
        notes='May rent'
        )
    demo4 = FriendsExpense(
        payer_id=100,
        receiver_id=4,
        description='Wine Tasting!',
        amount=55,
        expense_date=date(2023, 10, 2),
        settled=False,
        )
    demo5 = FriendsExpense(
        payer_id=100,
        receiver_id=5,
        description='Lazer tag',
        amount=25,
        expense_date=date(2023, 12, 12),
        settled=False,
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
def undo_expenses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends_expenses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends_expenses"))

    db.session.commit()
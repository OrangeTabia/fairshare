from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():

    demo1 = Comment(
        user_id=100,
        friends_expense_id=1,
        comment='I wanted Pinapple!'
        )
    demo2 = Comment(
        user_id=2,
        friends_expense_id=2,
        comment='Never drinking this much again! Ugh!'
        )
    demo3 = Comment(
        user_id=100,
        friends_expense_id=3,
        comment='I hate living in San Francisco'
        )
    demo4 = Comment(
        user_id=4,
        friends_expense_id=4,
        comment='I smell hints of vanilla'
        )
    demo5 = Comment(
        user_id=100,
        friends_expense_id=6,
        comment='I don\'t know if I can keep doing this... '
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
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()

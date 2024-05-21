from app.models import db, Friend, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint, sample



def seed_friends():
    for user_id in range(1, 100):
        friends_list = sample(range(1, 100), randint(1, 7))
        for num in friends_list:
            if num != user_id:
                friendship = Friend(
                    user_id=user_id, friend_id=num
                )
                db.session.add(friendship)
                friendship2 = Friend(
                    user_id=num, friend_id=user_id
                )
                db.session.add(friendship2)

    for index in range(1, 16):
        demo = Friend(
            user_id=100, friend_id=index
        )
        db.session.add(demo)
        demo2 = Friend(
            user_id=index, friend_id=100
        )
        db.session.add(demo2)

    db.session.commit()


def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()

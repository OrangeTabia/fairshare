from app.models import db, environment, SCHEMA, User, friends
from sqlalchemy.sql import text
from random import randint, sample


def seed_friends():
    for user_id in range(1, 100):
        friends_list = sample(range(1, 100), randint(1, 7))
        for num in friends_list:
            if num != user_id:

                db.session.execute(
                    db.insert(friends),
                    [
                        {"user_id": user_id, "friend_id": num},
                    ],
                )

    for index in range(1, 16):
        db.session.execute(
            db.insert(friends),
            [
                {"user_id": 100, "friend_id": index},
            ],
        )

    db.session.commit()


def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()

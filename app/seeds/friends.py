from app.models import db, environment, SCHEMA, User, friends
from sqlalchemy.sql import text
from random import randint, sample


def seed_friends():
    for user_id in range(1, 100):
        user = User.query.get(user_id)
        friends_list = sample(range(1, 100), randint(1, 7))
        for num in friends_list:
            if num != user_id:
                # insert(friends).values(user_id=user_id, friend_id=num)
                # db.session.execute(
                #     db.delete(friends).filter_by(
                #         friend_id=friends_id, user_id=current_user.id
                #     )
                # )

                db.session.execute(
                    db.insert(friends),
                    [
                        {"user_id": user_id, "friend_id": num},
                    ],
                )

                # friend = User.query.get(num)
                # user.friends.append(friend)
                # # friend.friends.append(user)

                # friendship = Friend(
                #     user_id=user_id, friend_id=num
                # )
                # db.session.add(friendship)

    demo_user = User.query.get(100)
    for index in range(1, 16):
        db.session.execute(
            db.insert(friends),
            [
                {"user_id": 100, "friend_id": index},
            ],
        )

        # friend = User.query.get(index)
        # demo_user.friends.append(friend)
        # # friend.friends.append(demo_user)

    #     demo = Friend(
    #         user_id=100, friend_id=index
    #     )
    #     db.session.add(demo)
    #     demo2 = Friend(
    #         user_id=index, friend_id=100
    #     )
    #     db.session.add(demo2)

    # user = User.query.get(1)
    # user2 = User.query.get(2)
    # print('----->>>>', user.friends.all())

    # user.friends.append(user2)

    # print('----->>>>', user.friends.all())

    db.session.commit()


def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()

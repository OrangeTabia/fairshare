# fairshare 
Fairshare is a partial clone inspired by 'Splitwise' that allows consumers to split expenses with friends. 


# Live Link
[https://fairshare-f8a7.onrender.com](https://fairshare-f8a7.onrender.com)


# Tech Stack

### Languages, Frameworks, and Libraries
![Static Badge](https://img.shields.io/badge/PYTHON-%233776AB?style=for-the-badge&logo=python&labelColor=black)
![Static Badge](https://img.shields.io/badge/FLASK-%23000000?style=for-the-badge&logo=FLASK&labelColor=black)
![Static Badge](https://img.shields.io/badge/JAVASCRIPT-%23F7DF1E?style=for-the-badge&logo=javascript&labelColor=black)
![Static Badge](https://img.shields.io/badge/REACT-%2361DAFB?style=for-the-badge&logo=react&labelColor=black)
![Static Badge](https://img.shields.io/badge/REDUX-%23764ABC?style=for-the-badge&logo=REDUX&labelColor=black)
![Static Badge](https://img.shields.io/badge/CSS-%231572B6?style=for-the-badge&logo=CSS3&labelColor=black)
![Static Badge](https://img.shields.io/badge/HTML-%23E34F26?style=for-the-badge&logo=HTML5&labelColor=black)

### Database: 
![Static Badge](https://img.shields.io/badge/POSTGRESQL-%234169E1?style=for-the-badge&logo=POSTGRESQL&labelColor=black)

### Hosting: 
![Static Badge](https://img.shields.io/badge/RENDER-%23000000?style=for-the-badge&logo=RENDER&labelColor=black)


# Index
[Features List](https://github.com/OrangeTabia/Python-Project/wiki/Features) | [Database Schema](https://github.com/OrangeTabia/Python-Project/wiki/Database-Schema) | [User Stories](https://github.com/OrangeTabia/Python-Project/wiki/User-Stories)


# Landing Page
![fairshare-landing](https://github.com/OrangeTabia/Python-Project/assets/131227932/db9e6272-a64c-4064-8c89-b64238cb0f1a)

# Expenses
![fairshare-expenses](https://github.com/OrangeTabia/Python-Project/assets/131227932/f3d0e51e-3423-49d7-9cb9-4ec6de1f11ed)


# Payments (Settle Up)
![fairshare-settleup](https://github.com/OrangeTabia/Python-Project/assets/131227932/54947616-f4a0-4bb1-8e60-e2987ba62662)

# Comments
![fairshare-comments](https://github.com/OrangeTabia/Python-Project/assets/131227932/fd88f191-7ab0-42b4-a421-eb39e686cf5e)

# Friends
![fairshare-friends](https://github.com/OrangeTabia/Python-Project/assets/131227932/0befc03e-1140-4c34-8368-dea5a13fc60f)

# Endpoints

## Auth
### Log In User
- Method: `POST`
- URL: `/api/auth/login`
- Body: 
```json
{
    "username": "Joe Burrow",
    "password": "password"
}
```
- Successful Response: 
```json
{
    "id": 1,
    "username": "Joe Burrow", 
    "email": "joeburrow@gmail.com"
}
```

## Expenses
### Create an Expense
- Method: `POST`
- URL: `/api/friends_expenses/new`
- Body:
```json
{
    "payer_id": 1,
    "receiver_id": 2,
    "description": "brunch",
    "amount": 30,
    "expense_date": "2024-06-30",
    "notes": "the eggs and bacon were great!"
}
```
- Successful Response:
```json
{
    "id": 11,
    "payerId": 1,
    "receiverId": 2,
    "description": "brunch",
    "amount": 30,
    "expenseDate": "Sun, 30 Jun 2024 00:00:00 GMT",
    "settled": false,
    "notes": "the eggs and bacon were great!",
    "createdAt": "Tue, 18 Jun 2024 14:32:58 GMT",
    "updatedAt": "Tue, 18 Jun 2024 14:32:58 GMT"
}
```
### View all Expenses (comments included)
- Method: `GET`
- URL: `/api/friends_expenses`
- Body: none
- Successful Response:
```json
{
    "payerFriendsExpenses": [
        {
            "amount": 5500,
            "comments": [
                {
                    "comment": "I smell hints of vanilla",
                    "createdAt": "Fri, 14 Jun 2024 10:40:05 GMT",
                    "expenseId": 4,
                    "id": 4,
                    "updatedAt": "Fri, 14 Jun 2024 10:40:05 GMT",
                    "userId": 4
                }
            ],
            "createdAt": "Fri, 14 Jun 2024 10:40:05 GMT",
            "description": "Wine Tasting!",
            "expenseDate": "Tue, 28 Feb 2023 00:00:00 GMT",
            "id": 4,
            "notes": null,
            "payerId": 100,
            "receiverId": 4,
            "settled": false,
            "updatedAt": "Fri, 14 Jun 2024 10:40:05 GMT"
        },
        {
            "amount": 2500,
            "comments": [],
            "createdAt": "Fri, 14 Jun 2024 10:40:05 GMT",
            "description": "Brunch!",
            "expenseDate": "Tue, 28 Feb 2023 00:00:00 GMT",
            "id": 7,
            "notes": null,
            "payerId": 100,
            "receiverId": 7,
            "settled": true,
            "updatedAt": "Fri, 14 Jun 2024 10:40:05 GMT"
        }
    ],
    "receiverFriendsExpenses": [
        {
            "amount": 4000,
            "comments": [
                {
                    "comment": "I wanted Pinapple!",
                    "createdAt": "Fri, 14 Jun 2024 10:40:05 GMT",
                    "expenseId": 1,
                    "id": 1,
                    "updatedAt": "Fri, 14 Jun 2024 10:40:05 GMT",
                    "userId": 100
                }
            ],
            "createdAt": "Fri, 14 Jun 2024 10:40:05 GMT",
            "description": "Pizza night!",
            "expenseDate": "Tue, 28 Feb 2023 00:00:00 GMT",
            "id": 1,
            "notes": "Extra peperoni for Stacy",
            "payerId": 1,
            "receiverId": 100,
            "settled": false,
            "updatedAt": "Fri, 14 Jun 2024 10:40:05 GMT"
        },
        {
            "amount": 6500,
            "comments": [
                {
                    "comment": "Never drinking this much again! Ugh!",
                    "createdAt": "Fri, 14 Jun 2024 10:40:05 GMT",
                    "expenseId": 2,
                    "id": 2,
                    "updatedAt": "Fri, 14 Jun 2024 10:40:05 GMT",
                    "userId": 2
                }
            ],
            "createdAt": "Fri, 14 Jun 2024 10:40:05 GMT",
            "description": "Night on the Town!",
            "expenseDate": "Tue, 28 Feb 2023 00:00:00 GMT",
            "id": 2,
            "notes": null,
            "payerId": 2,
            "receiverId": 100,
            "settled": false,
            "updatedAt": "Fri, 14 Jun 2024 10:40:05 GMT"
        },
    ]
}
```
### Edit an Expense
- Method: `POST`,
- URL: `/api/friends_expenses/:friends_expense_id/update`
- Body:
```json
{
    "payer_id": 1,
    "receiver_id": 2,
    "description": "brunch",
    "amount": 30,
    "expense_date": "2024-06-30",
    "notes": "nvm the eggs were awful! i'll still pay you back"
}
```
- Successful Response:
```json
{
    "id": 11,
    "payerId": 1,
    "receiverId": 2,
    "description": "brunch",
    "amount": 30,
    "expenseDate": "Sun, 30 Jun 2024 00:00:00 GMT",
    "settled": false,
    "notes": "nvm the eggs were awful! i'll still pay you back",
    "createdAt": "Tue, 18 Jun 2024 14:32:58 GMT",
    "updatedAt": "Tue, 18 Jun 2024 14:32:58 GMT"
}
```
### Delete an Expense
- Method: `GET`
- URL: `/api/friends_expenses/:friends_expense_id/delete`
- Body: none
- Successful Response:
```json  
{
    "message": "Friends Expense successfully deleted"
}
```

## Comments
### Create a Comment
- Method: `POST`
- URL: `/api/comments/new`
- Body:
```json
{
    "user_id": 100,
    "friends_expense_id": 4,
    "comments": "I can't beleive I am paying this much money!"
}
```
- Successful Response:
```json
{
    "id": 6,
    "expenseId": 1,
    "userId": 100,
    "comment": "I can't beleive I am paying this much money!",
    "updatedAt": "Tue, 18 Jun 2024 14:32:58 GMT",
    "createdAt": "Tue, 18 Jun 2024 14:32:58 GMT"
}
```
### Edit a Comment
- Method: `POST`
- URL: `/api/comments/:comment_id/update`
- Body:
```json
{
    "user_id": 100,
    "friends_expense_id": 1,
    "comment": "money!"
}
```
- Successful Response:
```json
{
    "id": 6,
    "expenseId": 1,
    "userId": 100,
    "comment": "money!",
    "updatedAt": "Tue, 18 Jun 2024 14:32:58 GMT",
    "createdAt": "Tue, 18 Jun 2024 14:32:58 GMT"
}
```
### Delete a Comment
- Method: `GET`
- URL: `/api/comments/:comment_id/delete`
- Body: none
- Successful Response:
```json
{
    "message": "Comment has been successfully deleted"
}
```

## Friends
### Add a Friend
- Method: `POST`
- URL: `/api/friends/new`
- Body:
```json
{
    "user_id": 100,
    "email": "joeburrow@gmail.com"
}
```
- Successful Response:
```json
{
    "id": 47,
    "email": "shaneguerrero@example.net",
    "name": "Lori Brown",
    "profileImage": "https://images.unsplash.com/photo-1612487528505-d2338264c821?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "seen_walkthrough": false
}
```
### View all Friends
- Method: `GET`
- URL: `/api/friends`
- Body: none
- Successful Response:
```json
[
    {
        "email": "shaneguerrero@example.net",
        "id": 47,
        "name": "Lori Brown",
        "profileImage": "https://images.unsplash.com/photo-1612487528505-d2338264c821?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "seen_walkthrough": false
    }
]
```
### Delete a Friend
- Method: `GET`
- URL: `/api/friends/:friend_id/delete`
- Body: none
- Successful Response: 
```json
{
    "message": "Friend successfully deleted"
}
```

## Payments (Settle Up)
### Pay (Settle Up) an Expense
- Method: `POST`
- URL: `/api/payments/new`
- Body:
```json
{
    "user_id": 100,
    "friends_expense_id": 8,
    "amount": 43,
    "payment_date": "2024-06-19 00:00:00"
}
```
- Successful Response:
```json
{
    "id": 6,
    "userId": 100,
    "expenseId": 8,
    "amount": 43,
    "paymentDate": "Wed, 19 Jun 2024 00:00:00 GMT",
    "createdAt": "Tue, 18 Jun 2024 14:32:58 GMT",
    "updatedAt": "Tue, 18 Jun 2024 14:32:58 GMT"
}
```
### View all Payments
- Method: `GET`
- URL: `/api/payments`
- Body: none
- Successful Response:
```json
{
    "payerPayments": [
        {
            "amount": 1000,
            "createdAt": "Fri, 14 Jun 2024 10:40:05 GMT",
            "expenseId": 6,
            "id": 3,
            "paymentDate": "Wed, 10 May 2023 00:00:00 GMT",
            "updatedAt": "Fri, 14 Jun 2024 10:40:05 GMT",
            "userId": 100
        }
    ],
    "receiverPayments": [
        {
            "amount": 1000,
            "createdAt": "Fri, 14 Jun 2024 10:40:05 GMT",
            "expenseId": 1,
            "id": 1,
            "paymentDate": "Wed, 10 May 2023 00:00:00 GMT",
            "updatedAt": "Fri, 14 Jun 2024 10:40:05 GMT",
            "userId": 1
        }
    ]
}
```

# Feature List
1. Expenses
2. Comments
3. Friends
4. Payments (Settle Up)

# Future Implementation Goals
1. Create a groups feature where users can create, update, delete reoccurring expenses within that group of friends.
2. Create a toggle in the expenses that will split fees between friends and groups by a certain percentage.

# Connect
Aubrie Woodbine | 
Ethan Harrasser | 
[Jeramie Forbes](https://www.linkedin.com/in/jeramieforbes/) | 
[Tabia Ye](https://www.linkedin.com/in/tabiaye/)


# fairshare 
Fairshare is a partial clone inspired by 'Splitwise' that allows consumers to split expenses with friends. 


# Live Link
[https://fairshare-f8a7.onrender.com](https://fairshare-f8a7.onrender.com)


# Tech Stack

### Frameworks and Libraries
Python, Flask, JavaScript, React, Redux, CSS3, HTML5

### Database: 
Postgres

### Hosting: 
Render


# Index
[Features List](https://github.com/OrangeTabia/Python-Project/wiki/Features) | [Database Schema](https://github.com/OrangeTabia/Python-Project/wiki/Database-Schema) | [User Stories](https://github.com/OrangeTabia/Python-Project/wiki/User-Stories)


# Landing Page
![fairshare-landing](https://github.com/OrangeTabia/Python-Project/assets/131227932/db9e6272-a64c-4064-8c89-b64238cb0f1a)

# Expenses
![fairshare-expenses](https://github.com/OrangeTabia/Python-Project/assets/131227932/f3d0e51e-3423-49d7-9cb9-4ec6de1f11ed)


# Settle Up
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
### Sign Up User
- Method: `POST`,
- URL:
- Body:
- Successful Respone:

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
    
}
```
### View all Expenses
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
        },
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
}
```
### Edit an Expense

### Delete an Expense
## Comments
## Friends
## Settle Up


# Feature List
1. Expenses
2. Comments
3. Friends
4. Settle Up

# Future Implementation Goals
1. Create a groups feature where users can create, update, delete reoccurring expenses within that group of friends.
2. Create a toggle in the expenses that will split fees between friends and groups by a certain percentage.

# Connect
Aubrie Woodbine | 
Ethan Harrasser | 
[Jeramie Forbes](https://www.linkedin.com/in/jeramieforbes/) | 
[Tabia Ye](https://www.linkedin.com/in/tabiaye/)


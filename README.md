Gym Management System

Project Overview

The Gym Management System is designed to manage gym operations efficiently. It supports three roles:

Admin: Responsible for creating trainers, scheduling classes, and assigning trainers to classes.

Trainer: Can view their assigned schedules.

Trainee: Can create/manage their profiles and book available classes.

The system enforces business rules such as class capacity limits, daily schedule restrictions, and role-based permissions. JWT-based authentication secures all actions within the system.

Relational Diagram

Below is the relational diagram for the backend database:
![image](https://github.com/user-attachments/assets/fe3a1b42-8de7-4cab-b4f4-829a445d4303)



Technology Stack

Backend Framework: Express.js

Database: MongoDB

ORM/ODM: Mongoose

Authentication: JSON Web Tokens (JWT)

API Endpoints

Authentication

POST /api/users/register

Description: Register a new user.

Parameters: { email, password, role }

Response:

{
    "message": "User created successfully",
    "user": { ...userDetails }
}

POST /api/users/login

Description: Log in a user and receive a JWT token.

Parameters: { email, password }

Response:

{
    "token": "your-jwt-token"
}

Admin-Specific

POST /api/users/trainers

Description: Create a trainer (admin only).

Parameters: { email, password }

Response:

{
    "message": "Trainer created successfully",
    "trainer": { ...trainerDetails }
}

POST /api/classes

Description: Schedule a class and assign a trainer (admin only).

Parameters: { date, trainerId }

Response:

{
    "message": "Class scheduled successfully",
    "class": { ...classDetails }
}

GET /api

Description: View all class schedules (admin only).

Response:

{
    "success": true,
    "data": [ { ...classDetails } ]
}

Trainer-Specific

GET /api/schedule

Description: View assigned schedules (trainer only).

Response:

{
    "schedule": [ { ...classDetails } ]
}

Trainee-Specific

PUT /api/users/profile

Description: Update trainee profile.

Parameters: {name, email, password }

Response:

{
    "message": "Profile updated successfully",
    "user": { ...updatedUserDetails }
}

POST /api/book

Description: Book a class (trainee only).

Parameters: { classId }

Response:

{
    "message": "Class booked successfully",
    "class": { ...classDetails }
}

Database Schema

User Model

{   
    name: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "trainer", "trainee"], required: true }
}

Class Model

{
    date: { type: Date, required: true },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}

Admin Credentials

Use the following credentials for testing admin functionality:

Email: admin@gmail.com

Password: 12345678

Instructions to Run Locally

Clone the Repository:

git clone <repository-url>
cd gym-management-system

Install Dependencies:

npm install

Set Up Environment Variables:
Create a .env file and add:

MONGO_URI=mongodb://localhost:27017/gym-management
JWT_SECRET=your_secret_key
PORT=5000

Start the Server:

node server.js

Access the API:
The server will be running at http://localhost:5000.

Live Hosting Link

Access the live API at: Live Server Link

Testing Instructions

Login as Admin:

Use the provided admin credentials.

Test endpoints for creating trainers and scheduling classes.

Login as Trainer:

Use a trainer account to view assigned schedules.

Login as Trainee:

Create a trainee account.

Test updating the profile and booking classes.

Verify Business Rules:

Ensure that class capacity (max 10) and daily schedule limits (max 5) are enforced.

Confirm role-based access restrictions.

 
 

# Team Task Manager

## Overview

The **Team Task Manager** is a full-stack web application that enables users to manage teams and tasks. It allows users to register, log in, create teams, assign tasks to team members, and track progress. The app is designed with a modern, responsive UI using React and Tailwind CSS, and it uses a PostgreSQL database to store user, team, and task information.

## Features

- **User Authentication**: Register, log in, and authenticate users using PassportJS and Express-Session.
- **Team Management**: Create teams and manage multiple members within each team.
- **Task Assignment**: Assign tasks to team members, set due dates, and track task progress.
- **Member Addition**: Add team members by their username, with validation to ensure the user exists.
- **Responsive UI**: A mobile-friendly interface designed using Tailwind CSS.

## Technologies Used

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Authentication**: PassportJS, Express-Session

## Setup Instructions

### 1. Setup Backend

1. Navigate to the **backend** directory:
    ```bash
    cd backend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the **backend** directory for environment variables (e.g., database credentials):
    ```plaintext
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=team_task_manager
    DB_USER=your_username
    DB_PASSWORD=your_password
    SESSION_SECRET=your_secret_key
    ```

4. Start the backend server:
    ```bash
    npm run dev
    ```

### 2. Setup Frontend

1. Navigate to the **frontend** directory:
    ```bash
    cd frontend
    ```

2. Install the frontend dependencies:
    ```bash
    npm install
    ```

3. Run the frontend server:
    ```bash
    npm run dev
    ```

The frontend will be available at [http://localhost:5173](http://localhost:5173).

---

## Database Schema

The application uses PostgreSQL with the following tables:

- **users**: Stores user information (username, email, and password).
- **teams**: Stores details about teams, including the team creator.
- **tasks**: Stores tasks assigned to teams and team members, including due dates and task statuses.
- **memberships**: Links users to teams, establishing a many-to-many relationship between users and teams.

---

## Usage

Once both the frontend and backend are running, open your browser and navigate to [http://localhost:5173](http://localhost:5173) to access the application. 

Users can:
- Register for a new account
- Log in with their credentials
- Create teams and assign tasks to team members
- Track the progress of tasks

---

## Contact

For issues or inquiries, please reach out to [your-email@example.com].

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

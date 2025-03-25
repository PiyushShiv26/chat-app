# Real-time Chat Application

## Overview

This is a real-time chat application built using React.js and Socket.IO. The project aims to enhance modern web development skills, focusing on state management, real-time client-server communication, and an interactive user interface.

## Features

- **Real-time Messaging**: Instant communication between users.
- **User Authentication**: Secure login and registration system (to be implemented if not already).
- **Chat Rooms**: Users can create and join different chat rooms.
- **Typing Indicators**: Shows when a user is typing.
- **Message Persistence**: Messages are stored to maintain chat history.
- **User Status Updates**: Online indicators for active users.

## Tech Stack

### Frontend:

- React.js (with hooks and context for state management)
- Tailwind CSS (for responsive UI design)
- React Router (for navigation)

### Backend:

- Node.js (Express.js framework)
- Socket.IO (for real-time bidirectional communication)
- MongoDB (for message and user data storage)
- JWT (for authentication, if implemented)

## Project Status

- **Backend:** Mostly completed.
- **Frontend:** Currently under development.

## Setup & Installation

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm or yarn

### Steps to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/PiyushShiv26/chat-app.git
   cd chat-app
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

4. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:5173`.

## Contributions

Contributions are welcome! Feel free to open an issue or submit a pull request.


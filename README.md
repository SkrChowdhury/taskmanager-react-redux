# TaskManager App

A TaskManager application focused on managing project goals with CRUD (Create, Read, Update, Delete) operations. This app allows users to manage goals by tagging them with categories, setting deadlines, and prioritizing them. It includes essential features like filtering, searching, and sorting, as well as additional UI enhancements such as notifications and dark mode.

## Features

- **Task Management**: Perform CRUD operations on tasks.
- **Task Properties**: Each task includes title, description, due date, priority (Low, Medium, High), and tags (e.g., "Backend," "Frontend," "Documentation").
- **Filter and Search**: Filter tasks based on tags and priority and search by task titles.
- **Detail View**: View detailed information for each task.
- **Notifications**: Toast notifications for actions like task creation, updating, or deletion.
- **Responsive UI**: Optimized for various device sizes with Tailwind CSS.

## Tools and Tech Stack

- **Vite**: Project setup and bundling.
- **TypeScript**: Type safety for enhanced developer experience.
- **Redux Toolkit**: For state management, handling tasks, tags, and categories globally.
- **Tailwind CSS**: For responsive styling across devices.
- **JSON Server**: Used as a mock backend API to simulate data persistence.
- **Zod**: used zod for form validation.

## Folder Structure

- **`src/assets`**: All assets.
- **`src/components`**: All reusable components.
- **`src/components\modals`**: All reusable modal components.
- **`src/store`**: Redux setup for state management.
- **`src/store/features`**: Redux slice for specific features.
- **`src/types`**: TypeScript types and interfaces for data structures.
- **`src/utils`**: Utility functions used throughout the app.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- Clone this repository.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SkrChowdhury/taskmanager-react-redux.git
   cd TaskManager
   ```
   
2. Install the dependencies:


```bash
npm install

```
Running the JSON Server
The app uses json-server to simulate a backend API for storing and managing tasks.

3. Start the JSON server:

```bash
npm run server
```

This command will start the server at http://localhost:9000, where the API endpoints for tasks will be available.

4. Running the Project
To start the TaskManager application:

```bash
npm run dev
```
This will start the Vite development server. Open your browser and go to http://localhost:5173 to view the app.

5. API Endpoints

**GET /tasks** - Fetch all tasks.

**POST /tasks** - Create a new task.

**PUT /tasks/:id** - Update an existing task.

**DELETE /tasks/:id** - Delete a task.

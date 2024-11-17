// src/App.tsx
import React from 'react';
import TaskManager from './components/TaskManager';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App: React.FC = () => {

  return (
      <>
      <ToastContainer />
      <TaskManager />
      </>
  );
};

export default App;

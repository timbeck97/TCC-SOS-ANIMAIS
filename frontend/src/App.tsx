import React from 'react';
import './App.css';
import { Routes } from './routes/Routes';
import { AuthProvider } from './context/AuthContextInterface';

function App() {
  return (
    <div className="App">
      <AuthProvider>
          <Routes  />
      </AuthProvider>
    </div>
  );
}

export default App;

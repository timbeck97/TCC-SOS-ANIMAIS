import React from 'react';
import './App.css';
import { Routes } from './routes/Routes';
import { AuthProvider } from './context/AuthContextInterface';
import { ModalProvider } from './context/ModalContext';
import GenericModal from './components/modal/GenericModal';


function App() {
  return (
    <div className="App">
      <ModalProvider>
        <AuthProvider>
            <Routes  />
        </AuthProvider>
        <GenericModal />
      </ModalProvider>
    </div>
  );
}

export default App;

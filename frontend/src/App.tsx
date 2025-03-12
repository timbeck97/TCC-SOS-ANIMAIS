import React, { useEffect } from 'react';
import './App.css';
import { Routes } from './routes/Routes';
import { AuthProvider, useAuthContext } from './context/AuthContextInterface';
import { ModalProvider } from './context/ModalContext';
import GenericModal from './components/modal/GenericModal';
import { fetchToken } from './services/AuthRequest';
import { DeviceProvider } from './context/DeviceContext';
import { TokenAuth } from './types/TokenAuth';

const Wrapper = (props: any) => {
  return (
    <div className='flex flex-col min-h-0 h-full grow'>
      {props.children}
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <DeviceProvider>
        <ModalProvider>
          <AuthProvider>
            <Wrapper>
              <Routes />
            </Wrapper>
          </AuthProvider>
          <GenericModal />
        </ModalProvider>
      </DeviceProvider>
    </div>
  );
}

export default App;

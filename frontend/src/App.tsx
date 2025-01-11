import React from 'react';
import './App.css';
import { Routes } from './routes/Routes';
import { AuthProvider, useAuthContext } from './context/AuthContextInterface';
import { ModalProvider } from './context/ModalContext';
import GenericModal from './components/modal/GenericModal';
import { setAuthFunctions } from './services/Axios';

const Wrapper = (props: any) => {
  const { logout, updateRefreshToken } = useAuthContext();
  setAuthFunctions(logout, updateRefreshToken);
  return (
    <div className='flex flex-col min-h-0 h-full grow'>
      {props.children}
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <ModalProvider>
        <AuthProvider>
          <Wrapper>
            <Routes />
          </Wrapper>
        </AuthProvider>
        <GenericModal />
      </ModalProvider>
    </div>
  );
}

export default App;

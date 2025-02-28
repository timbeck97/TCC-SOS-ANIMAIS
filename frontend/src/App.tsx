import React, { useEffect } from 'react';
import './App.css';
import { Routes } from './routes/Routes';
import { AuthProvider, useAuthContext } from './context/AuthContextInterface';
import { ModalProvider } from './context/ModalContext';
import GenericModal from './components/modal/GenericModal';
import { fetchToken } from './services/AuthRequest';

const Wrapper = (props: any) => {
   useEffect(() => {
          const urlParams = new URLSearchParams(window.location.search);
          const code = urlParams.get("code");
          
          if (code) {
              fetchToken(code);
          } else {
              let stringTk=localStorage.getItem('token')
              if(stringTk){
                  let tk=JSON.parse(stringTk);
                  if(tk){
                      let token:any = {
                          token: tk.token,
                          refreshToken: tk.refreshToken,
                          tokenId: tk.tokenId
                      }
                      localStorage.setItem("token", JSON.stringify(token))

                  }
              }
          }
  
      }, []);
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
        {/* <AuthProvider> */}
          <Wrapper>
            <Routes />
          </Wrapper>
        {/* </AuthProvider> */}
        <GenericModal />
      </ModalProvider>
    </div>
  );
}

export default App;

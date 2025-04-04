
import './App.css';
import { Routes } from './routes/Routes';
import { AuthProvider } from './context/AuthContextInterface';
import { ModalProvider } from './context/ModalContext';
import GenericModal from './components/modal/GenericModal';
import { DeviceProvider } from './context/DeviceContext';

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

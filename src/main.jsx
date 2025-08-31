import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react';
import AuthContextProvider from './Context/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </HeroUIProvider>
    
  </StrictMode>
)

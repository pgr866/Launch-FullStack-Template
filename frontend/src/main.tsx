import './index.css'
import { StrictMode } from 'react'
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)

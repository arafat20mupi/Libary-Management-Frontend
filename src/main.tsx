import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/routes.tsx'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter />
        <Toaster />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)

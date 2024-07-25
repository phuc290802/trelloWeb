import React from 'react'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '~/theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from 'material-ui-confirm'
ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsProvider theme={theme}>
    <ConfirmProvider options={{ cancelText: 'Cancelar' }} defaultOptions={{
      allowClose: false,
      dialogProps: { maxWidth: 'xs' },
      confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
      cancellationButtonProps: { color: 'inherit' }
    }}>
      <CssBaseline />
      <App />
      <ToastContainer />
    </ConfirmProvider>
  </CssVarsProvider>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthProvider from './components/context/AuthContext.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Authentication from './components/authentication/Authentication.jsx'
import ProtectedRoute from './components/shared/ProtectedRoute.jsx'
import AdminProfile from './components/profile/AdminProfile.jsx'

const router = createBrowserRouter([
	{ path: "/", element: <Authentication /> },
	{ path: "/dashboard", element: <ProtectedRoute><App /></ProtectedRoute>},
	{ path: "/profile", element: <ProtectedRoute><AdminProfile /></ProtectedRoute> }
])

const { ToastContainer } = createStandaloneToast();

ReactDOM.createRoot(document.getElementById('root')).render(
  	<React.StrictMode>
    	<ChakraProvider>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
			<ToastContainer />
    	</ChakraProvider>
  	</React.StrictMode>,
)

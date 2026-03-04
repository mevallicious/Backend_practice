import React from 'react'
import FaceExpression from './features/expression/pages/FaceExpression'
import { router } from './app.routes'
import { RouterProvider } from "react-router";
import "./features/shared/styles/global.scss"
import { AuthProvider } from './features/auth/auth.context';

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
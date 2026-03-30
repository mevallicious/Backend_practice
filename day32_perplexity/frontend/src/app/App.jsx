import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import { useAuth } from "../features/auth/hooks/useAuth"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const App = () => {

  const auth = useAuth()
  const theme = useSelector((state) => state.theme.mode)

  // auth
  useEffect(() => {
    auth.handleGetMe()
  }, [])


  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
  }, [theme])

  return <RouterProvider router={router} />
}

export default App
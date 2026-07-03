import { RouterProvider } from "react-router-dom"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import ErrorBoundary from "./components/ErrorBoundary.jsx"

function App() {

  return (
    <AuthProvider>
      <InterviewProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthPage } from './pages/AuthPage'
import { CapstonesPage } from './pages/CapstonesPage'
import { CourseDetailPage } from './pages/CourseDetailPage'
import { CoursesPage } from './pages/CoursesPage'
import { DashboardPage } from './pages/DashboardPage'
import { HomePage } from './pages/HomePage'
import { InterviewLabPage } from './pages/InterviewLabPage'
import { LessonPage } from './pages/LessonPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PathDetailPage } from './pages/PathDetailPage'
import { PathsPage } from './pages/PathsPage'
import { QuizPage } from './pages/QuizPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'account', element: <AuthPage /> },
      { path: 'courses', element: <CoursesPage /> },
      { path: 'courses/:courseId', element: <CourseDetailPage /> },
      { path: 'paths', element: <PathsPage /> },
      { path: 'paths/:pathId', element: <PathDetailPage /> },
      { path: 'capstones', element: <CapstonesPage /> },
      { path: 'interview-lab', element: <InterviewLabPage /> },
      { path: 'dashboard', element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
      { path: 'learn/:courseId/:lessonId', element: <ProtectedRoute><LessonPage /></ProtectedRoute> },
      { path: 'quiz/:courseId/:quizId', element: <ProtectedRoute><QuizPage /></ProtectedRoute> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}

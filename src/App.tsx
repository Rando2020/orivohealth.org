import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CapstonesPage } from './pages/CapstonesPage'
import { CourseDetailPage } from './pages/CourseDetailPage'
import { CoursesPage } from './pages/CoursesPage'
import { DashboardPage } from './pages/DashboardPage'
import { HomePage } from './pages/HomePage'
import { InterviewLabPage } from './pages/InterviewLabPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PathDetailPage } from './pages/PathDetailPage'
import { PathsPage } from './pages/PathsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'courses', element: <CoursesPage /> },
      { path: 'courses/:courseId', element: <CourseDetailPage /> },
      { path: 'paths', element: <PathsPage /> },
      { path: 'paths/:pathId', element: <PathDetailPage /> },
      { path: 'capstones', element: <CapstonesPage /> },
      { path: 'interview-lab', element: <InterviewLabPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}

import { FC } from 'react'
import { Sidebar } from './components/Sidebar'
import { SidebarContextProvider } from './contexts/Sidebar'
import { Index } from './views/Index'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from './views/Provider'

const Layout: FC = () => {
  return (
    <SidebarContextProvider>
      <Outlet />
      <Sidebar />
    </SidebarContextProvider>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Index />,
      },
      {
        path: '/:domain/:id',
        element: <Provider />,
      },
    ],
  },
])

export const App: FC = () => {
  return <RouterProvider {...{ router }} />
}

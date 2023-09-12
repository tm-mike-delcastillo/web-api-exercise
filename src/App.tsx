import { FC } from 'react'
import { Sidebar } from './components/Sidebar'
import { SidebarContextProvider } from './contexts/Sidebar'
import { Index } from './views/Index'

export const App: FC = () => {
  return (
    <SidebarContextProvider>
      <Index />
      <Sidebar />
    </SidebarContextProvider>
  )
}

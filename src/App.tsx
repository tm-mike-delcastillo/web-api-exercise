import { FC } from 'react'
import { ExploreButton } from './components/ExploreButton'
import { Sidebar } from './components/Sidebar'
import { SidebarContextProvider } from './contexts/Sidebar'

import './styles/global.css'

export const App: FC = () => {
  return (
    <SidebarContextProvider>
      <ExploreButton />
      <Sidebar />
    </SidebarContextProvider>
  )
}

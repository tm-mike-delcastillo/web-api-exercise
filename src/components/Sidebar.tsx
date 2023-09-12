import { FC } from 'react'
import { useSidebarContext } from '../contexts/Sidebar'
import { ApiList } from './ApiList'
import { Overlay } from './Overlay'

export const Sidebar: FC = () => {
  const { isOpen, toggle } = useSidebarContext()

  return (
    <>
      <Overlay show={isOpen} onClick={() => toggle(false)} />
      <div className="sidebar">
        <div className="sidebar-header">Select Provider</div>
        <ApiList />
      </div>
    </>
  )
}

import { FC } from 'react'
import { ApiList } from './ApiList'
import { Overlay } from './Overlay'
import { useSidebarContext } from '../hooks/useSidebarContext'

export const Sidebar: FC = () => {
  const { isOpen, toggle } = useSidebarContext()

  const className = `sidebar ${isOpen ? 'open' : 'closed'}`

  return (
    <>
      <Overlay show={isOpen} onClick={() => toggle(false)} />
      <div {...{ className }}>
        <div className="sidebar-header">Select Provider</div>
        <ApiList />
      </div>
    </>
  )
}

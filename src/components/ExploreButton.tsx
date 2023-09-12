import { FC } from 'react'
import { useSidebarContext } from '../contexts/Sidebar'

export const ExploreButton: FC = () => {
  const { toggle } = useSidebarContext()
  return <button className="explore-button" onClick={() => toggle()}>Explore web APIs</button>
}

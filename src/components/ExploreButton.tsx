import { FC } from 'react'
import { useSidebarContext } from '../hooks/useSidebarContext'

export const ExploreButton: FC = () => {
  const { toggle } = useSidebarContext()
  return (
    <button className="explore-button" onClick={() => toggle()}>
      Explore web APIs
    </button>
  )
}

import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { useLocation } from 'react-router-dom'

type SidebarContextData = {
  isOpen: boolean
  toggle: (state?: boolean) => void
}

export const SidebarContext = createContext<SidebarContextData>({
  isOpen: false,
  toggle: () => {},
})

export const SidebarContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const route = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const toggle: SidebarContextData['toggle'] = (state) => {
    setIsOpen((value) => (typeof state === 'boolean' ? state : !value))
  }

  const contextData: SidebarContextData = { isOpen, toggle }

  useEffect(() => {
    setIsOpen(false)
  }, [route])

  return (
    <SidebarContext.Provider value={contextData}>
      {children}
    </SidebarContext.Provider>
  )
}


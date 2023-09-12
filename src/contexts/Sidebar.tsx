import { createContext, FC, ReactNode, useContext, useState } from 'react'

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
  const [isOpen, setIsOpen] = useState(false)
  const toggle: SidebarContextData['toggle'] = (state) => {
    setIsOpen((value) => (typeof state === 'boolean' ? state : !value))
  }

  const contextData: SidebarContextData = { isOpen, toggle }

  return (
    <SidebarContext.Provider value={contextData}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = () => useContext(SidebarContext)

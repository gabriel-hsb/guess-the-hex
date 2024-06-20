import { createContext } from 'react'

export const GlobalContext = createContext()

export const GlobalStorage = ({ children }) => {
  const foo = 'foo'

  return (
    <GlobalContext.Provider value={{ foo }}>{children}</GlobalContext.Provider>
  )
}

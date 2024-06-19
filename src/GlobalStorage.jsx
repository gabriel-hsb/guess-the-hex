import { createContext, useState } from 'react'

export const GlobalContext = createContext()

export const GlobalStorage = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false)

  return (
    <GlobalContext.Provider value={{ setGameStarted, gameStarted }}>
      {children}
    </GlobalContext.Provider>
  )
}

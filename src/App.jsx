import { GlobalStorage } from '@/GlobalStorage'
import { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from '@/components/Footer'
import GameOptions from '@/components/GameOptions'
import Header from '@/components/Header'
import NotFound from '@/components/NotFound'
import TextToColorGame from '@/components/TextToColorGame'

function App() {
  // to reset component
  const [key, setKey] = useState(0)
  const [foo, setFoo] = useState(3)

  const [gameStarted, setGameStarted] = useState(false)

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     setFoo(localStorage.getItem('difficulty'))
  //   }

  //   window.addEventListener('storage', handleStorageChange)

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange)
  //   }
  // }, [])

  // const updateFoo = (newFoo) => {
  //   localStorage.setItem('difficulty', newFoo)
  //   setFoo(newFoo)
  // }

  return (
    <>
      <GlobalStorage>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                gameStarted ? (
                  <TextToColorGame
                    key={key}
                    setKey={setKey}
                    buttonsQty={foo}
                    setGameStarted={setGameStarted}
                    gameStarted={gameStarted}
                  />
                ) : (
                  <GameOptions
                    setFoo={setFoo}
                    setGameStarted={setGameStarted}
                    gameStarted={gameStarted}
                  />
                )
              }
            />
            <Route path="*" element={NotFound} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </GlobalStorage>
    </>
  )
}
export default App

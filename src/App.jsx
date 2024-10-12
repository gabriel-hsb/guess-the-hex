import { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from '@/components/Footer'
import GameOptions from '@/components/GameOptions'
import Header from '@/components/Header'
import TextToColorGame from '@/components/TextToColorGame'

function App() {
  // to reset component
  const [key, setKey] = useState(0)
  const [difficulty, setDifficulty] = useState(3)

  const [gameStarted, setGameStarted] = useState(false)

  return (
    <>
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
                  buttonsQty={difficulty}
                  setGameStarted={setGameStarted}
                  gameStarted={gameStarted}
                />
              ) : (
                <GameOptions
                  setDifficulty={setDifficulty}
                  difficulty={difficulty}
                  setGameStarted={setGameStarted}
                  gameStarted={gameStarted}
                />
              )
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
export default App

import { useEffect, useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { GlobalStorage } from '@/GlobalStorage'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import NotFound from '@/components/NotFound'
import TextToColorGame from '@/components/TextToColorGame'
import GameOptions from './components/GameOptions'

function App() {
  // to reset component
  const [key, setKey] = useState(0)
  const [foo, setFoo] = useState(localStorage.getItem('difficulty'))

  useEffect(() => {
    const handleStorageChange = () => {
      setFoo(localStorage.getItem('difficulty'))
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const updateFoo = (newFoo) => {
    localStorage.setItem('difficulty', newFoo)
    setFoo(newFoo)
  }

  console.log(foo)

  return (
    <>
      <GlobalStorage>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <TextToColorGame key={key} setKey={setKey} buttonsQty={foo} />
              }
            />
            <Route path="*" element={NotFound} />
          </Routes>
          <GameOptions updateFoo={updateFoo} />
          <Footer />
        </BrowserRouter>
      </GlobalStorage>
    </>
  )
}
export default App

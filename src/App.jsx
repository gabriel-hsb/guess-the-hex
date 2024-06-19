import { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import NotFound from '@/components/NotFound'
import TextToColorGame from '@/components/TextToColorGame'

function App() {
  const [key, setKey] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <TextToColorGame key={key} setKey={setKey} buttonsQty={8} />
            }
          />
          <Route path="*" element={NotFound} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
export default App

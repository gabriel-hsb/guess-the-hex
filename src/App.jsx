import { useState } from 'react'

import Footer from './components/Footer'
import GameSection from './components/GameSection'
import Header from './components/Header'

function App() {
  const [key, setKey] = useState(0)

  return (
    <>
      <Header />
      <GameSection key={key} setKey={setKey} />
      <Footer />
    </>
  )
}
export default App

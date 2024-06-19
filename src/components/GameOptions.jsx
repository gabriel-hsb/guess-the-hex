import { Slider } from '@mui/material'

import { useContext, useEffect } from 'react'

import { GlobalContext } from '@/GlobalStorage'

const GameOptions = ({ updateFoo }) => {
  const { gameStarted } = useContext(GlobalContext)

  function handleSlider(value) {
    updateFoo(value)
  }

  useEffect(() => {
    localStorage.getItem('difficulty')
  }, [])

  return (
    <section className="w-full max-w-3xl">
      <div>
        Selecione a dificuldade:
        <Slider
          aria-label="Difficulty"
          defaultValue={5}
          getAriaValueText={handleSlider}
          valueLabelDisplay="auto"
          shiftStep={1}
          step={1}
          marks
          min={3}
          max={20}
          disabled={gameStarted}
        />
      </div>
    </section>
  )
}

export default GameOptions

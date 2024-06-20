import { Slider } from '@mui/material'

import Button from '@/components/ui/button'

const GameOptions = ({ setFoo, setGameStarted }) => {
  function handleSlider(value) {
    setFoo(value)
  }

  return (
    <section className="m-auto h-[75dvh] w-full max-w-3xl pt-12 text-center text-xl text-amber-500">
      Select the difficulty:
      <div className="my-9">
        <Slider
          aria-label="Difficulty"
          getAriaValueText={handleSlider}
          valueLabelDisplay="auto"
          shiftStep={1}
          defaultValue={4}
          step={1}
          marks
          min={3}
          max={15}
        />
      </div>
      <Button
        className="bg-gradient-to-r from-pink-400 to-pink-600"
        onClick={() => setGameStarted(true)}
      >
        Start game
      </Button>
    </section>
  )
}

export default GameOptions

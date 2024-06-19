import { useEffect, useRef, useState } from 'react'

import Button from '@/components/ui/button'
import Slider from '@mui/material/Slider'

const TextToColorGame = ({ setKey, buttonsQty }) => {
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [isAnswerRight, setIsAnswerRight] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [buttonColors, setButtonColors] = useState(
    Array.from({ length: buttonsQty }, randomHexColor),
  )

  const coloredDiv = useRef()
  const feedbackText = useRef()

  useEffect(() => {
    const newCorrectAnswer = randomHexColor()
    setCorrectAnswer(newCorrectAnswer)

    coloredDiv.current.style.backgroundColor = correctAnswer

    let random = Math.random().toFixed() * buttonColors.length - 1
    if (random <= 1) random = 1

    setButtonColors((prevColors) => {
      const newColors = [...prevColors]
      newColors[random] = newCorrectAnswer
      return newColors
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function randomHexColor() {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .toUpperCase()
      .padStart(6, '0')
    return `#${randomColor}`
  }

  function checkAnswer({ target }) {
    if (!gameStarted) setGameStarted(true)
    const guessedColor = target.innerText

    if (guessedColor === correctAnswer) {
      setIsAnswerRight(true)
      setIsLoading(true)

      // reloads component
      setTimeout(() => {
        setKey((prevKey) => prevKey + 1)
      }, 600)
    } else {
      setIsAnswerRight(false)
      target.disabled = true
    }

    if (feedbackText.current) feedbackText.current.style.color = guessedColor
  }

  function valuetext(value) {
    return `${value}°C`
  }

  console.log(valuetext())

  return (
    <section className="m-auto h-[calc(100vh-5rem)] max-w-2xl pt-28">
      <div className="flex flex-col items-center justify-center gap-6">
        <div
          ref={coloredDiv}
          style={{ backgroundColor: correctAnswer }}
          className="size-48 rounded-full"
        />

        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {buttonColors.map((color, i) => (
            <Button key={i} onClick={checkAnswer} disabled={isLoading}>
              {color}
            </Button>
          ))}
        </div>
      </div>

      <Slider
        aria-label="Dificulty"
        defaultValue={4}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        shiftStep={1}
        step={1}
        marks
        min={3}
        max={20}
      />

      <span
        ref={feedbackText}
        className="mt-3 block w-full text-center text-2xl"
      >
        {gameStarted && (isAnswerRight ? 'Right Answer!' : 'Wrong Answer')}
      </span>
    </section>
  )
}

export default TextToColorGame

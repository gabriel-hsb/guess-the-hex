import { useEffect, useRef, useState } from 'react'

import Button from '@/components/ui/button'

const TextToColorGame = ({ setKey, buttonsQty }) => {
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [isAnswerRight, setIsAnswerRight] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const coloredDiv = useRef()

  const [buttonColors, setButtonColors] = useState(
    Array.from({ length: buttonsQty }, randomHexColor),
  )

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
      setTimeout(() => {
        // reloads component

        setKey((prevKey) => prevKey + 1)
        // setButtonColors(Array.from({ length: 3 }, randomHexColor)) // Atualiza as cores dos botões
      }, 1000)
    } else {
      setIsAnswerRight(false)
      target.disabled = true
    }
  }

  return (
    <section className="m-auto h-dvh max-w-fit">
      <div className="mt-28 flex flex-col items-center justify-center">
        <div
          ref={coloredDiv}
          style={{ backgroundColor: correctAnswer }}
          className="size-48 rounded-full"
        />

        <div className="mt-3 flex justify-center gap-3">
          {buttonColors.map((color, i) => (
            <Button key={i} onClick={checkAnswer} disabled={isLoading}>
              {color}
            </Button>
          ))}
        </div>
      </div>

      {gameStarted && (
        <span className="mt-3 block w-full text-center">
          {isAnswerRight ? 'Acertou' : 'Errou'}
        </span>
      )}
    </section>
  )
}

export default TextToColorGame

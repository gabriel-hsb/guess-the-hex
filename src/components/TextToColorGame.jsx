import { useEffect, useRef, useState } from 'react'

import { Tilt } from 'react-tilt'

import Button from '@/components/ui/button'

const TextToColorGame = ({
  setKey,
  buttonsQty,
  setGameStarted,
  gameStarted,
}) => {
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [isAnswerRight, setIsAnswerRight] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [buttonColors, setButtonColors] = useState(
    Array.from({ length: buttonsQty }, randomHexColor),
  )

  const coloredDiv = useRef()
  const feedbackText = useRef()

  const defaultOptions = {
    reverse: true, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit.
    scale: 1,
  }

  useEffect(() => {
    setShowFeedback(false)

    const newCorrectAnswer = randomHexColor()
    setCorrectAnswer(newCorrectAnswer)
    coloredDiv.current.style.backgroundColor = correctAnswer

    const random = Math.floor(Math.random() * buttonsQty)

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
    setShowFeedback(true)

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

  return (
    <section className="m-auto flex h-dvh max-w-2xl flex-col items-center pt-8 sm:h-[calc(100vh-5rem)] sm:pt-16">
      <div className="pb-8 sm:pb-16">
        <div className="flex flex-col items-center justify-center gap-6">
          <Tilt options={defaultOptions}>
            <div
              ref={coloredDiv}
              style={{ backgroundColor: correctAnswer }}
              className="size-48 rounded-full"
            />
          </Tilt>

          <div className="mt-3 flex flex-wrap justify-center gap-3">
            {buttonColors.map((color, i) => (
              <Button key={i} onClick={checkAnswer} disabled={isLoading}>
                {color}
              </Button>
            ))}
          </div>
        </div>

        <span
          ref={feedbackText}
          className="mt-3 block h-4 w-full text-center text-2xl"
        >
          {showFeedback &&
            gameStarted &&
            (isAnswerRight ? 'Right Answer!' : 'Wrong Answer')}
        </span>
      </div>

      <Button
        className={
          'bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400 text-black/80'
        }
        onClick={() => location.reload()}
      >
        Restart game
      </Button>
    </section>
  )
}

export default TextToColorGame

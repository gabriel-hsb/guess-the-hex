import { useEffect, useRef, useState } from 'react'

import Button from '@/components/ui/button'

const GameSection = ({ setKey }) => {
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [isAnswerRight, setIsAnswerRight] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)

  const coloredDiv = useRef()

  const [buttonColors, setButtonColors] = useState(
    Array.from({ length: 3 }, randomHexColor),
  )

  useEffect(() => {
    setCorrectAnswer(randomHexColor)
    coloredDiv.current.style.backgroundColor = randomRgb
  }, [correctAnswer])

  // const rgbToHex = (rgb) => {
  //   if (typeof rgb !== 'string') throw new Error('Apenas strings são aceitas')
  //   const values = rgb.match(/\d+/g).map(Number)
  //   return (
  //     '#' +
  //     values
  //       .map((value) => {
  //         const hex = value.toString(16)
  //         return hex.length === 1 ? '0' + hex : hex
  //       })
  //       .join('')
  //   ).toUpperCase()
  // }

  const randomRgb = () => {
    const randomNumberStr = String((Math.random() * 255).toFixed())
    let arr = []

    for (let i = 0; i < 3; i++) {
      arr = [...arr, randomNumberStr()]
    }
    const values = arr.join(', ')
    return `rgb(${values})`
  }

  function randomHexColor() {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .toUpperCase()
      .padStart(6, '0')
    return `#${randomColor}`
  }

  const checkAnswer = ({ target }) => {
    if (!gameStarted) setGameStarted(true)
    const guessedColor = target.innerText

    if (guessedColor === correctAnswer) {
      setIsAnswerRight(true)

      // reloads component
      setTimeout(() => {
        setKey((prevKey) => prevKey + 1)
        setButtonColors(Array.from({ length: 3 }, randomHexColor)) // Atualiza as cores dos botões
      }, 1000)
    } else {
      setIsAnswerRight(false)
      target.disabled = true
    }
  }

  return (
    <section className="mx-auto h-dvh max-w-fit py-4">
      <div
        ref={coloredDiv}
        style={{ backgroundColor: correctAnswer }}
        className="size-72"
      />

      <div className="mt-3 flex justify-center gap-3">
        {buttonColors.map((color, index) => (
          <Button key={index} onClick={checkAnswer}>
            {color}
          </Button>
        ))}
      </div>

      {gameStarted && (
        <span className="mt-3 block w-full text-center">
          {isAnswerRight ? 'Acertou' : 'Errou'}
        </span>
      )}
    </section>
  )
}

export default GameSection

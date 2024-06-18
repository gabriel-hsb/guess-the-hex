import { useEffect, useRef, useState } from 'react'

import Button from '@/components/ui/button'

const GameSection = () => {
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [isAnswerRight, setIsAnswerRight] = useState(null)
  const [hasGameStarted, setHasGameStarted] = useState(false)
  const coloredDiv = useRef()

  useEffect(() => {
    setCorrectAnswer(randomRgb)

    coloredDiv.current.style.backgroundColor = randomRgb
  }, [])

  function rgbToHex(rgb) {
    if (typeof rgb !== 'string') throw new Error('Apenas strings são aceitas')
    const values = rgb.match(/\d+/g).map(Number)
    return (
      '#' +
      values
        .map((value) => {
          const hex = value.toString(16)
          return hex.length === 1 ? '0' + hex : hex
        })
        .join('')
    ).toUpperCase()
  }

  function randomNumberStr() {
    return String((Math.random() * 255).toFixed())
  }

  function randomRgb() {
    let arr = []
    for (let i = 0; i < 3; i++) {
      arr = [...arr, randomNumberStr()]
    }
    const values = arr.join(', ')
    return `rgb(${values})`
  }

  function checkAnswer({ target }) {
    setHasGameStarted(true)
    const guessedColor = target.attributes[1].value
    console.log(guessedColor)

    if (guessedColor === correctAnswer) {
      setIsAnswerRight(true)
    } else {
      target.disabled = true
      setIsAnswerRight(false)
    }
  }

  return (
    <section className="mx-auto h-dvh max-w-fit py-4">
      <div
        ref={coloredDiv}
        style={{ backgroundColor: correctAnswer }}
        className="size-72"
      />
      {correctAnswer && (
        <div className="mt-3 flex justify-center gap-3">
          {/* TODO: qual/como comparar valor correto do guessed */}
          <Button onClick={checkAnswer} guess={correctAnswer}>
            {rgbToHex(correctAnswer)}
          </Button>
          <Button onClick={checkAnswer} guess="cccccc">
            #cccccc
          </Button>
          <Button onClick={checkAnswer} guess="cccccc">
            #ccafcc
          </Button>
        </div>
      )}

      {hasGameStarted && (
        <span className="mt-3 block w-full text-center">
          {' '}
          {isAnswerRight ? 'Acertou' : 'Errou'}{' '}
        </span>
      )}
    </section>
  )
}

export default GameSection

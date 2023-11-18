import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'

import finishTaskSound from '../../../assets/alarm-beep.mp3'
import { cycleContext } from '../../../context/CycleContext'

export function CountDown() {
  const {
    activeCycle,
    amountSecondsPassed,
    finishCurrentCycle,
    setSecondsPassed,
  } = useContext(cycleContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const amountMinutes = Math.floor(currentSeconds / 60)
  const amountSeconds = currentSeconds % 60

  const minutes = String(amountMinutes).padStart(2, '0')
  const seconds = String(amountSeconds).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          finishCurrentCycle()
          setSecondsPassed(0)
          playAudio()

          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, finishCurrentCycle, setSecondsPassed])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${activeCycle.task} - ${minutes}:${seconds}`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [minutes, seconds, activeCycle])

  function playAudio() {
    const finishCycleSound = new Audio(finishTaskSound)
    finishCycleSound.play()
  }

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}

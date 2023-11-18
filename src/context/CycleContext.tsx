import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, cycleReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  finisheCurrentCycleAction,
  interruptCycleAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

interface CycleContextData {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  cycles: Cycle[]
  setSecondsPassed: (seconds: number) => void
  finishCurrentCycle: () => void
  interruptCycle: () => void
  createNewCycle: (data: NewCycleFormData) => void
}

interface IContextProvinder {
  children: ReactNode
}

export const cycleContext = createContext({} as CycleContextData)

export function CycleContextProvinder({ children }: IContextProvinder) {
  const [cyclesStates, dispatch] = useReducer(
    cycleReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (defaultState) => {
      const storeStateAsJSON = localStorage.getItem(
        '@react-timer:cycles-state-1.0.0',
      )
      if (storeStateAsJSON) {
        return JSON.parse(storeStateAsJSON)
      }
      return defaultState
    },
  )

  const { activeCycleId, cycles } = cyclesStates
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  useEffect(() => {
    const cyclesToJSON = JSON.stringify(cyclesStates)
    localStorage.setItem('@react-timer:cycles-state-1.0.0', cyclesToJSON)
  }, [cyclesStates])

  function createNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCycle() {
    dispatch(interruptCycleAction())
  }

  function finishCurrentCycle() {
    dispatch(finisheCurrentCycleAction())
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  return (
    <cycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        setSecondsPassed,
        finishCurrentCycle,
        amountSecondsPassed,
        interruptCycle,
        createNewCycle,
        cycles,
      }}
    >
      {children}
    </cycleContext.Provider>
  )
}

import { typeAction } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finisheDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cycleReducer(state: CyclesState, action: any) {
  if (action.type === typeAction.ADD_NEW_CYCLE) {
    return {
      ...state,
      cycles: [...state.cycles, action.payload.newCycle],
      activeCycleId: action.payload.newCycle.id,
    }
  }

  if (action.type === typeAction.MARK_CURRENT_CYCLE_AS_INTERRUPTED) {
    return {
      ...state,
      cycles: state.cycles.map((cycle) => {
        if (cycle.id === state.activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
      activeCycleId: null,
    }
  }

  if (action.type === typeAction.MARK_CURRENT_CYCLE_AS_FINISHED) {
    return {
      ...state,
      cycles: state.cycles.map((cycle) => {
        if (cycle.id === state.activeCycleId) {
          return { ...cycle, finisheDate: new Date() }
        } else {
          return cycle
        }
      }),
      activeCycleId: null,
    }
  }

  return state
}

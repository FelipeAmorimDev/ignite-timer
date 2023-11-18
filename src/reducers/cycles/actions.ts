import { Cycle } from './reducer'

export enum typeAction {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  MARK_CURRENT_CYCLE_AS_INTERRUPTED = 'MARK_CURRENT_CYCLE_AS_INTERRUPTED',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: typeAction.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptCycleAction() {
  return {
    type: typeAction.MARK_CURRENT_CYCLE_AS_INTERRUPTED,
  }
}

export function finisheCurrentCycleAction() {
  return {
    type: typeAction.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}

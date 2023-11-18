import { useContext } from 'react'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

import { UseFormRegister } from 'react-hook-form'
import { cycleContext } from '../../../context/CycleContext'

interface NewCycleFormProps {
  register: UseFormRegister<{ task: string; minutesAmount: number }>
}

export function NewCycleForm({ register }: NewCycleFormProps) {
  const { activeCycle } = useContext(cycleContext)
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        list="task-suggestions"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Banana" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={1}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}

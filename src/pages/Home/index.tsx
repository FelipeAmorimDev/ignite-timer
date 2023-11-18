import { useForm } from 'react-hook-form'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { HandPalm, Play } from 'phosphor-react'

import { CountDown } from './CountDown'
import { NewCycleForm } from './NewCycleForm'

import {
  HomeContainer,
  InterruptPomodoroButton,
  StartPomodoroButton,
} from './styles'
import { useContext } from 'react'
import { cycleContext } from '../../context/CycleContext'

// Esquema de validação criado
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60),
})

// Interface para melhorar a intelisense da IDE
// interface NewCycleFormData {
//   task: string
//   minutesAmount: number
// }

// Inferir a tipagem atraves do schema de validação
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const Home = () => {
  // UseForm pode receber um objeto com uma propriedade resolver que executa a validação
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const task = watch('task')
  const isSubmitDisable = !task

  const { activeCycle, interruptCycle, createNewCycle } =
    useContext(cycleContext)

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)

    reset()
  }
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm register={register} />
        <CountDown />

        {activeCycle ? (
          <InterruptPomodoroButton type="button" onClick={interruptCycle}>
            <HandPalm size={24} />
            Interromper
          </InterruptPomodoroButton>
        ) : (
          <StartPomodoroButton type="submit" disabled={isSubmitDisable}>
            <Play size={24} />
            Começar
          </StartPomodoroButton>
        )}
      </form>
    </HomeContainer>
  )
}

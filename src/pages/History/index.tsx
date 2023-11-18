import { HistoryContainer, HistoryList, Status } from './styles'
import { cycleContext } from '../../context/CycleContext'
import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export const History = () => {
  const { cycles } = useContext(cycleContext)
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finisheDate && (
                      <Status $statusColor="green">Concluido</Status>
                    )}
                    {cycle.interruptedDate && (
                      <Status $statusColor="red">Interrompido</Status>
                    )}
                    {!cycle.interruptedDate && !cycle.finisheDate && (
                      <Status $statusColor="yellow">Em Andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}

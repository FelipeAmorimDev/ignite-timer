import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const BasePomodoroButton = styled.button`
  width: 100%;
  padding: 1.25rem;
  border-radius: 8px;
  border: 0;
  color: ${(props) => props.theme.white};
  cursor: pointer;
  font-weight: bold;
  line-height: 1.8375;

  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartPomodoroButton = styled(BasePomodoroButton)`
  background: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
    outline: 0;
  }
`

export const InterruptPomodoroButton = styled(BasePomodoroButton)`
  background: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-700']};
    outline: 0;
  }
`

import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { CycleContextProvinder } from './context/CycleContext'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvinder>
          <Router />
        </CycleContextProvinder>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App

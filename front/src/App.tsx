import { Container, Typography } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import AppToolbar from './Components/AppToolbar/AppToolbar'
import Register from './Features/users/Register'
import Login from './Features/users/Login'

function App() {

  return (
    <>
      <main>
        <Container>
          <header>
            <AppToolbar/>
          </header>
          <Routes>
            <Route path="/register" element={(<Register/>)}/>
            <Route path="/login" element={(<Login/>)}/>
            <Route path="*" element={(
              <Typography variant="h3">Not Found!</Typography>
            )}/>
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App

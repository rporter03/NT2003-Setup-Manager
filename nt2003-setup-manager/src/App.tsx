import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import CreateSetup from './pages/CreateSetup'
import ViewSetups from './pages/ViewSetups'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateSetup />} />
        <Route path="/setups" element={<ViewSetups />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

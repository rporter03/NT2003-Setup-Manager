import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import CreateSetup from './pages/CreateSetup'
import ViewSetups from './pages/ViewSetups'
import EditSetup from './pages/EditSetup'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateSetup />} />
        <Route path="/setups" element={<ViewSetups />} />
        <Route path="/setups/:id/edit" element={<EditSetup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

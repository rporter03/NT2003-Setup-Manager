import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Button from './components/Button'

function App() {
  return (
    <div className="min-h-screen">
      <header className="pt-12 text-center">
        <h1 className="text-4xl font-bold">
          NASCAR Thunder 2003 Setup Manager
        </h1>
      </header>

      <main className="mt-12 flex flex-col items-center gap-2">
        <Button>Create Setup</Button>
        <Button>View Setups</Button>
      </main>
    </div>
  )
}

export default App

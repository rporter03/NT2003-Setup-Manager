import { useNavigate } from 'react-router'
import Button from '../components/Button'

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen">
            <header className="pt-12 text-center">
                <h1 className="text-4xl font-bold">
                    NASCAR Thunder 2003 Setup Manager
                </h1>
            </header>
            <main className="mt-12 flex flex-col items-center gap-2">
                <Button onClick={() => navigate('/create')}>Create Setup</Button>
                <Button onClick={() => navigate('/setups')}>View Setups</Button>
            </main>
        </div>
    )
}
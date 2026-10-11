import { useNavigate } from 'react-router'
import Button from '../components/Button'

export default function CreateSetup() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen">
            <header className="pt-12 text-center">
                <h1 className="text-4xl font-bold">Create Setup</h1>
            </header>
            <main className="mt-12 flex flex-col items-center gap-2">
                <Button onClick={() => navigate('/')}>Back</Button>
            </main>
        </div>
    )
}
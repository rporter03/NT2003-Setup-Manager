import { useNavigate } from 'react-router'
import SetupForm from '../components/SetupForm'
import { useSetups } from '../hooks/useSetups'

export default function CreateSetup() {
    const navigate = useNavigate()
    const { addSetup } = useSetups()

    return (
        <div className="min-h-screen">
            <header className="pt-12 text-center">
                <h1 className="text-4xl font-bold">Create Setup</h1>
            </header>
            <main className="mt-12 flex flex-col items-center gap-2">
                <SetupForm
                    onSubmit={(data) => {
                        addSetup(data)
                        navigate('/setups')
                    }}
                    onCancel={() => navigate('/')}
                />
            </main>
        </div>
    )
}
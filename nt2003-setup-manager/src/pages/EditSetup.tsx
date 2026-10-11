import { useNavigate, useParams } from 'react-router'
import SetupForm from '../components/SetupForm'
import Button from '../components/Button'
import { useSetups } from '../hooks/useSetups'

export default function EditSetup() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { setups, updateSetup } = useSetups()
    const setup = setups.find((s) => s.id === id)
    if (!setup) {
        return (
            <div className="min-h-screen">
                <header className="pt-12 text-center">
                    <h1 className="text-4xl font-bold">Setup not found</h1>
                </header>
                <main className="mt-12 flex flex-col items-center">
                    <Button onClick={() => navigate('/setups')}>Back to Setups</Button>
                </main>
            </div>
        )
    }
    return (
        <div className="min-h-screen">
            <header className="pt-12 text-center">
                <h1 className="text-4xl font-bold">Edit Setup</h1>
            </header>
            <main className="mt-12 flex justify-center px-4 pb-12">
                <SetupForm
                    initialValues={setup}
                    onSubmit={(data) => {
                        updateSetup(setup.id, data)
                        navigate('/setups')
                    }}
                    onCancel={() => navigate('/setups')}
                />
            </main>
        </div>
    )
}
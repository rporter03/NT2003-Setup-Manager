import { useNavigate } from 'react-router'
import { useState } from 'react'
import Button from '../components/Button'
import SetupCard from '../components/SetupCard'
import { inputClass } from '../components/fieldStyles'
import { useSetups } from '../hooks/useSetups'
import { getTrackName } from '../lib/tracks'

export default function ViewSetups() {
    const navigate = useNavigate()
    const { setups } = useSetups()
    const [search, setSearch] = useState('')
    const query = search.trim().toLowerCase()
    const visible = setups
        .filter(
            (s) =>
                s.name.toLowerCase().includes(query) ||
                getTrackName(s.trackID).toLowerCase().includes(query),
        )
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))

    return (
        <div className="min-h-screen">
            <header className="pt-12 text-center">
                <h1 className="text-4xl font-bold">View Setups</h1>
            </header>
            <main className="mx-auto mt-12 flex w-full max-w-3xl flex-col gap-4 px-4 pb-12">
                <input
                    type="search"
                    className={inputClass}
                    placeholder="Search by setup name or track..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {setups.length === 0 && (
                    <p className="text-center">No setups yet. Create a setup to view setups.</p>
                )}

                {setups.length > 0 && visible.length === 0 && (
                    <p className="text-center">No setups match "{search}".</p>
                )}
                {visible.map((s) => (
                    <SetupCard key={s.id} setup={s} />
                ))}
                <div className="mt-4 flex flex-col items-center gap-2">
                    <Button onClick={() => navigate('/create')}>Create Setup</Button>
                    <Button onClick={() => navigate('/')}>Back</Button>
                </div>
            </main>
        </div>
    )
}
import { useNavigate } from 'react-router'
import { useState, useRef, useLayoutEffect } from 'react'
import { animate, createScope, stagger } from 'animejs'
import Button from '../components/Button'
import SetupCard from '../components/SetupCard'
import ConfirmDialog from '../components/ConfirmDialog'
import { inputClass } from '../components/fieldStyles'
import { useSetups } from '../hooks/useSetups'
import { getTrackName } from '../lib/tracks'
import type { Setup } from '../types/setup'

export default function ViewSetups() {
    const navigate = useNavigate()
    const { setups, deleteSetup } = useSetups()
    const [search, setSearch] = useState('')
    const [setupToDelete, setSetupToDelete] = useState<Setup | null>(null)
    const root = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
        const scope = createScope({ root }).add(() => {
            animate('.setup-card', {
                opacity: [0, 1],
                translateY: [24, 0],
                duration: 450,
                delay: stagger(80),
                ease: 'outQuad',
            })
        })
        return () => scope.revert()
    }, [])
    const query = search.trim().toLowerCase()
    const visible = setups
        .filter(
            (s) =>
                s.name.toLowerCase().includes(query) ||
                getTrackName(s.trackID).toLowerCase().includes(query),
        )
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))

    return (
        <div ref={root} className="min-h-screen">
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
                    <SetupCard 
                    key={s.id} 
                    setup={s} 
                    onEdit={() => navigate(`/setups/${s.id}/edit`)}
                    onDelete={() => setSetupToDelete(s)}
                    />
                ))}
                <div className="mt-4 flex flex-col items-center gap-2">
                    <Button onClick={() => navigate('/create')}>Create Setup</Button>
                    <Button onClick={() => navigate('/')}>Back</Button>
                </div>
            </main>
            {setupToDelete && (
                <ConfirmDialog
                    message={`Delete "${setupToDelete.name}"? This can't be undone.`}
                    confirmLabel="Delete"
                    onConfirm={() => {
                        deleteSetup(setupToDelete.id)
                        setSetupToDelete(null)
                    }}
                    onCancel={() => setSetupToDelete(null)}
                />
            )}
        </div>
    )
}
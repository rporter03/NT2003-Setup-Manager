import { useState, useEffect } from 'react'
import type { Setup, NewSetup } from '../types/setup'
import { loadSetups, saveSetups } from '../lib/storage'

export function useSetups() {
    const [setups, setSetups] = useState<Setup[]>(loadSetups)

    useEffect(() => {
        saveSetups(setups)
    }, [setups])

    function addSetup(data: NewSetup) {
        const now = new Date().toISOString()
        const newSetup: Setup = {
            ...data,
            id: crypto.randomUUID(),
            createdAt: now,
            updatedAt: now,
        }
        setSetups((prev) => [...prev, newSetup])
    }

    function updateSetup(id: string, data: NewSetup) {
        setSetups((prev) =>
            prev.map((s) =>
                s.id === id
                    ? { ...s, ...data, updatedAt: new Date().toISOString() }
                    : s,
            ),
        )
    }

    function deleteSetup(id: string) {
        setSetups((prev) => prev.filter((s) => s.id !== id))
    }

    return { setups, addSetup, updateSetup, deleteSetup}
}
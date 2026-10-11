import type { Setup } from '../types/setup'

const STORAGE_KEY = 'nt2003-setups'

export function loadSetups(): Setup[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return []
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

export function saveSetups(setups: Setup[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(setups))
    } catch (error) {
        console.error('Could not save setups', error)
    }
}
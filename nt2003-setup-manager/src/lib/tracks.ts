import { tracks } from '../data/tracks'

export function getTrackName(id: string): string {
    return tracks.find((t) => t.id === id)?.name ?? 'Unknown Track'
}
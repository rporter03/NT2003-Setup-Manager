import { useState } from 'react'
import type { FormEvent } from 'react'
import type { NewSetup, SetupMode } from '../types/setup'
import { tracks } from '../data/tracks'
import { modes, limits } from '../data/setupLimits'
import Button from './Button'

type SetupFormProps = {
    initialValues?: NewSetup
    onSubmit: (data: NewSetup) => void
    onCancel: () => void
}

const inputClass = 'w-full border-2 border-t-bevel-dark border-l-bevel-dark border-b-bevel-light border-r-bevel-light bg-white px-3 py-2';

export default function SetupForm({ initialValues, onSubmit, onCancel }: SetupFormProps) {
    const [name, setName] = useState(initialValues?.name ?? '')
    const [trackID, setTrackID] = useState(initialValues?.trackID ?? '')
    const [mode, setMode] = useState<SetupMode | ''>(initialValues?.mode ?? '')
    const [tirePressure, setTirePressure] = useState(initialValues ? String(initialValues.tirePressure) : '')

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (mode === '') return

        onSubmit({
            // placeholder values
            downforce: { fenderFlare: 74, rearSpoiler: 60 },
            suspension: { frontSprings: 50, rearSprings: 50, swayBar: 0.5, wedge: 0 },
            gearing: { type: 'preset', presetNumber: 1 },
            // end TEMP
            name: name.trim(),
            trackID,
            mode,
            tirePressure: Number(tirePressure),
        })
    }
    return (
        <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4">
            <label className="flex flex-col gap-1 font-semibold">
                Setup Name 
                <input
                    type="text"
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label className="flex flex-col gap-1 font-semibold">
                Track 
                <select
                    className={inputClass}
                    value={trackID}
                    onChange={(e) => setTrackID(e.target.value)}
                    required
                >
                    <option value="">Select a track...</option>
                    {tracks.map((t) => (
                        <option key={t.id} value={t.id}>
                            {t.name}
                        </option>
                    ))}
                </select>
            </label>
            <label className="flex flex-col gap-1 font-semibold">
                Mode
                <select
                    className={inputClass}
                    value={mode}
                    onChange={(e) => setMode(e.target.value as SetupMode)}
                    required
                >
                    <option value="">Select a mode...</option>
                    {modes.map((m) => (
                        <option key={m.value} value={m.value}>
                            {m.label}
                        </option>
                    ))}
                </select>
            </label>
            <label className="flex flex-col gap-1 font-semibold">
                Tire Pressure (PSI)
                <input
                    type="number"
                    className={inputClass}
                    value={tirePressure}
                    min={limits.tirePressure.min}
                    max={limits.tirePressure.max}
                    step={limits.tirePressure.step}
                    onChange={(e) => setTirePressure(e.target.value)}
                    required
                />
            </label>
            <div className="mt-4 flex flex-col items-center gap-2">
                <Button type="submit">Save Setup</Button>
                <Button type="button" onClick={onCancel}>Cancel</Button>
            </div>
        </form>
    )
}
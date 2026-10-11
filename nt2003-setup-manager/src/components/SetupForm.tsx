import { useState } from 'react'
import type { FormEvent } from 'react'
import type { NewSetup, SetupMode } from '../types/setup'
import { tracks } from '../data/tracks'
import { modes, limits } from '../data/setupLimits'
import { buildOptions, formatFraction } from '../lib/options'
import { inputClass } from './fieldStyles'
import NumberField from './NumberField'
import SelectField from './SelectField'
import Button from './Button'

type SetupFormProps = {
    initialValues?: NewSetup
    onSubmit: (data: NewSetup) => void
    onCancel: () => void
}

type FieldValues = {
    tirePressure: string
    fenderFlare: string
    rearSpoiler: string
    frontSprings: string
    rearSprings: string
    swayBar: string
    wedge: string
}

const emptyValues: FieldValues = {
    tirePressure: '',
    fenderFlare: '',
    rearSpoiler: '',
    frontSprings: '',
    rearSprings: '',
    swayBar: '',
    wedge: '',
}

function toFieldValues(s: NewSetup): FieldValues {
    return {
        tirePressure: String(s.tirePressure),
        fenderFlare: String(s.downforce.fenderFlare),
        rearSpoiler: String(s.downforce.rearSpoiler),
        frontSprings: String(s.suspension.frontSprings),
        rearSprings: String(s.suspension.rearSprings),
        swayBar: String(s.suspension.swayBar),
        wedge: String(s.suspension.wedge),
    }
}

const fenderFlareOptions = buildOptions(limits.fenderFlare, formatFraction)
const swayBarOptions = buildOptions(limits.swayBar, formatFraction)

export default function SetupForm({ initialValues, onSubmit, onCancel }: SetupFormProps) {
    const [name, setName] = useState(initialValues?.name ?? '')
    const [trackID, setTrackID] = useState(initialValues?.trackID ?? '')
    const [mode, setMode] = useState<SetupMode | ''>(initialValues?.mode ?? '')
    const [values, setValues] = useState<FieldValues>(
        initialValues ? toFieldValues(initialValues) : emptyValues,
    )

    function setField(key: keyof FieldValues, value: string) {
        setValues((prev) => ({ ...prev, [key]: value}))
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (mode === '') return

        onSubmit({
            // placeholder values
            gearing: { type: 'preset', presetNumber: 1 },
            name: name.trim(),
            trackID,
            mode,
            tirePressure: Number(values.tirePressure),
            downforce: {
                fenderFlare: Number(values.fenderFlare),
                rearSpoiler: Number(values.rearSpoiler),
            },
            suspension: {
                frontSprings: Number(values.frontSprings),
                rearSprings: Number(values.rearSprings),
                swayBar: Number(values.swayBar),
                wedge: Number(values.wedge),
            }
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
            <NumberField
                label="Tire Pressure (PSI)"
                value={values.tirePressure}
                onChange={(v) => setField('tirePressure', v)}
                {...limits.tirePressure}
            />
            <fieldset className="flex flex-col gap-4">
                <legend className="mb-2 text-2xl font-bold">Downforce</legend>
                <SelectField 
                    label="Fender Flare (inches)"
                    value={values.fenderFlare}
                    onChange={(v) => setField('fenderFlare', v)}
                    options={fenderFlareOptions}
                />
                <NumberField   
                    label="Rear Spoiler (degrees)"
                    value={values.rearSpoiler}
                    onChange={(v) => setField('rearSpoiler', v)}
                    {...limits.rearSpoiler}
                />
            </fieldset>
            <fieldset className="flex flex-col gap-4">
                <legend className="mb-2 text-2xl font-bold">Suspension</legend>
                <NumberField   
                    label="Front Springs (%)"
                    value={values.frontSprings}
                    onChange={(v) => setField('frontSprings', v)}
                    {...limits.springs}
                />
                <NumberField   
                    label="Rear Springs (%)"
                    value={values.rearSprings}
                    onChange={(v) => setField('rearSprings', v)}
                    {...limits.springs}
                />
                <SelectField    
                    label="Sway Bar (inches)"
                    value={values.swayBar}
                    onChange={(v) => setField('swayBar', v)}
                    options={swayBarOptions}
                />
                <NumberField    
                    label="Wedge (turns)"
                    value={values.wedge}
                    onChange={(v) => setField('wedge', v)}
                    {...limits.wedge}
                />
            </fieldset>
            <div className="mt-4 flex flex-col items-center gap-2">
                <Button type="submit">Save Setup</Button>
                <Button type="button" onClick={onCancel}>Cancel</Button>
            </div>
        </form>
    )
}
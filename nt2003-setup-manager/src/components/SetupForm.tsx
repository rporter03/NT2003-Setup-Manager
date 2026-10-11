import { useState } from 'react'
import type { FormEvent } from 'react'
import type { NewSetup, SetupMode, Gearing, GearValues } from '../types/setup'
import { tracks } from '../data/tracks'
import { modes, limits } from '../data/setupLimits'
import { gearPresets } from '../data/gearPresets'
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

type GearStrings = Record<keyof GearValues, string>
type GearType = 'preset' | 'custom'

const emptyGears: GearStrings = {
    firstGear: '',
    secondGear: '',
    thirdGear: '',
    fourthGear: '',
    rearEnd: '',
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

function toGearStrings(g: GearValues): GearStrings {
    return {
        firstGear: String(g.firstGear),
        secondGear: String(g.secondGear),
        thirdGear: String(g.thirdGear),
        fourthGear: String(g.fourthGear),
        rearEnd: String(g.rearEnd),
    }
}

function toGearValues(g: GearStrings): GearValues {
    return {
        firstGear: Number(g.firstGear),
        secondGear: Number(g.secondGear),
        thirdGear: Number(g.thirdGear),
        fourthGear: Number(g.fourthGear),
        rearEnd: Number(g.rearEnd),
    }
}

const fenderFlareOptions = buildOptions(limits.fenderFlare, formatFraction)
const swayBarOptions = buildOptions(limits.swayBar, formatFraction)
const presetOptions = gearPresets.map((p) => ({
    value: String(p.number),
    label: `Preset ${p.number}`,
}))

const gearFields: { key: keyof GearValues; label: string}[] = [
    { key: 'firstGear', label: '1st Gear' },
    { key: 'secondGear', label: '2nd Gear' },
    { key: 'thirdGear', label: '3rd Gear' },
    { key: 'fourthGear', label: '4th Gear' },
    { key: 'rearEnd', label: 'Rear End' },
]

export default function SetupForm({ initialValues, onSubmit, onCancel }: SetupFormProps) {
    const [name, setName] = useState(initialValues?.name ?? '')
    const [trackID, setTrackID] = useState(initialValues?.trackID ?? '')
    const [mode, setMode] = useState<SetupMode | ''>(initialValues?.mode ?? '')
    const [values, setValues] = useState<FieldValues>(
        initialValues ? toFieldValues(initialValues) : emptyValues,
    )

    const [gearType, setGearType] = useState<GearType | ''>(initialValues?.gearing.type ?? '')
    const [presetNumber, setPresetNumber] = useState(
        initialValues?.gearing.type === 'preset' ? String(initialValues.gearing.presetNumber) : '',
    )
    const [customGears, setCustomGears] = useState<GearStrings>(
        initialValues?.gearing.type === 'custom'
            ? toGearStrings(initialValues.gearing.values)
            : emptyGears,
    )

    function setField(key: keyof FieldValues, value: string) {
        setValues((prev) => ({ ...prev, [key]: value}))
    }

    function setGear(key: keyof GearValues, value: string) {
        setCustomGears((prev) => ({ ...prev, [key]: value }))
    }

    function chooseGearType(type: GearType) {
        setGearType(type)
        const customIsEmpty = Object.values(customGears).every((v) => v === '')
        if (type === 'custom' && presetNumber !== '' && customIsEmpty) {
            const preset = gearPresets.find((p) => p.number === Number(presetNumber))
            if (preset) setCustomGears(toGearStrings(preset.values))
        }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (mode === '' || gearType === '') return

        const gearing: Gearing =
            gearType === 'preset'
                ? { type: 'preset', presetNumber: Number(presetNumber) }
                : { type: 'custom', values: toGearValues(customGears) }

        onSubmit({
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
            },
            gearing,
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
            <fieldset className="flex flex-col gap-4">
                <legend className="mb-2 text-2xl font-bold">Gear Ratios</legend>
                <div className="flex gap-6 font-semibold">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="gearType"
                            checked={gearType === 'preset'}
                            onChange={() => chooseGearType('preset')}
                            required
                        />
                        Preset
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="gearType"
                            checked={gearType === 'custom'}
                            onChange={() => chooseGearType('custom')}
                            required
                        />
                        Custom
                    </label>
                </div>
                {gearType === 'preset' && (
                    <SelectField
                        label="Preset"
                        value={presetNumber}
                        onChange={setPresetNumber}
                        options={presetOptions}
                    />
                )}
                {gearType === 'custom' &&
                    gearFields.map((f) => (
                        <NumberField
                            key={f.key}
                            label={f.label}
                            value={customGears[f.key]}
                            onChange={(v) => setGear(f.key, v)}
                            {...limits.gears[f.key]}
                        />
                    ))
                }
            </fieldset>
            <div className="mt-4 flex flex-col items-center gap-2">
                <Button type="submit">Save Setup</Button>
                <Button type="button" onClick={onCancel}>Cancel</Button>
            </div>
        </form>
    )
}
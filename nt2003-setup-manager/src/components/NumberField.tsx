import { inputClass } from './fieldStyles'

type NumberFieldProps = {
    label: string
    value: string
    onChange: (value: string) => void
    min: number
    max: number
    step: number
}

export default function NumberField({ label, value, onChange, min, max, step }: NumberFieldProps) {
    return (
        <label className="flex flex-col gap-1 font-semibold">
            {label}
            <input
                type="number"
                className={inputClass}
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={(e) => onChange(e.target.value)}
                required
            />
        </label>
    )
}
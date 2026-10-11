import type { Option } from '../lib/options'
import { inputClass } from './fieldStyles'

type SelectFieldProps = {
    label: string
    value: string
    onChange: (value: string) => void
    options: Option[]
}

export default function SelectField({ label, value, onChange, options }: SelectFieldProps) {
    return (
        <label className="flex flex-col gap-1 font-semibold">
            {label}
            <select
                className={inputClass}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
            >
                <option value="">Select...</option>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </label>
    )
}
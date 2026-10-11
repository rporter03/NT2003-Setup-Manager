type Limit = { min: number; max: number; step: number }

export type Option = { value: string; label: string }

export function formatFraction(value: number): string {
    const whole = Math.trunc(value)
    const eighths = Math.round((value - whole) * 8)
    if (eighths === 0) 
        return String(whole)
    let a = eighths
    let b = 8
    while (b) [a, b] = [b, a % b]
    const fraction = `${eighths / a}/${8 / a}`
    return whole === 0 ? fraction : `${whole} ${fraction}`
}

export function buildOptions(limit: Limit, format: (n: number) => string): Option[] {
    const count = Math.round((limit.max - limit.min) / limit.step)
    return Array.from({ length: count + 1 }, (_, i) => {
        const n = Math.round((limit.min + i * limit.step) * 1000) / 1000
        return { value: String(n), label: format(n) }
    })
}
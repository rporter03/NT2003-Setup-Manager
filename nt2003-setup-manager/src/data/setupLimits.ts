import type { SetupMode } from '../types/setup'

export const modes: { value: SetupMode; label: string }[] = [
    { value: 'quick-race', label: 'Quick Race' },
    { value: 'season', label: 'Season'},
    { value: 'career', label: 'Career'},
]

export const limits = {
    tirePressure: { min: 15, max: 30, step: 1 },
    fenderFlare: { min: 73, max: 76, step: 0.5 },
    rearSpoiler: { min: 45, max: 75, step: 1 },
    springs: { min: 0, max: 100, step: 1 },
    swayBar: {min: 0.125, max: 1.25, step: 0.125 },
    wedge: { min: -4, max: 4, step: 0.5 },
    gears: {
        firstGear: { min: 1.3, max: 3.6, step: 0.05 },
        secondGear: { min: 1.1, max: 2.4, step: 0.05 },
        thirdGear: { min: 1.0, max: 2.0, step: 0.05 },
        fourthGear: { min: 0.8, max: 1.6, step: 0.01 },
        rearEnd: { min: 2.5, max: 6.5, step: 0.05 },
    },
} as const
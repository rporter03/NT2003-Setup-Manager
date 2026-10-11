import type { GearValues } from '../types/setup'

export type GearPreset = {
    number: number
    values: GearValues
}

export const gearPresets: GearPreset[] = [
    { number: 1,  values: { firstGear: 3.6, secondGear: 2.4, thirdGear: 1.9,  fourthGear: 1.6,  rearEnd: 3.5 } },
    { number: 2,  values: { firstGear: 3.6, secondGear: 2.4, thirdGear: 1.9,  fourthGear: 1.5,  rearEnd: 3.5 } },
    { number: 3,  values: { firstGear: 3.6, secondGear: 2.3, thirdGear: 1.8,  fourthGear: 1.4,  rearEnd: 3.5 } },
    { number: 4,  values: { firstGear: 3.6, secondGear: 2.3, thirdGear: 1.7,  fourthGear: 1.2,  rearEnd: 3.5 } },
    { number: 5,  values: { firstGear: 3.6, secondGear: 2.1, thirdGear: 1.55, fourthGear: 1.1,  rearEnd: 3.5 } },
    { number: 6,  values: { firstGear: 3.6, secondGear: 2.1, thirdGear: 1.45, fourthGear: 1.04, rearEnd: 3.5 } },
    { number: 7,  values: { firstGear: 3.6, secondGear: 1.9, thirdGear: 1.35, fourthGear: 0.98, rearEnd: 3.5 } },
    { number: 8,  values: { firstGear: 3.6, secondGear: 1.9, thirdGear: 1.3,  fourthGear: 0.94, rearEnd: 3.5 } },
    { number: 9,  values: { firstGear: 3.6, secondGear: 1.8, thirdGear: 1.25, fourthGear: 0.9,  rearEnd: 3.5 } },
    { number: 10, values: { firstGear: 3.6, secondGear: 1.8, thirdGear: 1.15, fourthGear: 0.8,  rearEnd: 3.5 } },
]
import type { Gearing, GearValues } from '../types/setup'
import { gearPresets } from '../data/gearPresets'

export function getGearValues(gearing: Gearing): GearValues | undefined {
    if (gearing.type === 'custom') return gearing.values
    return gearPresets.find((p) => p.number === gearing.presetNumber)?.values
}


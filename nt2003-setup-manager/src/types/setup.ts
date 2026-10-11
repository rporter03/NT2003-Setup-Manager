export type SetupMode = 'quick-race' | 'season' | 'career'

export type Downforce = {
    fenderFlare: number
    rearSpoiler: number
}

export type Suspension = {
    frontSprings: number
    rearSprings: number
    swayBar: number
    wedge: number
}

export type GearValues = {
    firstGear: number
    secondGear: number
    thirdGear: number
    fourthGear: number
    rearEnd: number
}

export type Gearing =
    | { type: 'preset'; presetNumber: number }
    | { type: 'custom'; values: GearValues }

export type Setup = {
    id: string
    name: string
    trackID: string
    mode: SetupMode
    tirePressure: number
    downforce: Downforce
    suspension: Suspension
    gearing: Gearing
    notes?: string
    createdAt: string
    updatedAt: string
}

export type Track = {
    id: string
    name: string
}

export type NewSetup = Omit<Setup, 'id' | 'createdAt' | 'updatedAt'>
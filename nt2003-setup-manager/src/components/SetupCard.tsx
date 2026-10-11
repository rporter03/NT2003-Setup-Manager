import type { Setup } from '../types/setup'
import { modes } from '../data/setupLimits'
import { formatFraction } from '../lib/options'
import { getTrackName } from '../lib/tracks'
import Button from './Button'

type SetupCardProps = {
    setup: Setup
    onEdit: () => void
    onDelete: () => void
}

export default function SetupCard({ setup, onEdit, onDelete }: SetupCardProps) {
    const modeLabel = modes.find((m) => m.value === setup.mode)?.label ?? setup.mode
    const { downforce, suspension, gearing } = setup
    return (
        <article className="setup-card w-full border-2 border-t-bevel-light border-l-bevel-light border-b-bevel-dark border-r-bevel-dark bg-button p-4">
            <h2 className="text-2xl font-bold">{setup.name}</h2>
            <p className="font-semibold">
                {getTrackName(setup.trackID)} - {modeLabel}
            </p>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <section>
                    <h3 className="font-bold">Tires</h3>
                    <p>Pressure: {setup.tirePressure} psi</p>
                </section>
                <section>
                    <h3 className="font-bold">Downforce</h3>
                    <p>Fender Flare: {formatFraction(downforce.fenderFlare)}"</p>
                    <p>Rear Spoiler: {downforce.rearSpoiler}°</p>
                </section>
                <section>
                    <h3 className="font-bold">Suspension</h3>
                    <p>Front Springs: {suspension.frontSprings}%</p>
                    <p>Rear Springs: {suspension.rearSprings}%</p>
                    <p>Sway Bar: {formatFraction(suspension.swayBar)}"</p>
                    <p>Wedge: {suspension.wedge} turns</p>
                </section>
                <section>
                    <h3 className="font-bold">Gear Ratios</h3>
                    {gearing.type === 'preset' ? (
                        <p>Preset {gearing.presetNumber}</p>
                    ) : (
                        <>
                            <p>1st: {gearing.values.firstGear.toFixed(2)}</p>
                            <p>2nd: {gearing.values.secondGear.toFixed(2)}</p>
                            <p>3rd: {gearing.values.thirdGear.toFixed(2)}</p>
                            <p>4th: {gearing.values.fourthGear.toFixed(2)}</p>
                            <p>Rear End: {gearing.values.rearEnd.toFixed(2)}</p>
                        </>
                    )}
                </section>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Button onClick={onEdit}>Edit</Button>
                <Button onClick={onDelete}>Delete</Button>
            </div>
        </article>
    )
}
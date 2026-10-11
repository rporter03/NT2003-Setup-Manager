import Button from './Button'
import { useRef, useLayoutEffect } from 'react'
import { animate, createScope } from 'animejs'

type ConfirmDialogProps = {
    message: string
    confirmLabel: string
    onConfirm: () => void
    onCancel: () => void
}

export default function ConfirmDialog({ message, confirmLabel, onConfirm, onCancel }: ConfirmDialogProps) {
    const root = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
        const scope = createScope({ root }).add(() => {
            animate(root.current!, {
                opacity: [0, 1],
                duration: 200,
                ease: 'outQuad',
            })
            animate('.dialog-box', {
                opacity: [0, 1],
                translateY: [24, 0],
                duration: 450,
                ease: 'outQuad',
            })
        })
        return () => scope.revert()
    }, [])

    return (
        <div ref={root} className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 p-4">
            <div
                role="dialog"
                aria-modal="true"
                className="dialog-box flex w-full max-w-md flex-col items-center gap-4 border-2 border-t-bevel-light border-l-bevel-light border-b-bevel-dark border-r-bevel-dark bg-page p-6 text-center"
            >
                <p className="text-xl font-semibold">{message}</p>
                <div className="flex flex-wrap justify-center gap-2">
                    <Button onClick={onConfirm}>{confirmLabel}</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}
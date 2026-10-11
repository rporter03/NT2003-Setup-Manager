import { useNavigate } from 'react-router'
import Button from '../components/Button'
import { useRef, useLayoutEffect } from 'react'
import { animate, createScope, stagger } from 'animejs'

export default function Home() {
    const navigate = useNavigate()
    const root = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
        const scope = createScope({ root }).add(() => {
            animate('.home-item', {
                opacity: [0, 1],
                translateY: [24, 0],
                duration: 450,
                delay: stagger(80),
                ease: 'outQuad',
            })
        })
        return () => scope.revert()
    }, [])

    return (
        <div ref={root} className="min-h-screen">
            <header className="pt-12 text-center">
                <h1 className="text-4xl font-bold">
                    NASCAR Thunder 2003 Setup Manager
                </h1>
            </header>
            <main className="mt-12 flex flex-col items-center gap-2">
                <Button className="home-item" onClick={() => navigate('/create')}>Create Setup</Button>
                <Button className="home-item" onClick={() => navigate('/setups')}>View Setups</Button>
            </main>
        </div>
    )
}
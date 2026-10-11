import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      className={`w-72 border-2 border-t-bevel-light border-l-bevel-light border-b-bevel-dark border-r-bevel-dark bg-linear-to-r from-button-edge via-button to-button-edge px-6 py-2 text-2xl font-semibold hover:bg-none hover:bg-button-hover hover:text-text-hover active:border-t-bevel-dark active:border-l-bevel-dark active:border-b-bevel-light active:border-r-bevel-light ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
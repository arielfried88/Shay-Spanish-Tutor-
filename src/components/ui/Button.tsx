'use client'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variants = {
  primary: 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-md hover:shadow-lg',
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200',
  success: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md',
  danger: 'bg-rose-500 hover:bg-rose-600 text-white shadow-md',
  ghost: 'bg-transparent hover:bg-white/20 text-white',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-xl',
  md: 'px-5 py-2.5 text-base rounded-2xl',
  lg: 'px-8 py-4 text-xl rounded-2xl',
}

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: Props) {
  return (
    <button
      className={`font-bold transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

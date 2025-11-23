import type { ButtonHTMLAttributes, ReactNode, InputHTMLAttributes } from 'react'

export interface AlertMessageProps {
   type: 'error' | 'success'
   message: string
}

export interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   loading?: boolean
   loadingText?: string
   children: string
}

export interface AuthFormContainerProps {
   title: string
   subtitle: string
   children: ReactNode
}

export interface AuthLayoutProps {
   children: ReactNode
   imageUrl: string
   imagePosition?: 'left' | 'right'
   title: string
   subtitle: string
}

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
   label: string
   id: string
   helperText?: string
}
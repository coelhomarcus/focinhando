import type { ReactNode } from 'react'

export interface HeroSectionProps {
   icon: ReactNode
   title: string
   description: string
}

export interface IncompleteProfileWarningProps {
   onNavigateHome: () => void
   onNavigateProfile: () => void
}

export interface PetFormFieldsProps {
   petForm: PetForm
   setPetForm: (form: PetForm) => void
   onFileSelect?: (file: File) => void
   uploading?: boolean
   selectedFileObj?: File | null
}

export interface StatusMessagesProps {
   submitStatus: SubmitStatus
   errorMessage: string
}

export interface PetForm {
   name: string
   img: string
   age: string
   city: string
   state: string
   sex: string
   vaccinated: boolean
   about: string
   specie: string
   race: string
   weight: number
}

export type SubmitStatus = 'idle' | 'success' | 'error'



export interface Contact {
   id: string
   fullName: string
   email: string
   phoneNumber: string
   subject: string
   message: string
   createdAt: string
}

export interface ContactsTabProps {
   contacts: Contact[]
   loading: boolean
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
   userComplementId: string
}

export interface PetFormProps {
   apiBaseUrl: string
}

export interface PublicationForm {
   title: string
   topic: string
   img: string
   text: string
}

export type TabType = 'contacts' | 'pets' | 'publications' | 'manage-pets' | 'manage-publications'

export interface AdminTabsProps {
   activeTab: TabType
   setActiveTab: (tab: TabType) => void
   contactsCount: number
}

export interface Pet {
   id: string
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
   userComplementId?: string
}

export interface PetsManagementProps {
   apiBaseUrl: string
}

export interface PublicationFormProps {
   apiBaseUrl: string
}

export interface Publication {
   id: string
   title: string
   topic: string
   img: string
   text: string
   createdAt: string
}

export interface PublicationsManagementProps {
   apiBaseUrl: string
}

export interface LoadingSpinnerProps {
   message?: string
}

export interface EmptyStateProps {
   icon: string
   title: string
   description: string
}

export interface StatusMessageProps {
   type: 'success' | 'error'
   message: string
}
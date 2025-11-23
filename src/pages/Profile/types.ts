export interface User {
   id: string
   name: string
   email: string
   role: string
   createdAt: Date
   updatedAt: Date
}

export interface UserComplement {
   id: string
   user: {
      name: string
   }
   img: string | null
   phoneNumber: string
   city: string
   state: string
   dateOfBirth: Date | null
   adoptedPet: number
   availablePet: number
   createdAt: Date
}

export interface EditData {
   img: string
   phoneNumber: string
   city: string
   state: string
   dateOfBirth: string
}

export interface EditFormProps {
   editData: EditData
   setEditData: (data: EditData) => void
   error: string
   saveSuccess: boolean
   user: User | null
   onSave: () => void
   onFileSelect?: (file: File) => void
   uploading?: boolean
}

export interface InfoDisplayProps {
   user: User | null
   complement: UserComplement | null
}

export interface PersonalInfoCardProps {
   user: User | null
   complement: UserComplement | null
   editing: boolean
   setEditing: (editing: boolean) => void
   editData: EditData
   setEditData: (data: EditData) => void
   error: string
   saveSuccess: boolean
   onSave: () => void
   onFileSelect?: (file: File) => void
   uploading?: boolean
}

export interface ProfileHeaderProps {
   user: User | null
   complement: UserComplement | null
}

export interface QuickActionsProps {
   onNavigate: (path: string) => void
   onLogout: () => void
}
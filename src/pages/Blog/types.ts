export interface Publication {
   id: string
   title: string
   text: string
   img: string
   topic: string
   createdAt: string
}

export interface BlogCardProps {
   publication: Publication
   onClick: (publication: Publication) => void
   formatDate: (dateString: string) => string
   getExcerpt: (text: string) => string
}

export interface BlogGridProps {
   publications: Publication[]
   onSelectPublication: (publication: Publication) => void
   formatDate: (dateString: string) => string
   getExcerpt: (text: string) => string
}

export interface BlogModalProps {
   publication: Publication | null
   onClose: () => void
   formatDate: (dateString: string) => string
}
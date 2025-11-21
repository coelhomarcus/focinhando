export const formatDate = (date: Date | null): string => {
   if (!date) return 'Não informado'
   
   const dateObj = new Date(date)
   const day = dateObj.getUTCDate().toString().padStart(2, '0')
   const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0')
   const year = dateObj.getUTCFullYear()
   
   return `${day}/${month}/${year}`
}

export const getMemberSince = (date: Date): string => {
   const created = new Date(date)
   const now = new Date()
   const months = (now.getFullYear() - created.getFullYear()) * 12 + now.getMonth() - created.getMonth()

   if (months < 1) return 'Menos de 1 mês'
   if (months === 1) return '1 mês no site'
   return `${months} meses no site`
}

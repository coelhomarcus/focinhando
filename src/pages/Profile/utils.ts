export const formatDate = (date: Date | null): string => {
   if (!date) return 'Não informado'
   return new Date(date).toLocaleDateString('pt-BR')
}

export const getMemberSince = (date: Date): string => {
   const created = new Date(date)
   const now = new Date()
   const months = (now.getFullYear() - created.getFullYear()) * 12 + now.getMonth() - created.getMonth()

   if (months < 1) return 'Menos de 1 mês'
   if (months === 1) return '1 mês no site'
   return `${months} meses no site`
}

export const calculateAge = (birthDate: Date): string => {
   const birth = new Date(birthDate)
   const now = new Date()
   const diffMonths = (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth()

   if (diffMonths < 12) {
      return `${diffMonths} ${diffMonths === 1 ? 'mês' : 'meses'}`
   }
   const years = Math.floor(diffMonths / 12)
   return `${years} ${years === 1 ? 'ano' : 'anos'}`
}

import type { FormInputProps } from "../types"

const FormInput = ({ label, id, helperText, ...props }: FormInputProps) => {
   return (
      <div>
         <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-2'>
            {label}
         </label>
         <input
            id={id}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-focinhando-accent focus:border-transparent transition duration-200 disabled:opacity-50 disabled:bg-gray-50'
            {...props}
         />
         {helperText && (
            <p className='mt-2 text-xs text-gray-500'>{helperText}</p>
         )}
      </div>
   )
}

export default FormInput

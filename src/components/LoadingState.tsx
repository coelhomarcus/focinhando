import { FaSpinner } from "react-icons/fa";

const LoadingState = ({text}: {text:string}) => {
   return (
      <div className='flex justify-center min-h-screen'>
         <div className='flex flex-col justify-center items-center gap-4'>
            <FaSpinner className='animate-spin h-16 w-16 text-focinhando-accent' />
            <p className='text-lg text-gray-600 font-medium'>{text}...</p>
         </div>
      </div>
   )
}

export default LoadingState

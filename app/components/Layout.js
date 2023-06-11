import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import '../globals.css'

export default function Layout({children}) {
  return (
    // <div className='bg-red-300 sm:flex sm:p-10 p-5 w-full sm:h-screen h-[100%]'>
    //   <div className='bg-black rounded-[30px] 2xl:w-1/6 lg:w-2/6 sm:w-1/4 sm:h-full h-10 '>

    //   </div>
    //   <div className='bg-blue-200 2xl:w-5/6 lg:w-4/6 sm:w-3/4 w-full h-full '>

    //   </div>
    // </div>

        <div className='flex\  sm:flex sm:p-10  p-0 w-full sm:h-screen h-[100%]'>

            <Sidebar/>

            <Header/>
         <main>{children}</main>
     </div>
  )
}

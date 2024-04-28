import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { NavLink } from 'react-router-dom'

const Finance = () => {

  return (



<>


        <iframe
                title="Vanilla HTML Page"
                src={`https://financial-game.vercel.app`}
                style={{ width: '100vw', height: '100vh', border: 'none' }}
                className='relative'
        />

        <NavLink
          className='absolute top-[5%] left-[5%] border border-red-100 px-[2%] py-[1%] bg-[#EB6681] font-semibold text-white rounded-[20px]'
          to='/stud-dash'
        >BACK</NavLink>


</>
  )
}

export default Finance
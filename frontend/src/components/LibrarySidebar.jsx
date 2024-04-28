import React from 'react'
import {NavLink} from 'react-router-dom'
const LibrarySidebar = () => {
  

  const navLinkStyles = ({isActive}) => {
    return{
      transition: "background-color 0.3s",
      backgroundColor: isActive ? '#f2f4f3' : 'white' ,
      width: '100%',
      height: "14%",
      fontSize: "15px",
      display: "flex",
      justifyContent: 'center',
      alignItems: "center",

    }
  }

  return (
    <>
        <div className=' flex flex-col justify-center items-center h-full border-r-[3px] border-[#f2f4f3] '>
            <div className='flex flex-col h-[78%] w-[100%] items-center '>
              
                <NavLink style={navLinkStyles}  to='/'>
                  <div className='mb-[1rem] mt-[1rem] ml-[0.5rem] flex items-center justify-between'>
                    <i class="ri-macbook-line text-[27px] text-[#4FD9C5] mx-[10%]"></i>
                    <div>Surviellence</div>
                  </div>
                </NavLink>

                
                <NavLink style={navLinkStyles} to='/library-card'>
                  <div className='my-[1rem] ml-[0.5rem]'>
                    <div className='mb-[1rem] mt-[1rem] ml-[0.5rem] flex items-center justify-between'>
                      <i class="ri-bar-chart-2-fill text-[27px] text-[#4FD9C5] mx-[10%]"></i>
                      <div>IssueCard</div>
                    </div>
                  </div>
                </NavLink>

                


            </div>
            <div className=' border-t-[3px] h-[22%]'>
                Profile
            </div>
        </div>
    </>

  )
}


export default LibrarySidebar;
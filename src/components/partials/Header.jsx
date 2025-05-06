import React from 'react'
import FtcLogoHeader from '../../assets/svg/FtcLogoHeader'

const Header = () => {
  return (
    <>
      <div className='flex items-center justify-between h-16 border-solid border-b-2 border-black px-2'>

        <div className="">
            <FtcLogoHeader/>
        </div>
 
        <div>
            <div className="rounded-full bg-[#3E9BD0]  flex items-center justify-center min-h-[2rem] h-[2rem] max-w-[2rem] w-[2rem] pt-px text-white">
                <span className='block'>R</span>
                <span className='block'>V</span>
            </div>
        </div>

      </div>
    </>
  )
}

export default Header

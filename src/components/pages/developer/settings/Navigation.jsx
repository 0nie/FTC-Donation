import React from 'react'
import { FaHandHoldingHeart } from 'react-icons/fa'
import { Link } from 'react-router'
import { developerNavigation } from '../../../helper/developer-navigation'
import { PiCaretDown } from 'react-icons/pi'

const Navigation = ({menu = '', subMenu = ''}) => {

   const [isReports, setIsReports] = React.useState(false);
   const [isSettings, setIsSettings] = React.useState(false);
    

    
  return (
    <>
      <nav className='fixed overflow-y-auto w-[12rem] uppercase pt-3 bg-primary h-dvh'>
        <div className='text-sm text-white flex flex-col justify-between h-full'>
            <ul className='text-xs'>
                {developerNavigation.map((item, index) => {
                   return(

                    <li className={`${item.code === menu? "bg-white/10" : "hover:bg-white/10"}`} key={index}
                    onClick={() => {
                        if (item.code === "reports") setIsReports(!isReports);
                        if (item.code === "settings") setIsSettings(!isSettings);
                    }}>

                         <Link
                    to={item.isDropdown ? "" : item.link}
                    className={`w-full flex items-center px-2 py-1 justify-between gap-x-5 ${
                    item.code === menu ? "bg-white/10" : "hover:bg-white/10"
                  }`}
                  >

                            <span className='flex items-center gap-x-5'>
                                {item.icon}{item.name}
                            </span>
                            {item.isDropdown &&(
                                <span>
                                    <PiCaretDown 
                                    className={` transition-all ease-linear duration-300 ${item.code === "reports" && isReports && "rotate-180"} ${item.code === "settings" 
                                        && isSettings && "rotate-180"
                                    }`}/>
                                </span>
                            )}

                        </Link>

                       {item.isDropdown && (
                        <ul className='bg-primary text-[10px]'>
                            {((item.code === "reports" && isReports) ||
                                (item.code === "settings" && isSettings)) && (
                                <>
                                    {item.subMenu.map((subItem) => {
                                        return(
                                            <li className='cursor-pointer pl-10 my-0.5'>
                                                <Link to={subItem.link} className={` border-l-2 pl-3 border-transparent hover:border-accent ${subMenu === subItem.code ? "" : " "}`}>
                                                {subItem.name}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </>
                            )}
                        </ul>
                       )}
                       
                    </li>
                   
                   )
                })}
            </ul>
        </div>
      </nav>
    </>
  )
}

export default Navigation

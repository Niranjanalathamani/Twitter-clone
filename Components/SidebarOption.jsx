import React from 'react'
import './SidebarOption.css'
function SidebarOption({text,icon,active,onClick}) {
  return (
    <div className= {`sidebarOption ${active ?"active":""}`}
       onClick={onClick}>{icon}<p>{text}</p>
       </div>
         
        

      
    
  )
}

export default SidebarOption

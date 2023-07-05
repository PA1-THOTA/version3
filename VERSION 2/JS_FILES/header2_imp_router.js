import React from 'react'
import threelinesicon from "../IMAGE_FILES/threelinesicon.png"
import user from "../IMAGE_FILES/user.png"
const header2_imp = () => {
  return (
    <div className="header2">
    <div className="header2element header2element1"><img src={threelinesicon} alt="" /></div>
    <div className="header2element header2element2">
    ALL YOU WANT IS HERE
    </div>
    <div className="header2element header2element3"><img src={user} alt="" /><p>Welcome USER</p> </div>
    
  </div>
  )
}

export default header2_imp
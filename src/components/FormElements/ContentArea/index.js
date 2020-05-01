import React from 'react'

const ContentArea = ({placeholder, value, onChange, className}) => {
    return(
   
          <textarea className={className} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}/>
     
    )
  }

export default ContentArea
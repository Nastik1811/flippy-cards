import React from 'react'

const ContentArea = ({label, value, onChange, className}) => {
    return(
      <div className={className}> 
        <label>{label}
          <textarea placeholder={label} value={value} onChange={(e) => onChange(e.target.value)}/>
        </label>
      </div>
    )
  }

export default ContentArea
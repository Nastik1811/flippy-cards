import React from 'react'

const InputField = ({type, value, placeholder, onChange}) => {
    return(
      <input 
       type={type} 
       value={value} 
       placeholder={placeholder} 
       onChange={(e) => onChange(e.target.value)}
       />
    )

}

export default InputField
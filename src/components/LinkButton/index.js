import React from 'react'
import { Link } from 'react-router-dom'

const LinkButton = ({url, label, className}) => {
    return(
        <Link to={url}  className={className}>{label}</Link>
    )
} 

export default LinkButton
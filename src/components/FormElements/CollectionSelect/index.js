import React from 'react'

const CollectionSelect = ({collections, value, onChange, className}) => {

    const handleChange = (e) => {
      const id = e.target.value;
      !id ? onChange({
        id: null, 
        name: ""
      }) : 
      onChange({
        id, 
        name: collections.find(collection => collection.id === id).name
      })
      
    }
  
    return(
          <select value={value.id ? value.id : ""} onChange={handleChange} className={className}>
            <option value="">None</option>
            {collections.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
          </select>
    )
  }

export default CollectionSelect
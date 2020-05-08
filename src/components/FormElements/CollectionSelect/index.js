import React from 'react'

const CollectionSelect = ({collections, value, onChange, className}) => {

  const getName = id => {
    return collections.find(collection => collection.id === id).name
  }
  
  const handleChange = (e) => {
    const id = e.target.value ?? null;
    const name = id ? getName(id) : "";
    onChange({id, name})     
  }

    return(
          <select value={value.id ? value.id : ""} onChange={handleChange} className={className}>
            <option value="">None</option>
            {collections.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
          </select>
    )
  }

export default CollectionSelect
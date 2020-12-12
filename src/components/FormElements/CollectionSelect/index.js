import React from 'react'

const CollectionSelect = ({collections, value, onChange, className}) => {

  const getName = id => {
    return collections.find(collection => collection.id === id).name
  }
  
  const handleChange = (e) => {
    const id = e.target.value ?? null;
    onChange(id)     
  }

    return(
          <select value={value ? value : ""} onChange={handleChange} className={className}>
            <option value="">None</option>
            {collections.length && collections.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
          </select>
    )
  }

export default CollectionSelect
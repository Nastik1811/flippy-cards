import React from 'react'

const CollectionSelect = ({collections, value, onChange}) => {

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
      <label>
          Set a collection: 
          <select value={value.id ? value.id : ""} onChange={handleChange}>
            <option value="">None</option>
            {collections.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
          </select>
      </label>
    )
  }

export default CollectionSelect
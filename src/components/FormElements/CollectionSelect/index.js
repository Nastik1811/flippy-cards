import React from 'react'

const CollectionSelect = ({collections, value, onChange}) => {

    const handleChange = (e) => {
      const id = e.target.value;
      const name = collections.find(collection => collection.id === id).name;
      onChange({id, name}) 
    }
  
    return(
      <label>
          Choose a collection: 
          <select value={value.id} onChange={handleChange}>
            {collections.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
          </select>
      </label>
    )
  }

export default CollectionSelect
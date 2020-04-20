import React, {useContext } from 'react'
import { DataContext } from '../../DataManger'
import { withRouter } from 'react-router-dom';

const NewCollectionForm = ({history})  =>{
    const {manager} = useContext(DataContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {name} = event.target.elements;
        await manager.addCollection(name.value);
        history.push("/manage");
    }
    
    return(
        <div>
             <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Collection name" name="name"/>
                <button type="submit">Add</button>
            </form>
        </div>
        
    )
}
export default withRouter(NewCollectionForm)
import React, {useContext, useState } from 'react'
import { DataContext } from '../../DataManger'
import { withRouter } from 'react-router-dom';
import { SubmitButton, InputField } from '../../components/FormElements';
import Popup from '../../components/Popup';

const CollectionCreate = ({history})  =>{
    const {manager} = useContext(DataContext);
    const [name, setName] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await manager.addCollection(name);
        }
        catch(e){
            alert(e)
        }
        goBack();
    }

    const goBack = () => history.goBack();
    
    return(
        <Popup onDismiss={goBack}>
             <form onSubmit={handleSubmit}>
                <InputField
                    type="text" 
                    placeholder="Collection name" 
                    value={name}
                    onChange={name => (setName(name))}
                />
                <SubmitButton label="Add"/>
            </form>
        </Popup>        
    )
}
export default withRouter(CollectionCreate)
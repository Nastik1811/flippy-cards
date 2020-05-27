import React, {useContext, useState } from 'react'
import { DataContext } from '../../DataManger'
import { withRouter } from 'react-router-dom';
import Modal, { ModalHeader, ModalContent, ModalMessage, ModalActions, ModalInput } from '../../components/Modal';

const CollectionCreate = ({history})  =>{
    const {manager} = useContext(DataContext);
    const [name, setName] = useState("");

    const handleSubmit = async (event) => {
        try{
            await manager.addCollection(name);
        }
        catch(e){
            alert(e)
        }
        finally{
            setName("")
            goBack();
        }
    }

    const goBack = () => history.push("/manage/collections");
    
    return(
        <Modal onDismiss={goBack}>
            <ModalHeader title="Create collection"/>
            <ModalContent>
                <ModalMessage>Please, give a name for a new collection.</ModalMessage>
                <ModalInput
                        type="text" 
                        placeholder="Collection name" 
                        value={name}
                        onChange={setName}/>
            </ModalContent>
            <ModalActions>
                    <button onClick={handleSubmit}>Create</button>
                    <button onClick={goBack}>Back</button>
                </ModalActions>
        </Modal>        
    )
}
export default withRouter(CollectionCreate)
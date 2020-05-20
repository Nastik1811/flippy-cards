import React, {useContext, useState } from 'react'
import { DataContext } from '../../DataManger'
import { withRouter } from 'react-router-dom';
import { InputField } from '../../components/FormElements';
import styles from './CollectionCreate.module.scss'
import Modal, { ModalHeader, ModalContent, ModalMessage, ModalActions } from '../../components/Modal';

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
                <form className={styles["form"]} onSubmit={handleSubmit} id="collection_form">
                    <InputField
                        type="text" 
                        placeholder="Collection name" 
                        value={name}
                        onChange={setName}
                    />
                </form>
            </ModalContent>
            <ModalActions>
                    <button type="submit" form="collection_form">Create</button>
                    <button onClick={goBack}>Back</button>
                </ModalActions>
        </Modal>        
    )
}
export default withRouter(CollectionCreate)
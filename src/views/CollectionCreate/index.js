import React, {useContext, useState } from 'react'
import { DataContext } from '../../DataManger'
import { withRouter } from 'react-router-dom';
import { SubmitButton, InputField } from '../../components/FormElements';
import Popup from '../../components/Popup';
import styles from './CollectionCreate.module.scss'

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
        <Popup onDismiss={goBack} className={styles["popup"]}>
             <form className={styles["form"]} onSubmit={handleSubmit}>
                <span className={styles["header"]}>Give a name for a collection!</span>
                <InputField
                    type="text" 
                    placeholder="type here" 
                    value={name}
                    onChange={setName(name)}
                />
                <SubmitButton className={styles["save-btn"]}/>
            </form>
        </Popup>        
    )
}
export default withRouter(CollectionCreate)
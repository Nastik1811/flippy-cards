import React, {useContext } from 'react'
import { DataContext } from '../../../DataManger'
import { withRouter } from 'react-router-dom';
import Popup from '../../../components/Popup';
import styles from './ConfirmDelete.module.scss'

const ConfirmDelete = ({history})  =>{
    const {manager} = useContext(DataContext);

    const handleSubmit = async (event) => {
        goBack();
    }

    const goBack = () => history.goBack();
    
    return(
        <Popup onDismiss={goBack} className={styles["popup"]}>
        </Popup>        
    )
}
export default withRouter(ConfirmDelete)
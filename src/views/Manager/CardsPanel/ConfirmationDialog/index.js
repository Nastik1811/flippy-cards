import React from 'react'

import Modal, { ModalHeader, ModalContent, ModalActions, ModalMessage } from '../../../../components/Modal'

const ConfirmationDialog = ({isOpen, onConfirm, onDismiss}) => {

    return(
        isOpen ?
        <Modal onDismiss={onDismiss}>
                <ModalHeader title="Confirm deletion" onDismiss={onDismiss}/>
                <ModalContent>
                    <ModalMessage> You're gonna delete the card. Are you sure?</ModalMessage>
                </ModalContent>
                <ModalActions>
                    <button onClick={onConfirm}>Yep</button>
                    <button onClick={onDismiss}>Nope</button>
                </ModalActions>
        </Modal>
        :
        null
    )
}

export default ConfirmationDialog
import React, { useState } from 'react'
import Modal, { ModalHeader, ModalContent, ModalActions,ModalMessage, ModalCheckbox  } from '../../../../components/Modal'

const ConfirmationDialog = ({isOpen, onConfirm, onDismiss, collection}) => {
    const [withCards, setWithCards] = useState(false)

    return(
        isOpen ?
        <Modal onDismiss={onDismiss}>
                <ModalHeader title="Confirm deletion" onDismiss={onDismiss}/>
                <ModalContent>
                    <ModalMessage> You're gonna delete the <span>{collection.name}</span> collection. Is that all right?</ModalMessage>
                    <ModalCheckbox 
                        checked={withCards} 
                        onChange={() => setWithCards(!withCards)}
                        label="Include cards"
                        />
                </ModalContent>
                <ModalActions>
                    <button onClick={() => onConfirm(collection.id, withCards)}>Yep</button>
                    <button onClick={onDismiss}>Nope</button>
                </ModalActions>
        </Modal>
        :
        null
    )
}

export default ConfirmationDialog
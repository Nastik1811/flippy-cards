import React, {useCallback, useContext} from 'react'
import app from '../firebase';
import {withRouter, Redirect} from 'react-router-dom'

const EditorWindow = props => {
    return (
        <div className="editor">
            {props.children}
        </div>
    )
}

const CardEditor = ({history}) => {
    const handleSubmit = useCallback(
        async event => {
          event.preventDefault();
          console.log(event.target.elements);
          const { front, back, collection } = event.target.elements;
          try {
            await app.firestore().collection('cards').add({
                front: front.value,
                back: back.value,
                collection: collection.value,
                created: new Date(),
                nextRecall: new Date(),
                learningStage: 0,
              }).catch(function(error) {
                console.error('Error writing new message to Firebase Database', error);
              });
            history.push("/home");
          } catch (error) {
            alert(error);
          }
        },
        [history]
      );

    return (
            <div className="editor">
                <form onSubmit={handleSubmit} className="card-editor-form">
                    <div className="row-flex-container">
                        <div className="edit-container">
                             <label>FRONT SIDE</label>
                            <textarea placeholder="front side" name="front" />
                        </div>
                        <div className="edit-container"> 
                            <label>BACK SIDE</label>
                            <textarea placeholder="back side" name="back" />
                        </div>
                    </div>

                    <label>
                        Choose a collection: 
                        <select name="collection" >
                            <option>Js</option>
                            <option>English words</option>
                            <option>React</option>
                        </select>
                    </label>
                    <input type="submit" className="submit-btn" value="Save" />
                </form>
                
            </div>
    )
}

export default withRouter(CardEditor);
import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import app from '../firebase';
import { Redirect } from 'react-router-dom';

const EditorWindow = props => {
    return (
        <div className="editor">
            {props.children}
        </div>
    )
}

const CardEditor = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        // ????? app.auth().currentUser.uid || currentUser.uid from AuthContext || како
        
        app.firestore().collection('users').doc(app.auth().currentUser.uid).collection('cards').add({
            front: data.front,
            back: data.back,
            collection: data.collection,
            created: new Date(),
            nextRecall: new Date(),
            learningStage: 0,
          }).catch(function(error) {
            console.error('Error writing new message to Firebase Database', error);
          });
    }
    
    console.log(errors);

    return (
            <div className="editor">
                Edit card here
                <form onSubmit={handleSubmit(onSubmit)} className="card-editor-form">
                    <textarea placeholder="front side" name="front" ref={register({required: true, maxLength: 255})} />
                    <textarea placeholder="back side" name="back" ref={register({required: true, maxLength: 255})} />
                    <label>
                        Choose a collection: 
                        <select name="collection" ref={register}>
                            <option>Js</option>
                            <option>English words</option>
                            <option>React</option>
                        </select>
                    </label>
                    <input type="submit" />
                </form>
                
            </div>
    )
}

export default CardEditor;
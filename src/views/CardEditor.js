import React, { Component } from 'react'


const EditorWindow = props => {
    return (
        <div className="editor">
            {props.children}
        </div>
    )
}



export default class CardEditor extends Component {
    render() {
        return (
            <EditorWindow>
                <div className="edit-card-content">Edit card here</div>
            </EditorWindow>
        )
    }
}

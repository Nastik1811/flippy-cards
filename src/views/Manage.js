import ReactDOM from 'react-dom'
import React from 'react'
import CardPreview from '../Components/CardPreview'
import CollectionPreview from '../Components/CollectionPreview'

export const Tabbar = () => {
    return (
        <nav className="tabbar">
            <ul className="tab-links">
                <li className="tab active" id="collectionsTab" >Collections</li>
                <li className="tab" id="cardsTab" >Cards</li>
            </ul>
            <hr/>
        </nav>
    )
}

export const Tab = props => {
    return (
    <li><button onClick={props.onClick}>{props.name}</button> </li>
    )
}

export const Board = props => {

    return (
        <>
            <div className="flex-container previews-container active" id="collections">
                        {props.collections}
            </div>
            <div className="flex-container previews-container " id="cards">
                        {props.cards}
            </div>
        </>
    )
}



// should use keys here in order to update only particular items
// 
class Manage extends React.Component {
    constructor(props){
        super(props);
        this.collections = [<CollectionPreview/>, <CollectionPreview/>, <CollectionPreview/>, <CollectionPreview/>];
        this.cards = [];

        this.state = {
            onCollections: true,
            collections: this.collections,
            cards: this.cards
        }
    }

    render(){
        return (
            <>
                <nav className="tabbar">
                    <ul className="tab-links">
                        <li className="tab active" id="collectionsTab">Collections</li>
                        <li className="tab" id="cardsTab" >Cards</li>
                    </ul>
                    <hr/>
                </nav>
                <div className="display">
                    <div className="flex-container" id="collections">
                                {this.state.collections}
                    </div>
                    <div className="flex-container " id="cards">
                                {this.state.cards}
                    </div>
                </div>
            </>
        )
    }


}

export default Manage;
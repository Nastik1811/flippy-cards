import ReactDOM from 'react-dom'
import React from 'react'
import CardPreview from '../Components/CardPreview'
import CollectionPreview from '../Components/CollectionPreview'

export const Tabbar = ({children, activeTabIndex}) => {
    return (
        <nav className="tabbar">
            <ul className="tab-links">
                {children}
            </ul>
            <hr/>
        </nav>
    )
}

export const Tab = ({label, onClick}) => {
    
    return (
        <li className="tab" onClick={onClick}>{label}</li>
    )
}

export const Pannel = ({children}) => {
    return (
        
            <div className="flex-container ">
                {children}
            </div>
    )
}

export const TabView = ({children}) => {
    return (
            <>
                <Tab label="Collections" index="0"/>
                <Tab label="Cards" index="1"/>

                <div className="board">
                    <Pannel index="0">
                        <CreateNewButton/>
                        {this.collections}
                    </Pannel>

                    <Pannel index="1">
                        <CreateNewButton/>
                        {this.cards}
                    </Pannel>
                </div>
            </>
    )
}


export const CreateNewButton = props => {
    return (
        <div className="preview-container">
            <div className="preview-component add-btn">+
            </div>
        </div>
    )
}

class Manage extends React.Component {
    constructor(props){
        super(props);
        this.collections = [<CollectionPreview/>, <CollectionPreview/>, <CollectionPreview/>, <CollectionPreview/>];
        this.cards = [<CardPreview/>, <CardPreview/>, <CardPreview/>, <CardPreview/>, <CardPreview/>, <CardPreview/>];
        this.state = {
            activeTabIndex: 0
        }
    }

    handleClick(){
        alert("Clicked");
    }
    render(){
        return (
            <>
                <Tabbar activeTab={this.state.activeTabIndex}>
                    <Tab label="Collections" onClick={this.handleClick}/>
                    <Tab label="Cards" onClick={this.handleClick}/>
                </Tabbar>
                <div className="board">
                    <Pannel index="0">
                        <CreateNewButton/>
                        {this.collections}
                    </Pannel>
                    <Pannel index="1">
                        <CreateNewButton/>
                        {this.cards}
                    </Pannel>
                </div>
            </>
        )
    }


}

export default Manage;
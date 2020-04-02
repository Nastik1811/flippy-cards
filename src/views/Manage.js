import ReactDOM from 'react-dom'
import React from 'react'
import CardPreview from '../components/CardPreview'
import CollectionPreview from '../components/CollectionPreview'
import { collections, getCards } from '../DummyData'

export const Tabbar = ({children, activeTabIndex}) => {
    let tabs = children;

    return (
        <nav className="tabbar">
            <ul className="tab-links">
                {children}
            </ul>
            <hr/>
        </nav>
    )
}

export const Tab = ({index, activeTabIndex, label, onClick}) => {

    let className = index == activeTabIndex ? "tab-active" : "tab";
    return (
        <li className={className} onClick={()=>{onClick(index)}}>{label}</li>
    )
}

export const Pannel = ({children, index, activeTabIndex}) => {

    let className = index == activeTabIndex ? "board-active" : "board";

    return (
        
            <div className={className}>
                {children}
            </div>
    )
}

export const TabView = ({children}) => {
}


export const CreateNewButton = props => {
    return (
        <>
        <div className="preview-container">
            <div className="preview-component add-btn">+
            </div>
            <div className="preview-component outline-border"></div>
        </div>
        
        </>
    )
}

class Manage extends React.Component {
    constructor(props){
        super(props);
        this.collections = collections;
        this.cards = getCards();
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            activeTabIndex: "0",
        }
    }

    handleClick(index){
        this.setState(() => ({
            activeTabIndex: index,
        }))
    }

    render(){
        return (
            <>
                <Tabbar>
                    <Tab index="0" activeTabIndex={this.state.activeTabIndex} label="Collections" onClick={this.handleClick}/>
                    <Tab index="1" activeTabIndex={this.state.activeTabIndex} label="Cards" onClick={this.handleClick} />
                </Tabbar>
                {this.state.activeTabIndex === 0 ? <panel1 /> : <panel2 />}
                <Pannel index="0" activeTabIndex={this.state.activeTabIndex}>
                    
                    {this.collections.map((c, i) => <CollectionPreview slug={i} name={c.name} created={c.created}/>)}
                </Pannel>
                <Pannel index="1" activeTabIndex={this.state.activeTabIndex}>
                    
                    {this.cards.map(c => <CardPreview front={c.front} back={c.back} />)}
                </Pannel>
            </>
        )
        }

}
export default Manage;
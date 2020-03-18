import ReactDOM from 'react-dom'
import React from 'react'
import CardPreview from '../Components/CardPreview'
import CollectionPreview from '../Components/CollectionPreview'
import { collections } from '../DummyData'

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
    return (
            <>
                <Tabbar>
                    <Tab index="0" activeTabIndex={this.state.activeTabIndex} label="Collections" onClick={this.handleClick}/>
                    <Tab index="1" activeTabIndex={this.state.activeTabIndex} label="Cards" onClick={this.handleClick} />
                </Tabbar>
                    <Pannel index="0" activeTabIndex={this.state.activeTabIndex}>
                        <CreateNewButton/>
                        {this.collections}
                    </Pannel>
                    <Pannel index="1" activeTabIndex={this.state.activeTabIndex}>
                        <CreateNewButton/>
                        {this.cards}
                    </Pannel>
            </>
    )
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
        this.collections = collections.map((c, i) => <CollectionPreview slug={i} name={c.name} created={c.created}/>);
        this.cards = collections[0].cards.map(c => <CardPreview front={c.front} back={c.back} />);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            activeTabIndex: 0
        }
    }

    handleClick(index){
        this.setState((state) => ({
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
                    <Pannel index="0" activeTabIndex={this.state.activeTabIndex}>
                        <CreateNewButton/>
                        {this.collections}
                    </Pannel>
                    <Pannel index="1" activeTabIndex={this.state.activeTabIndex}>
                        <CreateNewButton/>
                        {this.cards}
                    </Pannel>
            </>
        )
        }

}
export default Manage;
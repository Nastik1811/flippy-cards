import React from 'react'

class Card extends React.Component {
    constructor(){
        super();
        this.state = {
            isFlipped: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState((state => ({isFlipped: !state.isFlipped})));  
    }

    render() {
        return (
            <div className={this.state.isFlipped? "card flipped" : "card"} onClick={this.handleClick}>
                
                <div className="card-front">{this.props.card.front}
                </div>
                <div className="card-back">{this.props.card.back}
                </div>
                <span className="card-caption">Click to flip</span>
            </div>
        )
    }
}

export default Card;
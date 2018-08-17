import React from 'react';
//每条评论
export default class Item extends React.Component {
    constructor(){
        super();
    }
    render() {
        return (
            <div>
                <h2>{this.props.item.author}</h2>
                <p>{this.props.item.content}</p>
            </div>
        );
    }
}
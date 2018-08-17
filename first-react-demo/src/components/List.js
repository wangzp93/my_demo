import React from 'react';
import Item from './Item';
//评论区模块
export default class List extends React.Component {
    constructor() {
        super();
    }
    render() {
        let arr = this.props.arr;
        var itemArr = arr.map((item, index) => {
            return <Item key={index} item={item} />;
        });
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">评论列表</h3>
                </div>
                <div className="panel-body">
                    {itemArr}
                </div>
            </div>
        );
    }
}
import React from 'react';
//表单模块
export default class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            author: "",
            content: ""
        }
    }
    //作者输入变化
    authorChange(e) {
        // this.state.author = e.target.value;
        this.setState({
            author: e.target.value
        });
    }
    //内容输入变化
    contentChange(e) {
        this.setState({
            content: e.target.value
        });
    }
    //提交表单的事件
    formSubmit(e) {
        e.preventDefault();
        var author = this.state.author,
            content = this.state.content;
        this.props.change({
            author: author,
            content: content
        });
    }
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">请输入</h3>
                </div>
                <div className="panel-body">
                    <form>
                        <div className="form-group">
                            作者：<input type="text" onChange={this.authorChange.bind(this)} className="form-control" id="exampleInputEmail1" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            内容：<input type="text" onChange={this.contentChange.bind(this)} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <button onClick={this.formSubmit.bind(this)} className="btn btn-default">提交</button>
                    </form>
                </div>
            </div>
        );
    }
}
import React from 'react';
import logo from '../logo.svg';
//无状态组件书写方式
export default function Header() {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                        <img alt="Brand" src={logo} width="50px"/>
                    </a>
                    <h4>欢迎来到React练习评论框</h4>
                </div>
            </div>
        </nav>
    );
}
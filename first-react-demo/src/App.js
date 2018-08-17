import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import List from './components/List';
import Form from './components/Form';

class App extends Component {
  constructor() {
      super();
      this.state = {
          arr: [
              {id: 1, author: "admin", content: "nihao"},
              {id: 2, author: "admin1", content: "nihao"},
              {id: 3, author: "admin2", content: "nihao"}
          ]
      }
  }
  //改变数据的方法，子组件调用这个方法以改变数据
  changeArr(data) {
      var arr = this.state.arr;
      arr.push(data);
      // this.state.arr.push(data);
      //必须用set去赋值，这样才会调用render方法
      this.setState({
          arr: arr
      });
  }
  render() {
      return (
          <div className="app">
              <Header/>
              <div className="container">
                  <div className="col-md-6">
                      <List arr={this.state.arr}/>
                  </div>
                  <div className="col-md-6">
                      <Form change={this.changeArr.bind(this)}/>
                  </div>
              </div>
          </div>
      );
  }
}

export default App;

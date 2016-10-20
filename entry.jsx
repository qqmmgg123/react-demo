import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class HelloMessage extends Component {
  render() {
    return <div>Hello, world!</div>;
  }
}

ReactDOM.render(React.createElement(HelloMessage), document.getElementById('example'));

import React, { Component } from 'react';
import Basic from './containers/form';
import Table from './containers/table';

class App extends Component {

  render() {
    return (
      <div>
        <Basic title='New User'/>
          <Table />
    </div>
    );
  }
}

export default App;

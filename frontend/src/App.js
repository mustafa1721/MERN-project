import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login';
import CustomerList from './components/customers';
import TransactionDetails from './components/transactions';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/customer-list" component={CustomerList} />
          <Route path="/transactions/:account" component={TransactionDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

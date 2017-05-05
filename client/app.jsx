import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './components/Hello-world';
import App2 from './components/app2';
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import createBrowserHistory from 'history/createBrowserHistory';

ReactDOM.render((
        <Router history={createBrowserHistory()}>
          <div>
            <Route path="/" component={HelloWorld}/>
            <Route path="/admin" component={App2}/>
          </div>
        </Router>
        // <HelloWorld phrase="clinic"/>,
    ), document.body
);
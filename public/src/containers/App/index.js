import React, { Component } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { Home, About } from '../../pages'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path="/about" component={About} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App
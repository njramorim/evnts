import React,  {Component} from 'react'
import ReactDOM from 'react-dom'
import Events from './containers/events'

class App extends Component {
	render() {
    return <main>
    	<Events />
    </main>
  }
}

ReactDOM.render(<App />, document.getElementById('app'))

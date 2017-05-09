import React, {Component} from 'react'
import Events from './events'

export default class Container extends Component {
	constructor(props) {
    super(props)
  }

	render() {
    return <main>
    	<Events />
    </main>
  }
}
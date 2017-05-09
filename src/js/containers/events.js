import React, {Component} from 'react'
import {getData} from './../utils/getData'
import {getPeriod} from './../utils/getPeriod'
import Hotels from './hotels'
import Event from './../components/event'
import Summary from './../components/summary'

export default class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
			events: {},
			selected: false,
			ready: false
		}
  }

  showMore(reference) {
  	this.setState({selected: reference})	
  }

  componentDidMount() {
		getData('events')
			.then(data => this.setState({events: data, ready: true}))
			.catch(error => console.error(`Deu ruim: ${error}`))
	}

  render() {
    let data = this.state.events
		return this.state.ready && <div 
			className={`container ${this.state.selected ? 'modal' : ''}`}
		>
			<Summary 
				quantity = {data.length} 
				periodMin = {getPeriod(data, true)}
				periodMax = {getPeriod(data, false)}
			/>
			<section className="events">
	    	<ul>
	    		{data.map((item, index) => {
						return <Event key={index}
							name = {item.name}
							location = {item.location}
							startDate = {item.startDate}
							endDate = {item.endDate}
							image = {item.image}
							description = {item.description}
							showMore = {this.showMore.bind(this, item.id)}
						/>
	    		})}
	    	</ul>
	    </section>
    	{this.state.selected && <Hotels reference = {
    			this.state.selected ? this.state.selected : ''
    		}
    	/>}
    	<button className="close" onClick={this.showMore.bind(this, false)}>
    		Fechar
    	</button>
    </div>
  }
}
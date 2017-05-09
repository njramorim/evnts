import React, {Component} from 'react'
import {getData} from './../utils/getData'
import {checkString} from './../utils/checkString'
import Form from './form'
import Hotel from './../components/hotel'
import Room from './../components/room'

export default class Hotels extends Component {
  constructor(props) {
    super(props)
    this.state = {
			hotels: {},
			room: false,
			order: false, 
			ready: false
		}
  }

  selectRoom(reference, confirm) {
  	this.setState({room: reference, order: confirm})
  }

  countItems(total, text) {
		let items = []
  	for (let item = 0; item < total; item++) {
  		items.push(<i key={item}></i>)
  	}
  	return items
  }

  componentDidMount() {  	
		getData('hotels')
			.then(data => this.setState({hotels: data, ready: true}))
			.catch(error => console.error(`Deu ruim: ${error}`))
	}

  render() {
    let data = this.state.hotels
		return this.state.ready && <section className="hotels">
    	<ul>
    		<div className="none">Atualmente não temos hotéis disponíveis para esse evento.</div>
    		{data.map((item, index) => {
    			return this.props.reference === item.id && <Hotel key = {index}	
    				refs = {item.id}
						name = {item.name}
						location = {item.location}
						stars = {this.countItems(item.stars)}
						distanceToEvent = {item.distanceToEvent}
						image = {item.image}
						description = {item.description}
						amenities = {item.amenities.map((item, index) => {
							return <li key={index}>{item}</li>
						})}			
					>
					<ul className="rooms">
						{item.rooms.map((item, index) => {
				    	return <Room key={index}
				    		refs = {item.id}
				    		name = {item.name}
				    		price = {item.price}
				    		beds = {checkString(item.bed, item.beds).map((item, index) => {
									return <span key={index}>{item}</span>
								})}		
								selectRoom = {this.selectRoom.bind(this, item.id, false)}	
								buttonActive = {this.state.room === item.id ? 'active' : ''}
				    	/>
						})}
			    </ul>
					</Hotel>
    		})}
    	</ul>
    	{this.state.room && <Form
    		order = {this.selectRoom.bind(this, this.state.room, true)}
    		close = {this.selectRoom.bind(this, false, false)}
    	/>}
    	<div 
    		onClick = {this.selectRoom.bind(this, false, false)}
    		className={'message ' + !!this.state.order}>
    	</div>
    </section>
  }
}
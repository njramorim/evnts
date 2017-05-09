import React from 'react'

const Hotel = (props) => {
	return <li>
		<h3>
			{props.name}
			<span className="stars">{props.stars}</span>
		</h3>
		<h4>
			{props.location}
			<span className="distance">{props.distanceToEvent}</span>
		</h4>
		<figure>
			<img src={props.image}/>
			<figcaption>
				<p className="description">{props.description}</p>
				<ul className="amenities">
					{props.amenities}
				</ul>
			</figcaption>
		</figure>
		{props.children}
	</li>
}

export default Hotel
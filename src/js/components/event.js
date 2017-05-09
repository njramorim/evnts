import React from 'react'

const Event = (props) => {
	return <li onClick={props.showMore}>
		<h2>{props.name}</h2>
		<h3>{props.location}</h3>
		<p>
			<span>{props.startDate}</span>
			<span>{props.endDate}</span>
		</p>
		<figure>
			<img src={props.image}/>
			<figcaption>
				<p>
					{props.description}
				</p>
			</figcaption>
		</figure>
		{props.children}
	</li>
}

export default Event
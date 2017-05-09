import React from 'react'

const Room = (props) => {
	return <li>
		<p>
			{props.name}
		</p>
		<span className="price">{props.price}</span>
		<span className="beds">Camas: {props.beds}</span>
		<button className={props.buttonActive} type="button" onClick={props.selectRoom}>
		</button>
	</li>
}

export default Room
import React from 'react'

const Summary = (props) => {
	return <div className="summary">
		<ul className="resume">
			<dl className="total">
			  <dt>Eventos Encontrados</dt>
			  <dd>{props.quantity}</dd>
			</dl>
			<dl className="period">
			  <dt>No período entre</dt>
			  <dd>
			  	<span>{props.periodMin}</span>
			  		a
			  	<span>{props.periodMax}</span>
			  </dd>
			</dl>
		</ul>
		<ul className="topics">
			<li><p>Evento</p></li>
			<li><p>Localização</p></li>
			<li><p>Início - Fim</p></li>
		</ul>
	</div>
}

export default Summary
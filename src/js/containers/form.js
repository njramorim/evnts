import React, {Component} from 'react'


export default class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
		}
  }

  componentDidMount() {
	}

  render() {
    return <form className="roomForm">
      <fieldset>
        <legend>Solicite sua reserva:</legend>
      	<label>
          <p>Nome:</p>
          <input type="text" placeholder="Nome:"/>
        </label>
        <label>
          <p>Telefone:</p>
          <input type="phone"  placeholder="Telefone:"/>
        </label>
        <label>
          <p>Email:</p>
          <input type="email" placeholder="Email:"/>
        </label>
        <button type="button" onClick={this.props.order}>Solicitar</button>
      </fieldset>
      <span onClick={this.props.close}>Fechar</span>
    </form>
  }
}
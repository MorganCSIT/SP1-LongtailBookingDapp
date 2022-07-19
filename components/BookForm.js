import React, { Component } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import Trip from '../ethereum/trip'
import web3 from '../ethereum/web3'
import { Router } from '../routes'
class BookForm extends Component {
  state = {
    value: '',
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const trip = Trip(this.props.address)

    try {
      const accounts = await web3.eth.getAccounts()
      await trip.methods.reserve().send({
        from: accounts[0],
        value: this.state.value,
      })

      Router.replaceRoute(`/trips/${this.props.address}`)
    } catch (err) {}
  }
  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Amount to Book</label>
          <Input
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
            label="wei"
            labelPosition="right"
          />
        </Form.Field>
        <Button primary>Book!</Button>
      </Form>
    )
  }
}

export default BookForm

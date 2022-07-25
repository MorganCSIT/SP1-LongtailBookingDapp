import React, { Component } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import Trip from '../ethereum/trip'
import web3 from '../ethereum/web3'
import { Router } from '../routes'
import { link } from '../routes'
class BookForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false,
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const trip = Trip(this.props.address)

    this.setState({ loading: true, errorMessage: '' })

    try {
      const accounts = await web3.eth.getAccounts()
      await trip.methods.reserve().send({
        from: accounts[0],
        value: this.state.value,
      })

      Router.replaceRoute(`/trips/${this.props.address}`)
    } catch (err) {
      this.setState({ errorMessage: err.messaage })
    }
    this.setState({ loading: false, message: '' })
  }
  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Book</label>
          <Input
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
            label="wei"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button loading={this.state.loading} primary>
          Book!
        </Button>
      </Form>
    )
  }
}

export default BookForm

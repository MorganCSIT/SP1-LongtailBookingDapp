import React, { Component } from 'react'
import { Form, Input, Message, Button, Icon } from 'semantic-ui-react'
import Trip from '../ethereum/trip'
import web3 from '../ethereum/web3'
import { Router } from '../routes'
import { Link } from '../routes'
class CaptainConfirmForm extends Component {
  state = {
    value: '',
    date: '',
    errorMessage: '',
    loading: false,
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const trip = Trip(this.props.address)
    this.setState({ loading: true, errorMessage: '' })
    const { date } = this.state

    try {
      const accounts = await web3.eth.getAccounts()
      await trip.methods.captainConfirmation(date).send({
        from: accounts[0],
        value: this.state.value,
      })

      Router.replaceRoute(`/trips/${this.props.address}/captain`)
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false, message: '' })
  }

  onCaptainCancel = async (event) => {
    event.preventDefault()
    const trip = Trip(this.props.address)
    this.setState({ loading3: true, errorMessage: '' })

    try {
      const accounts = await web3.eth.getAccounts()
      await trip.methods.captainCancel().send({
        from: accounts[0],
      })
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading3: false, message: ' ' })
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Confirm or Cancel trip</label>
          <Input
            value={this.state.date}
            onChange={(event) => this.setState({ date: event.target.value })}
            label="text"
            labelPosition="right"
            placeholder="dd/mm/yyyy"
          />
          <Input
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
            label="wei"
            labelPosition="right"
            placeholder="Deposit (price * 2)"
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Link route={`/trips/${this.props.address}/captain`}>
          <Button loading={this.state.loading} circular compact color="green">
            <Icon name="thumbs up" />
            Confirm Trip
          </Button>
        </Link>
        <Link route={`/trips/${this.props.address}/captain`}>
          <Button
            style={{ marginTop: 10, marginBottom: 10 }}
            color="brown"
            onClick={this.onCaptainCancel}
            loading={this.state.loading3}
            circular
            compact
          >
            <Icon name="trash" />
            Cancel
          </Button>
        </Link>
      </Form>
    )
  }
}

export default CaptainConfirmForm

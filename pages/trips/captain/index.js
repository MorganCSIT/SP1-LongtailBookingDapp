import React, { Component } from 'react'
import {
  Card,
  Grid,
  Button,
  Divider,
  Form,
  Message,
  Input,
} from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import Trip from '../../../ethereum/trip'
import web3 from '../../../ethereum/web3'
import { Router } from '../../../routes'
import CaptainConfirmForm from '../../../components/CaptainConfirmForm'

class CaptainCorner extends Component {
  static async getInitialProps(props) {
    const trip = Trip(props.query.address)

    const summary = await trip.methods.getSummary().call()

    return {
      address: props.query.address,
      boatPrice: summary[0],
      deposit: summary[1],
      captain: summary[2],
      totalBalance: summary[3],
      cancelled: summary[4],
      readyToVote: summary[5],
      typeOfVote: summary[6],
      reserved: summary[7],
      refunded: summary[8],
      clientConfirmed: summary[9],
      captainConfirmed: summary[10],
      description: summary[11],
    }
  }

  renderCards() {
    const {
      boatPrice,
      deposit,
      captain,
      totalBalance,
      cancelled,
      readyToVote,
      typeOfVote,
      reserved,
      refunded,
      clientConfirmed,
      captainConfirmed,
      description,
    } = this.props

    const items = [
      {
        header: 'Reserved?',
        meta: '',
        description: reserved.toString(),
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Trip Info',
        meta: '',
        description: description,
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Confirm or Refund?',
        meta:
          'Captain starts vote to continue(0), client starts vote for refund(1)',
        description: typeOfVote,
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Cancelled?',
        meta: '-',
        description: cancelled.toString(),
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Refunded?',
        meta: '-',
        description: refunded.toString(),
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Captain confirmed?',
        meta: '-',
        description: captainConfirmed.toString(),
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Client confirmed?',
        meta: '-',
        description: clientConfirmed.toString(),
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Deposit',
        meta: '-',
        description: deposit,
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Trip balance',
        meta: '-',
        description: totalBalance,
        style: { overflowWrap: 'break-word' },
      },
    ]

    return <Card.Group items={items} />
  }

  state = {
    description: '',
    errorMessage: '',
    loading: false,
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const trip = Trip(this.props.address)

    this.setState({ loading: true, errorMessage: '' })

    const { description } = this.state

    try {
      const accounts = await web3.eth.getAccounts()
      await trip.methods.setDescription(description).send({ from: accounts[0] })

      Router.replaceRoute(`/trips/${this.props.address}/captain`)
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false, message: '' })
  }

  render() {
    return (
      <Layout>
        <Grid>
          <Grid.Column>
            <Button style={{ marginBottom: 10 }} color="purple" fluid>
              Captains's Corner
            </Button>
            {this.renderCards()}
            <Divider></Divider>
            <Grid.Row>
              <CaptainConfirmForm address={this.props.address} />
            </Grid.Row>
            <Divider></Divider>
            <Grid.Row>
              <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                  <label>Edit description</label>
                  <Input
                    value={this.state.description}
                    onChange={(event) =>
                      this.setState({ description: event.target.value })
                    }
                    label="text"
                    labelPosition="right"
                  />
                </Form.Field>
                <Message
                  error
                  header="Oops!"
                  content={this.state.errorMessage}
                />
                <Button loading={this.state.loading} color="green">
                  Edit!
                </Button>
              </Form>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}

export default CaptainCorner

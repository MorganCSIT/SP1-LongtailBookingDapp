import React, { Component } from 'react'
import { Card, Grid } from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import Trip from '../../../ethereum/trip'

class TripVotes extends Component {
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
    } = this.props

    const items = [
      {
        header: 'Reserved?',
        meta: '',
        description: reserved.toString(),
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
    ]

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <Grid>
          <Grid.Column>
            <h3>Trip Votes</h3>
            {this.renderCards()}
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}

export default TripVotes

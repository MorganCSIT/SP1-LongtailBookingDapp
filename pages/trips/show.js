import React, { Component } from 'react'
import { Card, Grid, Button } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import Trip from '../../ethereum/trip'
import web3 from '../../ethereum/web3'
import BookForm from '../../components/BookForm'
import VoteForm from '../../components/VoteForm'
import { Link } from '../../routes'
import { type } from 'mocha/lib/utils'

class TripShow extends Component {
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
    } = this.props

    const items = [
      {
        header: captain,
        meta: 'Address of Captain',
        description: 'The Captain created this trip',
        style: { overflowWrap: 'break-word' },
      },

      {
        // convert to ether using web3.utils.fromWei(, 'ether')
        header: boatPrice,
        meta: 'Trip price',
        description: 'Price of the trip',
        style: { overflowWrap: 'break-word' },
      },

      {
        header: deposit,
        meta: 'Deposit amount',
        description: 'Deposit needed to book this trip',
        style: { overflowWrap: 'break-word' },
      },

      {
        header: totalBalance,
        meta: 'Trip balance',
        description: 'The amount deposited in this trip',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: cancelled,
        meta: 'Cancelled or not?',
        description: 'Cancelled trips are broken dreams',
        style: { overflowWrap: 'break-word' },
      },

      {
        header: readyToVote,
        meta: 'Ready or not?',
        description: 'This is the start of our adventure',
        style: { overflowWrap: 'break-word' },
      },
      {
        // convert to ether using web3.utils.fromWei(, 'ether')
        header: typeOfVote,
        meta: 'What type?',
        description: 'Determines whether continue or refund',
        style: { overflowWrap: 'break-word' },
      },
    ]

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <Grid>
          <Grid.Column width={10}>
            <h3>Trip Show</h3>
            {this.renderCards()}
          </Grid.Column>
          <Grid.Column width={6}>
            <BookForm address={this.props.address} />
          </Grid.Column>
          <Grid.Column width={6}>
            <VoteForm address={this.props.address} />
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}

export default TripShow

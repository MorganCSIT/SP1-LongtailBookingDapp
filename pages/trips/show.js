import React, { Component } from 'react'
import { Card, Grid } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import Trip from '../../ethereum/trip'
import web3 from '../../ethereum/web3'
import BookForm from '../../components/BookForm'
import { Link } from '../../routes'

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
    }
  }

  renderCards() {
    const { boatPrice, deposit, captain, totalBalance } = this.props

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
        </Grid>
      </Layout>
    )
  }
}

export default TripShow

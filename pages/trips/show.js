import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import Trip from '../../ethereum/trip'

class TripShow extends Component {
  static async getInitialProps(props) {
    const trip = Trip(props.query.address)

    const summary = await trip.methods.getSummary().call()

    return {
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
    ]

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <h3>Trip Show</h3>
        {this.renderCards()}
      </Layout>
    )
  }
}

export default TripShow

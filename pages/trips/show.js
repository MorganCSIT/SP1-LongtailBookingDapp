import React, { Component } from 'react'
import { Card, Grid, Button, Divider } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import Trip from '../../ethereum/trip'
import web3 from '../../ethereum/web3'
import BookForm from '../../components/BookForm'
import { Link } from '../../routes'
import { type } from 'mocha/lib/utils'
// import { LinkPreview } from '@dhaiwat10/react-link-preview'

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
      reserved: summary[4],
      refunded: summary[5],
      confirmed: summary[6],
      description: summary[7],
      client: summary[8],
    }
  }

  renderCards() {
    const {
      boatPrice,
      deposit,
      captain,
      totalBalance,
      reserved,
      refunded,
      confirmed,
      description,
      client,
    } = this.props

    const items = [
      {
        header: 'Trip Info',
        meta: 'Captains Trip details',
        description: description,
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Captain Address',
        meta: '',
        description: captain,
        style: { overflowWrap: 'break-word', fontFamily: 'monospace' },
      },
      {
        header: 'Reserved?',
        meta: '',
        description: reserved.toString(),
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Price',
        meta: 'The fare that the captain wishes to receive for this trip',
        description: boatPrice,
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Amount required to book',
        meta: 'Adventurers must provide a deposit matching the trips price',
        description: deposit,
        style: { overflowWrap: 'break-word' },
      },
    ]

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <Grid>
          <Grid.Column width={11}>
            <h3>Trip details</h3>
            {this.renderCards()}
          </Grid.Column>
          <Grid.Column width={9}>
            <h3>Trip booking</h3>
            <BookForm address={this.props.address} />
            <Divider></Divider>
          </Grid.Column>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/trips/${this.props.address}/Adventurer`}>
                <a>
                  <Button color="pink">Adventurer's Corner</Button>
                </a>
              </Link>
              <Link route={`/trips/${this.props.address}/captain`}>
                <a>
                  <Button color="purple">Captain's Corner</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

export default TripShow

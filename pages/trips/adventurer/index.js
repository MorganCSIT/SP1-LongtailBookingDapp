import React, { Component } from 'react'
import { Card, Grid, Button, Divider } from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import Trip from '../../../ethereum/trip'

class ClientCorner extends Component {
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
    } = this.props

    const items = [
      {
        header: 'Trip details',
        meta: '-',
        description: description,
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Reserved?',
        meta: '',
        description: reserved.toString(),
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Refunded?',
        meta: '-',
        description: refunded.toString(),
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'confirmed',
        meta: '-',
        description: confirmed.toString(),
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
            {this.renderCards()}
            <Grid.Row>
              <Divider> </Divider>
              <Button style={{ marginBottom: 10 }} color="pink" fluid>
                Adventurer's Corner
              </Button>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}

export default ClientCorner

import React, { Component } from 'react'
import { Card, Grid, Button, Divider } from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import Trip from '../../../ethereum/trip'
import web3 from '../../../ethereum/web3'
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

  onRefund = async () => {
    const trip = Trip(this.props.address)

    const accounts = await web3.eth.getAccounts()
    await trip.methods.refund().send({
      from: accounts[0],
    })
  }

  onApproveTrip = async () => {
    const trip = Trip(this.props.address)

    const accounts = await web3.eth.getAccounts()
    await trip.methods.approveTrip().send({
      from: accounts[0],
    })
  }

  render() {
    return (
      <Layout>
        <Grid>
          <Grid.Column>
            {this.renderCards()}
            <Grid.Row>
              <Button
                style={{ marginTop: 10 }}
                color="red"
                onClick={this.onRefund}
              >
                Refund
              </Button>
              <Button
                style={{ marginTop: 10 }}
                color="green"
                onClick={this.onApproveTrip}
              >
                Approve Trip
              </Button>
            </Grid.Row>
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

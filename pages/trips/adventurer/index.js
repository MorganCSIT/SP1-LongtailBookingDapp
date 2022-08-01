import React, { Component } from 'react'
import { Card, Grid, Button, Divider, Message } from 'semantic-ui-react'
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
        header: 'Client Address',
        meta: '-',
        description: client,
        style: { overflowWrap: 'break-word' },
      },
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

  state = { loading: false }

  onRefund = async (event) => {
    event.preventDefault()
    const trip = Trip(this.props.address)
    this.setState({ loading: true })

    try {
      const accounts = await web3.eth.getAccounts()
      await trip.methods.refund().send({
        from: accounts[0],
      })
    } catch (err) {}
    this.setState({ loading: false })
  }

  state = { loading2: false }

  onApproveTrip = async (event) => {
    event.preventDefault()
    const trip = Trip(this.props.address)
    this.setState({ loading2: true })

    try {
      const accounts = await web3.eth.getAccounts()
      await trip.methods.approveTrip().send({
        from: accounts[0],
      })
    } catch (err) {}
    this.setState({ loading2: false })
  }

  render() {
    return (
      <Layout>
        <Grid>
          <Grid.Column>
            {this.renderCards()}
            <Divider></Divider>
            <Button
              style={{ marginBottom: 10, marginTop: 10 }}
              color="pink"
              fluid
            >
              Adventurer's Corner
            </Button>
            <Grid.Row>
              <Button
                style={{ marginTop: 10 }}
                color="red"
                onClick={this.onRefund}
                loading={this.state.loading}
              >
                Refund
              </Button>
              <Button
                style={{ marginTop: 10 }}
                color="green"
                onClick={this.onApproveTrip}
                loading={this.state.loading2}
              >
                Approve Trip
              </Button>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}

export default ClientCorner

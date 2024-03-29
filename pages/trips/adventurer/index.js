import React, { Component } from 'react'
import {
  Card,
  Grid,
  Button,
  Divider,
  Icon,
  Segment,
  Message,
  Form,
  Menu,
} from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import Trip from '../../../ethereum/trip'
import web3 from '../../../ethereum/web3'
import { Link } from '../../../routes'
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
      date: summary[9],
      refunding: summary[10],
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
      date,
    } = this.props

    const items = [
      {
        header: 'Adventurer address',
        meta: '',
        description: client,
        style: { overflowWrap: 'break-word', fontFamily: 'monospace' },
      },
      {
        header: 'Trip info',
        meta: '',
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
        header: 'Confirmed?',
        meta: 'Has the captain confirmed your reservation?',
        description: confirmed.toString(),
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Confirmed date',
        meta: 'Date for confirmed trip to take place.',
        description: date,
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Trip balance',
        meta: 'Current amount of value stored in channel',
        description: totalBalance + ' wei',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Refund requested?',
        meta: 'Refund requires captains approval',
        description: refunded.toString(),
        style: { overflowWrap: 'break-word' },
      },
    ]

    return <Card.Group items={items} />
  }

  state = { loading: false, errorMessage: '' }

  onRefund = async (event) => {
    event.preventDefault()
    const trip = Trip(this.props.address)
    this.setState({ loading: true, errorMessage: '' })

    try {
      const accounts = await web3.eth.getAccounts()
      await trip.methods.refund().send({
        from: accounts[0],
      })
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false, message: '' })
  }

  state = { loading2: false, errorMessage: '' }

  onApproveTrip = async (event) => {
    event.preventDefault()
    const trip = Trip(this.props.address)
    this.setState({ loading2: true, errorMessage: '' })

    try {
      const accounts = await web3.eth.getAccounts()
      await trip.methods.approveTrip().send({
        from: accounts[0],
      })
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading2: false, message: '' })
  }

  state = { loading3: false, errorMessage: '' }

  onCancellation = async (event) => {
    event.preventDefault()
    const trip = Trip(this.props.address)
    this.setState({ loading3: true, errorMessage: '' })

    try {
      const accounts = await web3.eth.getAccounts()
      await trip.methods.cancellation().send({
        from: accounts[0],
      })
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading3: false, message: '' })
  }

  render() {
    return (
      <Layout>
        <Segment>
          <Link route="/">
            <Button style={{ marginBottom: 10 }} color="pink">
              <Icon name="user circle" />
              Adventurer's Corner
            </Button>
          </Link>
          <Grid>
            <Grid.Column>
              {this.renderCards()}
              <Divider></Divider>
              <Grid.Row>
                <Form error={!!this.state.errorMessage}>
                  <Form.Field>
                    <label>Cancel when confirmed = false</label>
                    <Link route={`/trips/${this.props.address}/adventurer`}>
                      <Button
                        style={{ marginTop: 10 }}
                        color="brown"
                        onClick={this.onCancellation}
                        loading={this.state.loading3}
                        circular
                        compact
                      >
                        <Icon name="trash" />
                        Cancel Reservation
                      </Button>
                    </Link>
                  </Form.Field>
                  <Form.Field>
                    <label>Request refund when confirmed = true</label>
                    <Link route={`/trips/${this.props.address}/adventurer`}>
                      <Button
                        style={{ marginTop: 10 }}
                        color="black"
                        onClick={this.onRefund}
                        loading={this.state.loading}
                        circular
                        compact
                      >
                        <Icon name="exclamation triangle" />
                        Request Refund
                      </Button>
                    </Link>
                  </Form.Field>
                  <Form.Field>
                    <label>Approve trip after meeting captain</label>
                    <Link route={`/trips/${this.props.address}/adventurer`}>
                      <Button
                        style={{ marginTop: 10 }}
                        color="green"
                        onClick={this.onApproveTrip}
                        loading={this.state.loading2}
                        circular
                        compact
                      >
                        <Icon name="thumbs up outline" />
                        Approve Trip
                      </Button>
                    </Link>
                  </Form.Field>
                  <Message
                    error
                    header="Oops!"
                    content={this.state.errorMessage}
                  />
                </Form>
              </Grid.Row>
            </Grid.Column>
          </Grid>
          <Menu>
            <Menu.Menu>
              <a
                href={'https://www.coinbase.com/converter/wei/thb'}
                className="item"
              >
                <Icon name="ethereum" color="" />
                wei/Converter
              </a>
            </Menu.Menu>
            <a href={'https://footpathapp.com/map'} className="item">
              <Icon name="map marker alternate" color="" />
              planner
            </a>
          </Menu>
        </Segment>
      </Layout>
    )
  }
}

export default ClientCorner

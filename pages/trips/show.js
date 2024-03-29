import React, { Component } from 'react'
import {
  Card,
  Grid,
  Button,
  Divider,
  Icon,
  Segment,
  Menu,
} from 'semantic-ui-react'
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
      date: summary[9],
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
        header: 'Price',
        meta: 'The fare that the captain wishes to receive for this trip',
        description: boatPrice + ' wei',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: 'Amount needed to reserve',
        meta: boatPrice + ' will be returned after your approval',
        description: deposit + ' wei ',
        style: { overflowWrap: 'break-word' },
      },
    ]

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <Segment>
          <Grid>
            <Grid.Column width={15}>
              <Link route="/">
                <Button color="blue">
                  <Icon name="ethereum" />
                  {this.props.address.substring(1, 6)}
                </Button>
              </Link>

              {/* <Link route={`/trips/${this.props.address}/Adventurer`}>
                <a>
                  <Button color="pink">
                    <Icon
                      style={{ marginLeft: 8 }}
                      size="large"
                      name="user circle"
                    />
                  </Button>
                </a>
              </Link>
              <Icon
                name="handshake outline"
                color="black"
                size="large"
                style={{ marginRight: 8, marginLeft: 6 }}
              />
              <Link route={`/trips/${this.props.address}/captain`}>
                <a>
                  <Button color="purple">
                    <Icon
                      name="anchor"
                      size="large"
                      style={{ marginLeft: 9 }}
                    />
                  </Button>
                </a>
              </Link> */}
              <div style={{ marginTop: 14 }}>{this.renderCards()}</div>
              <Divider></Divider>
              <Grid.Row width={16}>
                <BookForm address={this.props.address} />
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

export default TripShow

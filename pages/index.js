import React, { Component } from 'react'
import { Button, Card, Divider, Segment, Icon, Menu } from 'semantic-ui-react'
import factory from '../ethereum/factory'
import Layout from '../components/Layout'
import { Link } from '../routes'

class TripIndex extends Component {
  static async getInitialProps() {
    const trips = await factory.methods.getDeployedTrips().call()

    return { trips }
  }

  renderTrips() {
    const items = this.props.trips.map((address) => {
      return {
        header: (
          <p style={{ fontFamily: 'monospace' }}>{address.substring(1, 6)}</p>
        ),
        description: (
          <Link route={`/trips/${address}`}>
            <a>
              <Icon name="info circle" />
              Information
            </a>
          </Link>
        ),
        fluid: true,
        style: { overflowWrap: 'break-word' },
      }
    })

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <Segment>
          <div style={{ paddingTop: 8 }}>
            <h2>Reservation channels</h2>
            {this.renderTrips()}
          </div>
          <Divider></Divider>
        </Segment>
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
        <Segment>
          <div style={{ paddingTop: 8 }}>
            <h4>
              Metamask wallet with
              <Icon name="ethereum" color="" />
              required
            </h4>
            <p>
              To use the Crytolongtails reservation system, you will need to
              either:
            </p>
            <ul>
              <li>Sign into the metamask web extension on your desktop or</li>
              <li>
                Paste this page's link into the intergrated browser found on
                Metamask's mobile application
              </li>
            </ul>
          </div>
          <br></br>
          <div style={{ paddingTop: 8 }}>
            <h5>
              <Icon name="question circle" color="" />
              How to get started
            </h5>
            <p>
              <Icon name="arrow right" color="" />
              Refer to the links below to get started
            </p>
            <ul>
              <li>
                How to use -
                <a href="https://morgancsit.github.io/lba-frontend/how-to-use.html">
                  https://morgancsit.github.io/lba-frontend/how-to-use.html
                </a>
              </li>
              <li>
                Download Metamask -
                <a href="https://metamask.io/">https://metamask.io/</a>
              </li>
            </ul>
          </div>
        </Segment>
      </Layout>
    )
  }
}

export default TripIndex

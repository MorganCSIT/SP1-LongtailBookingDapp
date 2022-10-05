import React, { Component } from 'react'
import { Button, Card, Divider, Segment, Icon } from 'semantic-ui-react'
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
          <p style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
            {address.substring(1, 6)}
          </p>
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
        <Segment>
          <div style={{ paddingTop: 8 }}>
            <h3>
              <Icon name="warning" color="" />
              Metamask required
            </h3>
            <p>
              To use the Crytolongtails reservation system, you will need to
              either:
            </p>
            <p>1. Sign into the metamask web extension on your desktop or</p>
            <p>
              2. Use the mobile browser itergrated into the Metamask mobile
              application.
            </p>
          </div>
          <br></br>
          <div style={{ paddingTop: 8 }}>
            <h3>
              <Icon name="question" color="" />
              How to get started
            </h3>
            <p>
              How to use -
              <a href="https://morgancsit.github.io/lba-frontend/how-to-use.html">
                https://morgancsit.github.io/lba-frontend/how-to-use.html
              </a>
            </p>
            <p>
              Download Metamask -
              <a href="https://metamask.io/">https://metamask.io/</a>
            </p>
          </div>
        </Segment>
      </Layout>
    )
  }
}

export default TripIndex

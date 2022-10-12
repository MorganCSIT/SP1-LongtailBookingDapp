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
        description: (
          <div>
            <Link route={`/trips/${address}`}>
              <Button compact floated="left">
                <a>
                  <Icon name="sign-in" />
                  <a style={{ fontFamily: 'monospace' }}>
                    {address.substring(1, 6)}
                  </a>
                </a>
              </Button>
            </Link>
            <Link route={`/trips/${address}/Adventurer`}>
              <a>
                <Button floated="left" compact color="pink">
                  <Icon
                    style={{ marginLeft: 3 }}
                    size="standard"
                    name="user circle"
                  />
                </Button>
              </a>
            </Link>
            <Link route={`/trips/${address}/captain`}>
              <a>
                <Button floated="left" compact color="purple">
                  <Icon
                    name="anchor"
                    size="standard"
                    style={{ marginLeft: 3 }}
                  />
                </Button>
              </a>
            </Link>
          </div>
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
        <Link route="/trips/new">
          <Icon size="tiny" name="plus" color="" />
        </Link>
      </Layout>
    )
  }
}

export default TripIndex

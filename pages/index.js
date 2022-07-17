import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
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
        header: address,
        description: (
          <Link route={`/trips/${address}`}>
            <a>View Trip</a>
          </Link>
        ),
        fluid: true,
      }
    })

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Trips</h3>
          <Link route="/trips/new">
            <a>
              <Button
                floated="right"
                content="Create Trip"
                icon="add"
                primary
              />
            </a>
          </Link>
          {this.renderTrips()}
        </div>
      </Layout>
    )
  }
}

export default TripIndex

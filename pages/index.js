import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";

class TripIndex extends Component {
  static async getInitialProps() {
    const trips = await factory.methods.getDeployedTrips().call();

    return { trips };
  }

  renderTrips() {
    const items = this.props.trips.map((address) => {
      return {
        header: address,
        description: <a>View Trip</a>,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <link
            async
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
          />
          <script src="https://cdn.jsdelivr.net/npm/semantic-ui-react/dist/umd/semantic-ui-react.min.js"></script>
          <h3>Open Trips</h3>
          {this.renderTrips()}
          <Button content="Create Trip" icon="add" primary />
        </div>
      </Layout>
    );
  }
}

export default TripIndex;

import React, { Component } from "react";
import factory from "../ethereum/factory";

class TripIndex extends Component {
  static async getInitialProps() {
    const trips = await factory.methods.getDeployedTrips().call();

    return { trips };
  }

  render() {
    return <div>{this.props.trips[0]}</div>;
  }
}

export default TripIndex;

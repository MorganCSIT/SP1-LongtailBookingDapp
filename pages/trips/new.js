import React, { Component } from "react";
import { Form, Button, Input } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class TripNew extends Component {
  state = {
    boatPrice: "",
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await factory.methods.createTrip(this.state.boatPrice).send({
      from: accounts[0],
    });
  };

  render() {
    return (
      <Layout>
        <h3>Create a new trip</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Price of the trip</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.boatPrice}
              onChange={(event) =>
                this.setState({ boatPrice: event.target.value })
              }
            />
          </Form.Field>
          <Button primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default TripNew;

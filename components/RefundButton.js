import React, { Component } from 'react'
import { Table, Button, Grid } from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Trip from '../ethereum/trip'

class RefundButton extends Component {
  onRefund = async () => {
    const trip = Trip(this.props.address)

    const accounts = await web3.eth.getAccounts()
    await trip.methods.refund(this.address).send({
      from: accounts[0],
    })
  }

  render() {
    return (
      <Button color="green" basic onClick={this.onRefund}>
        Approve
      </Button>
    )
  }
}

export default RefundButton

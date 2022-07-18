import React, { Component } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
class BookForm extends Component {
  render() {
    return (
      <Form>
        <Form.Field>
          <label>Amount to Book</label>
          <Input label="wei" labelPosition="right" />
        </Form.Field>
        <Button primary>Book!</Button>
      </Form>
    )
  }
}

export default BookForm

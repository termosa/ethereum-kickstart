import React, { Component } from 'react'
import Layout from '../../../components/Layout'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import web3 from '../../../ethereum/web3'
import Campaign from '../../../ethereum/campaign'
import { Link, Router } from '../../../routes'

class NewRequest extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    errorMessage: '',
    loading: false
  }

  static async getInitialProps ({ query }) {
    return { address: query.address }
  }

  onSubmit = async event => {
    event.preventDefault()

    const campaign = Campaign(this.props.address)
    const { description, value, recipient } = this.state

    this.setState({ loading: true, errorMessage: '' })
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.createRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        recipient
      ).send({ from: accounts[0] })

      Router.pushRoute(`/campaigns/${this.props.address}/requests`)
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false })
  }

  render () {
    return (
      <Layout title="Create a Request" back={`/campaigns/${this.props.address}/requests`}>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })} />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })} />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={event => this.setState({ recipient: event.target.value })} />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button
            loading={this.state.loading}
            disabled={this.state.loading}
            primary>Create!</Button>
        </Form>
      </Layout>
    )
  }
}

export default NewRequest

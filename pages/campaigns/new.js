import React, { Component } from 'react'
import Layout from '../../components/Layout'
import { Button, Input, Message, Form } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault()
    this.setState({
      errorMessage: '',
      loading: true
    })
    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods.createCampaign(this.state.minimumContribution)
        .send({ from: accounts[0] })
      Router.pushRoute('/')
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false })
  }

  onChange = event => {
    this.setState({ minimumContribution: event.target.value })
  }

  render () {
    return (
      <Layout title="Create a Campaign">
        <Form
          onSubmit={this.onSubmit}
          error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              placeholder="ex: 100"
              value={this.state.minimumContribution}
              onChange={this.onChange} />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button
            loading={!!this.state.loading}
            disabled={this.state.loading}
            primary>Create</Button>
        </Form>
      </Layout>
    )
  }
}

export default CampaignNew

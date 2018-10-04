import React, { Component } from 'react'
import Layout from '../../../components/Layout'
import { Button, Table } from 'semantic-ui-react'
import { Link } from '../../../routes'
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'

const RequestRow = ({ request, index, address, approversCount, onApprove, onFinalize }) => (
  <Table.Row>
    <Table.Cell>{index}</Table.Cell>
    <Table.Cell>{request.description}</Table.Cell>
    <Table.Cell>{web3.utils.fromWei(request.value, 'ether')}</Table.Cell>
    <Table.Cell>{request.recipient}</Table.Cell>
    <Table.Cell>{request.approvalCount}/{approversCount}</Table.Cell>
    <Table.Cell>
      <Button color="green" basic onClick={onApprove}>Approve</Button>
    </Table.Cell>
    <Table.Cell>
      <Button color="orange" basic onClick={onFinalize}>Finalize</Button>
    </Table.Cell>
  </Table.Row>
)

class Requests extends Component {
  static async getInitialProps ({ query }) {
    const { address } = query
    const campaign = Campaign(address)
    const requestsCount = await campaign.methods.getRequestsCount().call()
    const approversCount = await campaign.methods.approversCount().call()

    const requests = await Promise.all(
      Array(parseInt(requestsCount)).fill().map((el, index) => {
        return campaign.methods.requests(index).call()
      })
    )

    return { address, requests, requestsCount, approversCount }
  }

  onApprove = async id => {
    const campaign = Campaign(this.props.address)
    const [account] = await web3.eth.getAccounts()
    await campaign.methods.approveRequest(id).send({ from: account })
  }

  onFinalize = async id => {
    const campaign = Campaign(this.props.address)
    const [account] = await web3.eth.getAccounts()
    await campaign.methods.finalizeRequest(id).send({ from: account })
  }

  render () {
    return (
      <Layout title="Requests">
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Add Request</Button>
          </a>
        </Link>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Recipient</Table.HeaderCell>
              <Table.HeaderCell>Approval Count</Table.HeaderCell>
              <Table.HeaderCell>Approve</Table.HeaderCell>
              <Table.HeaderCell>Finalize</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.requests.map(
              (request, index) => (
                <RequestRow key={index}
                  request={request}
                  id={index}
                  address={this.props.address}
                  approversCount={this.props.approversCount}
                  onApprove={() => this.onApprove(index)}
                  onFinalize={() => this.onFinalize(index)} />
              )
            )}
          </Table.Body>
        </Table>
      </Layout>
    )
  }
}

export default Requests

import React, { Component } from 'react'
import Layout from '../../components/Layout'
import ContributeForm from '../../components/ContributeForm'
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'
import { Button, Card, Grid } from 'semantic-ui-react'
import { Link } from '../../routes'

const Summary = ({
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager
}) => (
  <Card.Group items={[
    { header: manager,
      meta: 'Address of Manager',
      description: 'The manager created this campaign and can create requests to withdraw moeny',
      style: { overflowWrap: 'break-word' }
    },
    { header: minimumContribution,
      meta: 'Minimum Contribution (wei)',
      description: 'You must contribute at least this much wei to becom an approver'
    },
    { header: requestsCount,
      meta: 'Number of Requests',
      description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers'
    },
    { header: approversCount,
      meta: 'Number of Approvers',
      description: 'Number of people who habe already donated to this campaign'
    },
    { header: web3.utils.fromWei(balance, 'ether'),
      meta: 'Campaign Balance (ether)',
      description: 'The balance is how much money this campaign has left to spend'
    }
  ]} />
)

class CampaignShow extends Component {
  static async getInitialProps ({ query }) {
    const campaign = Campaign(query.address)
    const summary = await campaign.methods.getSummary().call()
    return {
      address: query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    }
  }

  render () {
    return (
      <Layout title="Campaign Page">
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Summary {...this.props} />
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

export default CampaignShow

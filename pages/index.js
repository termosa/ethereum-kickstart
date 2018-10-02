import React, { Component } from 'react'
import factory from '../ethereum/factory'
import { Button, Card } from 'semantic-ui-react'
import Layout from '../components/Layout'
import { Link } from '../routes'

const Campaigns = ({ campaigns }) => {
  const items = campaigns.map(address => ({
    header: address,
    description: (
      <Link route={`/campaigns/${address}`}>
        <a>View Campaign</a>
      </Link>
    ),
    fluid: true
  }))
  return <Card.Group items={items} />
}


class CampaignIndex extends Component {
  static async getInitialProps () {
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    return { campaigns }
  }

  render() {
    return (
      <Layout title="Open Campaigns">
        <Link route="/campaigns/new">
          <a>
            <Button
              content="Create Campaign"
              icon="add circle"
              floated="right"
              primary />
          </a>
        </Link>
        <Campaigns campaigns={this.props.campaigns} />
      </Layout>
    )
  }
}

export default CampaignIndex

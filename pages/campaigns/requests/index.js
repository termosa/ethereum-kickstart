import React, { Component } from 'react'
import Layout from '../../../components/Layout'
import { Button } from 'semantic-ui-react'
import { Link } from '../../../routes'

class Requests extends Component {
  static async getInitialProps ({ query }) {
    return { address: query.address }
  }

  render () {
    return (
      <Layout title="Requests">
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Add Request</Button>
          </a>
        </Link>
      </Layout>
    )
  }
}

export default Requests

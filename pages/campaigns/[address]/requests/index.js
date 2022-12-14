import React from "react"
import { Button, Table } from "semantic-ui-react"
import { useRouter } from "next/router"
import Link from "next/link"
import "semantic-ui-css/semantic.min.css"
import Layout from "../../../../components/Layout"
import { getCampaign } from "../../../../ethereum/campaign"
import RequestRow from "../../../../components/RequestRow"

const RequestIndex = ({ address, requests, requestCount, approversCount }) => {
  // const router = useRouter()
  // const { address } = router.query
  const { Header, Row, HeaderCell, Body } = Table

  const renderRows = () => {
    return requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={address}
          approversCount={approversCount}
        />
      )
    })
  }

  return (
    <Layout>
      <h3>Requests</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>

        <Body>{renderRows()}</Body>
      </Table>
      <div>Found {requestCount} requests</div>
    </Layout>
  )
}

RequestIndex.getInitialProps = async (props) => {
  const { address } = props.query
  const campaign = getCampaign(address)
  const requestCount = await campaign.methods.getRequestsCount().call()
  const approversCount = await campaign.methods.approversCount().call()

  const requests = await Promise.all(
    Array(Number(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call()
      })
  )

  // console.log(approversCount)

  return { address, requests, requestCount, approversCount }
}

export default RequestIndex

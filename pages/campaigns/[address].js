import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { Card, Grid, Button } from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"
import Layout from "../../components/Layout"
import { getCampaign } from "../../ethereum/campaign"
import web3 from "../../ethereum/web3"
import ContributeForm from "../../components/ContributeForm"

const CampaignShow = ({
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
}) => {
  const router = useRouter()
  const { address } = router.query

  // console.log(address)

  const renderCards = () => {
    const items = [
      {
        header: manager,
        meta: "Address of manager",
        description:
          "The manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract.  Requests must be approved by approvers",
      },
      {
        header: approversCount,
        meta: "Number of approvers",
        description:
          "Number of people who have already donated to this campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ETH)",
        description:
          "The balance is how much money this campaign has left to spend",
      },
    ]

    return <Card.Group items={items} />
  }

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <p>{address}</p>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>

          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${address}/requests`}>
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

CampaignShow.getInitialProps = async (props) => {
  const campaign = getCampaign(props.query.address)
  const summary = await campaign.methods.getSummary().call()

  return {
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  }
}

export default CampaignShow

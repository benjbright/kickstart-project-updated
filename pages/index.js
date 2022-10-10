// import Head from "next/head"
// import styles from "../styles/Home.module.css"
// import Web3 from "web3"
import React, { Component } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import "semantic-ui-css/semantic.min.css"
import { Card, Button } from "semantic-ui-react"
import factory from "../ethereum/factory"
import Layout from "../components/Layout"

const CampaignIndex = ({ campaigns }) => {
  const router = useRouter()
  // static async getInitialProps() {
  //   const campaigns = await factory.methods.getDeployedCampaigns().call()

  //   return { campaigns }
  // }

  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link href={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      }
    })

    return <Card.Group items={items} />
  }

  return (
    <div>
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Link href="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
                // onClick={() => router.push("/campaigns/new")}
              />
            </a>
          </Link>
          {renderCampaigns()}
        </div>
      </Layout>
    </div>
  )
}

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call()

  return { campaigns }
}

export default CampaignIndex

// To do list for the Campaign list page
// 1 - configure web3 with a provider from Metamask
// 2 - tell web3 that a deployed copy of the 'Campaign Factory' exists
// 3 - use Factory instance to retrieve a list of deployed campaigns
// 4 - use React to show something about each campaign

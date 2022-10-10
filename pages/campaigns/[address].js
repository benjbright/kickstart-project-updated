import React from "react"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"

const Campaign = () => {
  const router = useRouter()
  const { address } = router.query

  return (
    <Layout>
      <h3>Campaign: {address}</h3>
    </Layout>
  )
}

export default Campaign

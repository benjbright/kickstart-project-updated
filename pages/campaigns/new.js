import React, { Component, useState } from "react"
import { useRouter } from "next/router"
import { Form, Button, Input, Message } from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"
import Layout from "../../components/Layout"
import factory from "../../ethereum/factory"
import web3 from "../../ethereum/web3"

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  //   state = {
  //     minimumContribution: "",
  //     errorMessage: "",
  //     loading: false,
  //   }

  const onSubmit = async (event) => {
    // arrow function - this - avoids need for function binding
    event.preventDefault()

    // this.setState({ loading: true, errorMessage: "" })
    setLoading(true)
    setErrorMessage("")

    try {
      const accounts = await web3.eth.getAccounts()

      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      })

      //   Use dynamic routing available in Next.js v12
      router.push("/")
    } catch (error) {
      //   this.setState({ errorMessage: error.message })
      setErrorMessage(error.message)
      //   router.push("/")
    }

    // this.setState({ loading: false })
    setLoading(false)
  }

  //   render() {
  return (
    <Layout>
      <h3>Create a Campaign</h3>

      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(event) =>
              // this.setState({ minimumContribution: event.target.value })
              setMinimumContribution(event.target.value)
            }
          />
        </Form.Field>

        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  )
}

export default CampaignNew

import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { Form, Input, Message, Button } from "semantic-ui-react"
import { getCampaign } from "../ethereum/campaign"
import web3 from "../ethereum/web3"

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  //   console.log(address)

  const onSubmit = async (event) => {
    event.preventDefault()

    const campaign = getCampaign(address)
    // console.log(campaign)

    setLoading(true)
    setErrorMessage("")

    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      })

      router.replace(`/campaigns/${address}`)
    } catch (error) {
      setErrorMessage(error.message)
    }

    setLoading(false)
    setValue("")
  }

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage} />
      <Button primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  )
}
export default ContributeForm

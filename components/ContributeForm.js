import React, { useState } from "react"
import { Form, Input, Message, Button } from "semantic-ui-react"
import { getCampaign } from "../ethereum/campaign"

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState("")

  //   console.log(address)

  const onSubmit = (event) => {
    event.preventDefault()

    const campaign = getCampaign(address)
    console.log(campaign)
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Form.Field>
      <Button primary>Contribute!</Button>
    </Form>
  )
}
export default ContributeForm

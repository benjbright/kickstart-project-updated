import React from "react"
import { Table, Button } from "semantic-ui-react"
import web3 from "../ethereum/web3"
import { getCampaign } from "../ethereum/campaign"

const RequestRow = ({ id, request, address, approversCount }) => {
  const { Row, Cell } = Table

  const onApprove = async () => {
    const campaign = getCampaign(address)
    const accounts = await web3.eth.getAccounts()
    await campaign.methods.approveRequest(id).send({
      from: accounts[0],
    })
  }
  
  const onFinalize = async () => {
    const campaign = getCampaign(address)
    const accounts = await web3.eth.getAccounts()
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    })
  }

  return (
    <Row>
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount} / {approversCount}
      </Cell>
      <Cell>
        <Button color="green" basic onClick={onApprove}>
          Approve
        </Button>
      </Cell>
      <Cell>
        <Button color="teal" basic onClick={onFinalize}>
          Finalize
        </Button>
      </Cell>
    </Row>
  )
}

export default RequestRow

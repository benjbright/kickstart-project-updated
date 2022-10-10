import React from "react"
import { useRouter } from "next/router"
import { Menu, Icon } from "semantic-ui-react"

const Header = () => {
  const router = useRouter()

  return (
    <Menu style={{ marginTop: "10px" }}>
      <Menu.Item onClick={() => router.push("/")}>CrowdCoin</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item onClick={() => router.push("/")}>Campaigns</Menu.Item>
        <Menu.Item onClick={() => router.push("/campaigns/new")}>
          <Icon name="add circle" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
export default Header

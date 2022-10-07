# Ethereum and Solidity - The Complete Developer's Guide

## Kickstart project - updated version

This is my updated version of the final project in the excellent Stephen Grider course, using the current version of Next.js for the front end and hardhat / web3.js for the Ethereum part of the project.

## Ethereum project - notes and key learning points

### Campaign Contract

Variables

- manager (address) - address of the person managing this campaign
- minimumContribution (uint) - min donation required to be a contributor or approver
- approvers (mapping) - list of addresses for every person who has donated
- requests (Request[]) - list of requests that the manager has created, this is an array of type Request

Functions

- Campaign - constructor function that sets minimumContribution and the owner
- contribute - called when someone wants to donate money and become an approver
- createRequest - called by the manager to create a new spending request
- approveRequest - called by each contributor to approve a spending request
- finalizeRequest - after a request has enough approvals, manager calls this to send money to the vendor

Request Struct

- description, amount, recipient, complete, approvals, approvalCount
- includes an approvals mapping to track who has voted - keys are addresses, values are booleans

### Notes

#### Reference Types

- Fixed Array - contains a single type of element and has a fixed length
- Dynamic Array - contains a single type of element and can change in size over time
- Mapping - collection of key: value pairs - all keys / values must be of the same type
- Struct - collection of key: value pairs that can have different types

A struct is a new type or definition (as per address or uint), it is not an instance of a variable

Avoid working with arrays where possible - can be computationally expensive (i.e. looping)

- Array - linear time search
- Mapping - constant time search - takes same time regardless of entries in mapping

#### Storage and Memory

- sometimes references where our contract stores data

  - Storage - holds data between function calls (like a computer's hard drive)
  - Memory - temporary place to store data (like a computer's RAM)

- sometimes references how our solidity variables store values

  - function arguments are automatically assumed to be memory type variables
  - assumed that you want to make a copy (can add in the `memory` keyword to make clear)
  - use the `storage` keyword in the argument list - means do not make a copy of the array
  - makes the original array available to the function to modify

#### Mappings

- Mappings are a hash table data structure
- Keys are not stored - cannot access a list of keys as in Javascript
- Values are not iterable - cannot fetch all values, can only do a lookup of a value
- Only good for single value lookups
- "All values exist"

#### Struct initialization

- When initializing the properties of a struct, only have to initialize the value types
- Do not have to add code to initialize a reference type - like a mapping

### Campaign Factory solution

- Create a 'factory' contract - has a function to deploy a new instance of 'Campaign'
- User clicks 'Create Campaign'
- We instruct web3 / Metamask to show user a transaction that invokes 'Campaign Factory'
- User pays the deployment costs and the Factory deploys a new copy of 'Campaign'
- We tell 'Campaign Factory' to give us a list of all deployed campaigns
- 'Campaign Factory' is a one-time deployment

### CampaignFactory contract

Variables

- deployedCampaigns (address[]) - addresses of all deployed campaigns

Functions

- createCampaign - deploys a new instance of a Campaign and stores the resulting address
- getDeployedCampaigns - returns a list of all deployed campaigns

## Next.js Project - notes and key learning points

### Organising a Next.js project

- automatically creates a new folder `.next` - 'where the magic happens'
- understand how Next handles navigation or the creation of new pages in the application
- note the `pages` folder - React components are turned into a visitable web page
- e.g. new file `show.js` - React component - `crowdcoin.com/show`
- or `newcampaign.js` - React component - `crowdcoin.com/newcampaign`
- Next takes the file names and creates new routes / pages
- `index.js` is automatically the root route of our application

### Interacting with Ethereum (module 163)

- to interact with or access data from the Ethereum world we use web3.js and set up a provider
- the provider is what web3.js uses to communicate with some external Ethereum network
- in the short term rely on the provider automatically injected into the page by Metamask
- after set up web3 - access the deployed Campaign Factory contract
- this will return a contract instance that we can access to get a list of deployed campaigns
- note that this assumes that users have a Metamask wallet installed

### Why use Next.js? (module 169)

- Next.js uses 'server-side rendering' - the Next server renders the entire React app itself
- All of the JS code is executed on the Next server - it builds an HTML document then sends it to the browser
- The benefit is that users see the content much more quickly (especially if user on mobile)
- Next server sends down a completely rendered HTML document
- Next is much more flexible, particularly for mobile users with a poor connection
- After the Next server sends the HTML doc, it sends the Javascript code
- Once this code is loaded into the browser the React app boots up and takes over inside the browser
- Key idea being that before the React app takes over, already showing the HTML content on screen

#### Window error message (explained in module 169)

- Note that `window` is a global variable that is only available inside the browser
- `window` is not available on `node.js` which is where the Next server is running
- So when Next.js loads up our code to render our React app on the server, the window variable is not defined - this causes the error message `window is not defined`
- Whenever writing a React component - consider whether the code will be executed on the Next server - if it is cannot assume have access to certain objects or variables defined in the browser

### Metamask in the browser

- Many people do not have Metamask running in their browser - especially on mobile devices
- So, how do we ensure our application works for those people?
- So the big idea in using Next.js - when our code is rendered on the Next server, we will reach out to the Ethereum network and do some initial calls / data fetching
- Execute all of these requests from our server
- So when the server sends the HTML doc to the users browser it doesn't matter whether they are using Metamask or have access to an Ethereum network
- Have already taken care of data fetching for them - send an HTML document with all that information already contained inside
- So users not using Metamask will still see information on the screen - doesn't matter if they don't even realise that Ethereum exists

### Server vs client Web3 instances

- Note that the `web3.js` file is executed twice:

  1. First on the server to initially render the application
  2. Then inside the browser

- When it executes on the server the window global variable is not defined
- By running `typeof window` can check if running on the server or the browser (returns an object)
- In the browser - 'hijack' the Metamask provider and create our own instance of Web3
- Use the copy of Web3 that is injected into the browser by Metamask
- If on the server - need to make our own provider using the Infura remote node

### GetInitialProps function (module 172)

- We want to have Next.js perform our data fetching on the server
- Next does not execute the `ComponentDidMount` method on the server
- Have to move it to a different method - `GetInitialProps`
- This is not used in traditional React
- E.g. browser requests files - Next server will look at the `CampaignIndex` component and execute the `GetInitialProps` function tied to it
- Next will execute this function first - will return some initial data that we want
- Next will take this data and provide it to the `CampaignIndex` component as props (on the server)
- This component will then be rendered on the server, Next will take the HTML component and send it to our browser
- Note use of the `static` keyword - Next wants to retrieve our data without rendering the component as this is very computationally expensive
- The component is rendered both on the server and on the client

### Semantic UI React

- docs https://react.semantic-ui.com/
- install `npm install --save semantic-ui-react`
- need to install the CSS module as well `npm install --save semantic-ui-css`
- note the 'fluid' property on the Card component - takes up the width of its container
- Note need to install the minified CSS file as per the docs - in app's entry file
- `import 'semantic-ui-css/semantic.min.css'` in `index.js` (module 176)

=====================================================

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

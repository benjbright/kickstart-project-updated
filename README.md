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

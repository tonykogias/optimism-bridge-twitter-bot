# Optimism Bridge Twitter Bot

## About

This is a twitter bot that tweets activity from and to Optimism Mainnet. It keeps track of events emmited when a user initiates a deposit/withdraw of ETH using the Optimism Standard Bridge or HOP Protocol. If the sending value is higher than 1 ETH then the bot posts a tweet containing information about the transaction and a link to the appropriate explorer.

## Run locally

In order to run the script locally you will need to install all the dependancies and edit the `.env.example` with the appropriate values.

```bash
# Install dependencies
yarn install

# Update environment variables
cp .env.example .env
vim .env

# Run
npx ts-node src/main.ts
```



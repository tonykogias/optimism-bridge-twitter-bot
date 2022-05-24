import { ethers, BigNumber } from 'ethers'
import { getContracts } from './utils/contracts'
import { 
	OP_L2_ETH_TOKEN_ADDR,
	ETHERSCAN_LINK,
	OP_ETHERSCAN_LINK,
	MIN_AMOUNT,
	OP_CHAIN_ID
} from './utils/constants'
import { getClient, postTweet } from './utils/twitter-api'
import express, { Express } from 'express'

enum TransactionType {
	DEPOSIT = "deposit",
	WITHDRAW = "withdraw"
}

enum Bridge {
	OP = "Optimism Standard Bridge",
	HOP = "HOP Bridge"
}

const app: Express = express();
const port = process.env.PORT || 5000;

const main = () => {
	const contracts = getContracts();
	const client = getClient();

	contracts.OPL1Contract.on("ETHDepositInitiated", async (
		from: string,
		to: string,
		amount: BigNumber,
		data: any,
		event: any
	) => {

		let _amount:string = ethers.utils.formatEther(amount.toString());

		if(parseFloat(_amount) > MIN_AMOUNT){
			let link = ETHERSCAN_LINK.concat(event.transactionHash);
			await postTweet(client, _amount, link, TransactionType.DEPOSIT, Bridge.OP);
		}
	})

	contracts.OPL2Contract.on("WithdrawalInitiated", async (
		l1Token: string,
		l2Token: string,
		from: string,
		to: string,
		amount: BigNumber,
		data: any,
		event: any
	) => {

		let _amount:string = ethers.utils.formatEther(amount.toString());

		if(l2Token == OP_L2_ETH_TOKEN_ADDR && parseFloat(_amount) > MIN_AMOUNT) {
			let link = OP_ETHERSCAN_LINK.concat(event.transactionHash);
			await postTweet(client, _amount, link, TransactionType.WITHDRAW, Bridge.OP);
		}
	})

	contracts.HOPL1Contract.on("TransferSentToL2", async (...args: any[]) => {
		// first argument of is chainid
		if(args[0].toString() == OP_CHAIN_ID){
			// third argument is amount to send
			let _amount:string = ethers.utils.formatEther(args[2].toString());
			
			if(parseFloat(_amount) > MIN_AMOUNT) {
				let txHash = args[args.length - 1].transactionHash;
				let link = ETHERSCAN_LINK.concat(txHash);
				await postTweet(client, _amount, link, TransactionType.DEPOSIT, Bridge.HOP);
			}
		}
	})

	contracts.HOPL2Contract.on("WithdrawalBonded", async (...args: any[]) => {
		// second argument is amount to withdraw
		let _amount:string = ethers.utils.formatEther(args[1].toString());
		
		if(parseFloat(_amount) > MIN_AMOUNT) {
			let txHash = args[args.length - 1].transactionHash;
			let link = OP_ETHERSCAN_LINK.concat(txHash);
			await postTweet(client, _amount, link, TransactionType.WITHDRAW, Bridge.HOP);
		}
	})
}

app.listen(port, () => {
	console.log(`Listening on port ${port}....`);
	try{
		main();
	}catch(e) {
		console.log(e);
	}
});
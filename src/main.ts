import { ethers, BigNumber } from 'ethers'
import { getContracts } from './utils/contracts'
import { 
	OP_L2_ETH_TOKEN_ADDR,
	ETHERSCAN_LINK,
	OP_ETHERSCAN_LINK,
	MIN_AMOUNT
} from './utils/constants'
import { getClient, postTweet } from './utils/twitter-api'

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

		let _amount:string = ethers.utils.formatEther(amount.toNumber());

		if(Number(amount) > MIN_AMOUNT){
			let link = ETHERSCAN_LINK.concat(event.transactionHash);
			await postTweet(client, _amount, link, "deposit");
		}
		console.log("amount deposit: ", _amount);
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

		let _amount:string = ethers.utils.formatEther(amount.toNumber());

		if(l2Token == OP_L2_ETH_TOKEN_ADDR && Number(_amount) > MIN_AMOUNT) {
			let link = OP_ETHERSCAN_LINK.concat(event.transactionHash);
			await postTweet(client, _amount, link, "withdraw");
		}
		console.log("amount withdraw: ", _amount);
	})
}

main();

import { ethers, BigNumber } from 'ethers'
import { getContracts } from './utils/contracts'
import { getClient, postTweet } from './utils/twitter-api'

const main = () => {
	const contracts = getContracts();
	const client = getClient();

	contracts.OPL1Contract.on("ETHDepositInitiated", (from: string, to: string, value: BigNumber, data: any) => {
		console.log("found event with from value: ", from);
		console.log("found event with to value: ", to);
		console.log("found event with value value: ", ethers.utils.formatEther(value.toString()));
		console.log("found event with data value: ", data);
	})

	contracts.OPL2Contract.on("DepositFinalized", (_l1Token: string, _l2Token: string, _from: string, _to: string, _amount: BigNumber, _data: any) => {
		console.log("found event with _l1Token value: ", _l1Token);
		console.log("found event with _l2Token value: ", _l2Token);
		console.log("found event with _from value: ", _from);
		console.log("found event with _to value: ", _to);
		console.log("found event with _amount value: ", ethers.utils.formatEther(_amount.toString()));
		console.log("found event with _data value: ", _data);
	})

}

main();
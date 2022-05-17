import { getContracts } from './utils/contracts'
import { TwitterApi, TweetV2PostTweetResult} from 'twitter-api-v2'
import dotenv from 'dotenv';
dotenv.config()

const postTweet = async () => {
	const twitterClient = new TwitterApi({
		appKey: process.env.TWITTER_API_KEY,
		appSecret: process.env.TWITTER_API_SECRET,
		accessToken: process.env.TWITTER_ACCESS_TOKEN,
		accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

	console.log("clinet: ", twitterClient);

	let res 
	try{
		res = await twitterClient.v2.tweet('Yo!');
	}catch(err){
		console.log(err);
	}

	return res;
}

const main = () => {
	const contracts = getContracts();

	postTweet();

	contracts.OPL1Contract.on("ETHDepositInitiated", (from, to, value, event) => {
		console.log("found event with from value: ", from);
		console.log("found event with to value: ", to);
		console.log("found event with value value: ", value);
		console.log("found event with event value: ", event);
	})

	contracts.OPL2Contract.on("DepositFinalized", (_l1Token, _l2Token, _from, _to, _amount, _data) => {
		console.log("found event with _l1Token value: ", _l1Token);
		console.log("found event with _l2Token value: ", _l2Token);
		console.log("found event with _from value: ", _from);
		console.log("found event with _to value: ", _to);
		console.log("found event with _amount value: ", _amount);
		console.log("found event with _data value: ", _data);
	})

}

main();
import { TwitterApi, TweetV2PostTweetResult} from 'twitter-api-v2'
import { ETHERSCAN_LINK } from './constants'
import dotenv from 'dotenv'
dotenv.config()

export const getClient = ():any => {
	const twitterClient = new TwitterApi({
		appKey: process.env.TWITTER_API_KEY,
		appSecret: process.env.TWITTER_API_SECRET,
		accessToken: process.env.TWITTER_ACCESS_TOKEN,
		accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

	return twitterClient;
}

export const postTweet = async (client: any, amount: string, link: string, type: string) => {
	try{
		await client.v2.tweet(
			`A ${type} of ${amount} ETH was initialized to Optimism through Optimism Standard Bridge.\n ${link}`
		);
	}catch(error){
		// TODO: Send me a notification if there is an error with slack/telegram
		console.log("Error on tweeting: ", error);
	}	
}
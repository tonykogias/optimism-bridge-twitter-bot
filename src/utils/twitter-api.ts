import { TwitterApi, TweetV2PostTweetResult} from 'twitter-api-v2'
import dotenv from 'dotenv';
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

export const postTweet = async (client: any, amount: number) => {
	try{
		await client.v2.tweet(`A deposit of ${amount} ETH was initialized to Optimism through Optimism Standard Bridge`);
	}catch(error){
		console.log("Error on tweeting: ", error);
	}	
}
import express from 'express';
import cors from 'cors';

import tweets from "./assets/tweets.js"
import users from "./assets/users.js"

const app = express();
app.use(cors());

app.get('/tweets', (_, res) => {
    const lastTweets = tweets.slice(-10).reverse();

    const tweetsWithAvatar = lastTweets.map(tweetWithoutAvatar => {
        const tweetUser = users.find(user => user.username === tweetWithoutAvatar.username);
        const object = {
            ...tweetUser,
            tweet: tweetWithoutAvatar.tweet
        }

        return object;
    });
    res.send(tweetsWithAvatar);
});

app.listen(5000, () => {
    console.log("Server running in port: 5000");
});

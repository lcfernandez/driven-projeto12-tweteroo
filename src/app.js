import express from "express";
import cors from "cors";

import tweets from "./assets/tweets.js"
import users from "./assets/users.js"

const app = express();
app.use(cors());

app.get("/tweets", (req, res) => {
    const lastTweets = tweets.slice(-10).reverse();
    const tweetsWithAvatar = lastTweets.map(tweet => {
        const tweetUser = users.find(user => user.username === tweet.username);

        return {
            ...tweetUser,
            tweet: tweet.tweet
        };
    });

    res.send(tweetsWithAvatar);
});

app.post("/sign-up", (req, res) => {
    users.push(req.body);
    res.send("OK");
});

app.listen(5000, () => {
    console.log("Server running in port: 5000");
});

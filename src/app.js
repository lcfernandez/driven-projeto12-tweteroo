import express from "express";
import cors from "cors";

import tweets from "./assets/tweets.js"
import users from "./assets/users.js"


// instance of express
const app = express();


// configs
app.use(cors());
app.use(express.json());


// GET function
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


// POST functions
app.post("/sign-up", (req, res) => {
    users.push(req.body);

    res.send("OK");
});

app.post("/tweets", (req, res) => {
    tweets.push(req.body);

    res.send("OK");
}); 


// starts the server
app.listen(5000, () => console.log(`Server running in port: ${5000}`));

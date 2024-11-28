import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// GraphQL 스키마 정의

let tweets = [
    {
        id: "1",
        text: "first one!",
        userId: "2",
    },
    {
        id: "2",
        text: "second one",
        userId: "1",
    },
];
let users = [
    {
        id: "1",
        firstName: "changwan",
        lastName: "An",
        fullName:"An changwan"
    },
    {
        id: "2",
        firstName: "minju",
        lastName: "Kim",
        fullName:"Kim minJu"
    }
]

const typeDefs = `
    type User {
        id: ID!,
        firstName: String,
        lastName: String,
        fullName: String,
    }
    type Tweet {
        id: ID,
        text: String,
        author: User,
    }
    type Query {
       allTweets: [Tweet],
       tweet(userId: ID!): Tweet,
       allUsers: [User],
       ping: String
    }
    type Mutation {
        postTweet(userId: ID!, text: String!): Tweet,
        updateTweet(userId: ID!, text: String!): Tweet,
        deleteTweet(userId: ID!): Boolean
    }
`;

const resolvers = {
    Query: {
        allTweets: () => tweets,
        tweet(root, {userId}) {
            console.log(userId);
            return tweets.find(tweet => tweet.id === userId);
        },
        ping(){
            return "pong";
        },
        allUsers(){
            return users;
        },

    },
    Mutation:{
        postTweet(root, {userId, text}){
            const newTweet = {
                id: tweets.length + 1,
                text
            }
            tweets.push(newTweet);
            return newTweet;
        },
        updateTweet(_,{userId, text}){
            tweets = tweets.filter(tweet => tweet.id !== userId);

            const newTweet = {
                id: userId,
                text,
                userId
            };
            tweets.push(newTweet);
            tweets.sort((a,b) => a.id - b.id);
            return tweets;
        },
        // 변수명 통일 typedef === resolvers
        deleteTweet(_, { userId }) {
            const tweet = tweets.find((tweet) => tweet.id === userId);
            if (!tweet) return false;
            tweets = tweets.filter((tweet) => tweet.id !== userId);
            return true;
        },
    },
    Tweet: {
        author({userId} ) {
            return users.find((user) => user.id === userId);
        },
    },
    User:{
        fullName(){
            return "hello";
        }
    }

};

// type 변수명과 resolve 변수명 통일

const server = new ApolloServer({
    typeDefs,
    resolvers
});

// 서버 실행
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
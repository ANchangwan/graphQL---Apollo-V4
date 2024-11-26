import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// GraphQL 스키마 정의

let tweets = [
    {
        id: "1",
        text: "This is the first query",
        author: {
            id: "1",
            name: "changwan"
        },
    },
    {
        id: "2",
        text: "This is the second query",
        author: {
            id: "2",
            name: "changwan2"
        }
    }
]

const typeDefs = `
    type User {
        id: ID,
        name: String,
    }
    type Tweet {
        id: ID,
        text: String,
        author: User
    }
    type Query {
       allTweets: [Tweet],
       tweet(id: ID!): Tweet,
       ping: String
    }
    type Mutation {
        postTweet(userId: ID!, text: String!): Tweet,
        deleteTweet(userId: ID!): Boolean
    }
`;

const resolvers = {
    Query: {
        allTweets: () => tweets,
        tweet(root, {id}){
            console.log(id);
            return tweets.find(tweet => tweet.id === id);
        },
        ping(){
            return "pong";
        }
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
        deleteTweet(_, { Id }) {
            const tweet = tweets.find((tweet) => tweet.id === Id);
            if (!tweet) return false;
            tweets = tweets.filter((tweet) => tweet.id !== Id);
            return true;
        },
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
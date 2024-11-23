import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// GraphQL 스키마 정의


const typeDefs = `
    type Tweet {
        id:ID,
        text: String
    }
    type Query {
       getTweet: Tweet
    }
`;

const resolvers = {
    Query: {
        getTweet: () => ({
            id : 1,
            text: "This is a sample tweet",
        })
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// 서버 실행
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);

// ✍️ 주요 변경 사항
// apollo-server 대신 @apollo/server 패키지를 사용합니다
// ApolloServer 클래스를 사용하여 서버 인스턴스를 생성합니다.
// startStandaloneServer 함수를 사용하여 서버를 시작합니다.
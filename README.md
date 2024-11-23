<h1>Apollo Server v4</h1>

🧑‍💻패키지 설치<br>
npm install @apollo/server graphql

// 서버 설정:
```javascript
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
    type Tweet {
        id:Number
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

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
context: async ({ req }) => ({ token: req.headers.token }),
listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
```
✍️ 주요 변경 사항<br>
apollo-server 대신 @apollo/server 패키지를 사용합니다.<br>
ApolloServer 클래스를 사용하여 서버 인스턴스를 생성합니다.<br>
startStandaloneServer 함수를 사용하여 서버를 시작합니다.<br>

이제는 typeDefs gql를 사용하지 않습니다.<br>
startStandaloneServer를 이용해서 apollo server를 시작할 수 있습니다.
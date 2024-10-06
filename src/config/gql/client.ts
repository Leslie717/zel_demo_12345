import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import awsconfig from '../aws/aws-exports';

const httpLink = createHttpLink({
    uri: awsconfig.aws_appsync_graphqlEndpoint, // NB: Was not able to connect to this server. Run locally to check out App UI
    // uri: 'http://192.168.1.19:9002/graphql', // NB: Developed app using local server
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    headers: {
        'x-api-key': awsconfig.aws_appsync_apiKey,
    },
});

export default client;
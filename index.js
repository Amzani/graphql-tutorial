'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
//const { graphql, buildSchema } = require('graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLID,
} = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
    name: 'Video',
    description: 'A Video example',
    fields: {
        id: {
            type: GraphQLID,
            description: 'The ID of the Video'
        },
        title: {
            type: GraphQLString,
            description: 'The title of the Video'
        },
        duration: {
            type: GraphQLInt,
            description: 'The Video duration'
        },
        watched: {
            type: GraphQLBoolean,
            description: 'Is the video watched'
        },
    }
})
const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        video: {
            type: videoType,
            resolve: () => new Promise((resolve) => {
                resolve({
                    id: 'a',
                    title: 'GraphQL',
                    duration: 350,
                    watched: true,
                });
            }),
        },
    },
});
const schema = new GraphQLSchema({
    query: queryType,
});



const VideoA = {
    id: 'a',
    title : 'Create a GraphQL Schema',
    duration: 120,
    watched: true
};

const VideoB = {
    id: 'a',
    title : 'EmbedJS CLI',
    duration: 260,
    watched: false
};

const videos = [VideoA, VideoB];



server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

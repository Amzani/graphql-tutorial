'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
//const { graphql, buildSchema } = require('graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLID,
} = require('graphql');

const { getVideoById, getVideos } = require('./src/data');

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
        videos: {
            type: new GraphQLList(videoType),
            resolve: getVideos,
        },
        video: {
            type: videoType,
            args: {
                id : {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'The id of the video,',
                },
            },
            resolve: (_, args) => {
                return getVideoById(args.id);
            },
        },
    },
});
const schema = new GraphQLSchema({
    query: queryType,
});


server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

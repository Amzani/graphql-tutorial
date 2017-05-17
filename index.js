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

const { getVideoById, getVideos, createVideo } = require('./src/data');

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
});

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

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root mutation type',
    fields: {
        createVideo: {
            type: videoType,
            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'The title of the video',
                },
                duration: {
                    type: new GraphQLNonNull(GraphQLInt),
                    description: 'The duration of the video',
                },
                released: {
                    type: new GraphQLNonNull(GraphQLBoolean),
                    description: 'The release date of a video',
                },
            },
            resolve: (_, args) => {
                console.log(args);
                return createVideo(args);
            },
        },
    },
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
});


server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

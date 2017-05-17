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

const getVideoById = (id) => new Promise((resolve) => {
    const [video] = videos.filter((video) => {
        return video.id == id;
    });
    resolve(video);
});

const getVideos = () => new Promise((resolve) => {
    resolve(videos);
});

exports.getVideoById = getVideoById;
exports.getVideos = getVideos;

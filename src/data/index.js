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

const createVideo = ({title, duration, released}) => {
    const video = {
        id: (new Buffer(title, 'utf8')).toString('base64'),
        title,
        duration,
        released
    };
    videos.push(video);
    console.log(video);
    return (video);
};

exports.getVideoById = getVideoById;
exports.getVideos = getVideos;
exports.createVideo = createVideo;

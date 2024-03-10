const Post = require('../models/Post');

class PostService {
    async createPost(userId, content, images) {
        const post = new Post({ userId, content, images });
        if(!await post.save()){
            return {
                success: false,
                status: 500,
                message: 'Internal server error.',
            }
        }
        return {
            success: true,
            status: 200,
            message: 'New post uploaded.',
            data: post
        }
    }
}

module.exports = PostService;

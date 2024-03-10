const PostService = require('../services/postService');
const multer = require('multer');

const postService = new PostService();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'postsImages'); // Save files to the postsImages folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).array('images', 5);

module.exports = {
    createPost: async (req, res, next) => {
        try {
            upload(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    console.error('Error uploading files:', err);
                    return res.status(400).json({ message: 'Error uploading files' });
                } 
                else if (err) {
                    console.error('Error uploading files:', err);
                    return res.status(400).json({ message: 'Error uploading files' });
                }

                const { userId, content } = req.body;
                let images = [];
                if (req.files) {
                    images = req.files.map(file => file.filename);
                }

                await postService.createPost(userId, content, images)
                .then((response) => {
                    if(response.success){
                        console.log(response);
                        res.status(response.status).json({
                            message: response.message,
                            data: response.data
                        });
                    }
                    else{
                        console.log(response.message);
                        res.status(response.status).json({
                            message: response.message
                        });
                    }
                })
            });
        } 
        catch (error) {
            console.error('Error creating post:', error);
            next(error);
        }
    }
};

const MatchService = require('../services/matchService');

const matchService = new MatchService(); 

module.exports = {
    sendMatchRequest: async (req, res, next) => {
        try {
            const { senderId, receiverId } = req.body;
            await matchService.sendMatchRequest(senderId, receiverId)
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
        } catch (error) {
            next(error);
        }
    },

    acceptMatchRequest: async (req, res, next) => {
        try {
            const { matchRequestId } = req.params;
            await matchService.acceptMatchRequest(matchRequestId)
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
        } catch (error) {
            next(error);
        }
    },

    rejectMatchRequest: async (req, res, next) => {
        try {
            const { matchRequestId } = req.params;
            await matchService.rejectMatchRequest(matchRequestId)
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
        }
        catch (error) {
            next(error);
        }
    }
};

const MatchRequest = require('../models/Match');

class MatchService {
    async sendMatchRequest(senderId, receiverId){
        const matchRequest = new MatchRequest({ senderId, receiverId, status: 'pending' });
        if(!await matchRequest.save()){
            return {
                success: false,
                status: 500,
                message: 'Internal server error.',
            }
        }
        return {
            success: true,
            status: 200,
            message: 'Match request sent.',
            data: matchRequest
        }
    }

    async acceptMatchRequest(matchRequestId) {
        const matchRequest = await MatchRequest.findById(matchRequestId);
        if (!matchRequest) {
            return {
                success: false,
                status: 401,
                message: 'Match request not found.',
            }
        }
        matchRequest.status = 'matched';
        if(!await matchRequest.save()){
            return {
                success: false,
                status: 500,
                message: 'Internal server error.',
            }
        }
        return {
            success: true,
            status: 200,
            message: 'Match request accepted.',
            data: matchRequest
        }
    }

    async rejectMatchRequest(matchRequestId) {
        const matchRequest = await MatchRequest.findById(matchRequestId);
        if (!matchRequest) {
            return {
                success: false,
                status: 401,
                message: 'Match request not found.',
            }
        }
        matchRequest.status = 'rejected';
        if(!await matchRequest.save()){
            return {
                success: false,
                status: 500,
                message: 'Internal server error.',
            }
        }
        return {
            success: true,
            status: 200,
            message: 'Match request rejected.',
            data: matchRequest
        }
    }
}

module.exports = MatchService;

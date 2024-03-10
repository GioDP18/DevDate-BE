const AuthService = require('../services/authService');

const authService = new AuthService(); 

module.exports = {
    register: async (req, res, next) => {
        try {
            await authService.register(res, req.body)
            .then((response) => {
                if(response.success){
                    console.log(response);
                    res.status(response.status).json({
                        message: response.message,
                        token: response.token
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
        catch (err) {
            next(err);
        }
    },
    
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            await authService.login(res, email, password)
            .then((response) => {
                if(response.success){
                    console.log(response);
                    res.status(response.status).json({
                        message: response.message,
                        token: response.token
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
        catch (err) {
            next(err);
        }
    }
};

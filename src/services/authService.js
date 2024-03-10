const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
    async register(res, userData) {
        try {
            if (!userData.password) {
                return {
                    success: false,
                    status: 401,
                    message: 'Password is required.',
                }
            }
    
            if (userData.password.length < 6) {
                return {
                    success: false,
                    status: 401,
                    message: 'Password must be at least 6 characters long.',
                }
            }
    
            userData.password = await bcrypt.hash(userData.password, 10);
            const newUser = new User(userData);
            if(!await newUser.save()){
                return {
                    success: false,
                    status: 500,
                    message: 'Internal server error.',
                }
            }

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            res.setHeader('Authorization', `Bearer ${token}`);
            return {
                success: true,
                status: 200,
                message: 'Successfully registered.',
                token: token
            }
        } 
        catch (error) {
            throw error;
        }
    }


    async login(res, email, password) {
        try{
            const user = await User.findOne({ email });
            if (!user) {
                return {
                    success: false,
                    status: 401,
                    message: 'user not found.',
                }
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return {
                    success: false,
                    status: 401,
                    message: 'Invalid credentials.'
                }
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.setHeader('Authorization', `Bearer ${token}`);
            return {
                success: true,
                status: 200,
                message: 'Login successfully.',
                token: token
            }
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService;
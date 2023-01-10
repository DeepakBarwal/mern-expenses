import User from '../models/User.js'

export const index = (req, res) => {
    return res.json({user: req.user});
};
import User from '../models/User.js';

export const destroy = async (req, res) => {
    const categories = req.user.categories;
    const newCategories = categories.filter(category => category._id != req.params.id);
    const user = await User.updateOne({_id: req.user._id}, {$set: {categories: newCategories}});
    return res.json({user});
};
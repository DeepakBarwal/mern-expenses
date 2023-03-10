import Transaction from "../models/Transaction.js";

export const index = async (req, res) => {
    try {
        const transaction = await Transaction.find({user_id: req.user._id}).sort({createdAt: -1});
        res.json({message: 'success', data: transaction});
    } catch (error) {
        console.error(error.message);
        res.json({message: 'failed'});
    }
};

export const create = async (req, res) => {
    const {amount, description, date, category_id} = req.body;
    try {
        const transaction = new Transaction({
            amount, description, date, user_id: req.user._id,
            category_id,
        });
        const savedTransaction = await transaction.save();
        res.status(201).json({message: 'success', transaction: savedTransaction });
    } catch (error) {
        console.error(error.message);
        res.status(201).json({message: 'failed'});
    }
};

export const remove = async (req, res) => {
    const {id} = req.params;
    try {
        const transaction = await Transaction.findOneAndDelete({_id: id});
        res.json({message: 'success', transaction});
    } catch (error) {
        console.error(error.message);
        res.status(201).json({message: 'failed'});
    }
};

export const update = async (req, res) => {
    const {id} = req.params;
    try {
        const transaction = await Transaction.findOneAndUpdate({_id: id}, {$set: req.body});
        res.json({message: 'success', transaction});
    } catch (error) {
        console.error(error.message);
        res.status(201).json({message: 'failed'});
    }
};
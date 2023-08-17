const userIdValidator = (req, res, next) => {
    const { id } = req.body;

    if (!id || typeof id !== 'number' || id <= 0) {
        return res.status(400).json({ error: 'Invalid ID.' });
    } else {
        next();
    };
};

module.exports = userIdValidator;
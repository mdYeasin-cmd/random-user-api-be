const saveRouteValidator = (req, res, next) => {
    const { id, gender, name, contact, address, photoUrl } = req.body;

    if (!id || typeof id !== 'number' || id <= 0) {
        return res.status(400).json({ error: 'Invalid ID.' });
    } else if (!gender || (gender !== 'Male' && gender !== 'Female')) {
        return res.status(400).json({ error: 'Invalid gender.' });
    } else if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Invalid name.' });
    } else if (!contact || typeof contact !== 'string' || !/^\d{11}$/.test(contact)) {
        return res.status(400).json({ error: 'Invalid contact number.' });
    } else if (!address || typeof address !== 'string' || address.trim() === '') {
        return res.status(400).json({ error: 'Invalid address.' });
    } else if (!photoUrl || typeof photoUrl !== 'string' || !/^https?:\/\/\S+$/.test(photoUrl)) {
        return res.status(400).json({ error: 'Invalid photo URL.' });
    }

    next();
};

module.exports = saveRouteValidator;
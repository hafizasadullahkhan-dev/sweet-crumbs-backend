const menu = require('../data/menu.json');

exports.getMenu = (req, res) => {
    res.status(200).json(menu);
};
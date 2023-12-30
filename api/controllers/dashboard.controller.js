const db = require('../repository');

module.exports = {
 getCounts: async (req, res) => {
    res.send(await db.getCounts());
  }
};

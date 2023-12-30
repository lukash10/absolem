const db = require('../repository');

module.exports = {
  findListAndOne: async (req, res) => {
    const id = req.query.id;
    const idCategory = req.query.idCategory;

    if (id) {
      res.send(await db.findOneTag(id));
      return;
    }

    res.send(await db.findAllTags(idCategory));
  },
  create: async (req, res) => {
    const tag = req.body;

    const result = await db.createTag(tag);

    res.send(result);
  },
  delete: async (req, res) => {
    const id = req.params.id;

    const result = await db.deleteTag(id);

    res.send({ result });
  },
  edit: async (req, res) => {
    const id = req.params.id;
    const tag = req.body;

    const result = await db.updateTag(id, tag);

    res.send(result);
  },
};

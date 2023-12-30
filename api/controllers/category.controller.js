const db = require('../repository');

module.exports = {
  async getCategoryName(req, res) {
    const categoryId = req.params.categoryId;
    console.log("categoryId", categoryId);

    try {
      // Substitua esta lógica pela forma como você obtém o nome da categoria pelo ID
      const category = await db.findOneCategory(categoryId);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.json({ categoryName: category.name }); // Supondo que o nome da categoria seja "name"
    } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  findListAndOne: async (req, res) => {
    const id = req.query.id;

    if (id) {
      res.send(await db.findOneCategory(id));
      return;
    }

    res.send(await db.findAllCategories());
  },
  create: async (req, res) => {
    const tag = req.body;

    const result = await db.createCategory(tag);

    res.send(result);
  },
  delete: async (req, res) => {
    const id = req.params.id;

    const result = await db.deleteCategory(id);

    res.send({ result });
  },
  edit: async (req, res) => {
    const id = req.params.id;
    const tag = req.body;

    const result = await db.updateCategory(id, tag);

    res.send(result);
  },
};

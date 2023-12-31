const db = require('../repository');

module.exports = {

  findListAndOne: async (req, res) => {
    
    const id = req.query.id;
    const categoryId = req.query.categoryId;
    const tagId = req.query.tagId;
    const promotion = req.query.promotion;
    const disabled = req.query.disabled;

    console.log("REQ", req.query);
    

    if (id) {
      res.send(await db.findOneProduct(id));
      return;
    }
    // Se promotion for passado como 'true', desativado ou indefinido, mantém o valor 'true'
    const isPromotion = promotion === 'true' ? 'false' : undefined;

    res.send(await db.findAllProducts(tagId, categoryId, isPromotion, disabled));

    //res.send(await db.findAllProducts(tagId, categoryId, promotion, disabled));
  },
  create: async (req, res) => {
    const product = req.body;

    const result = await db.createProduct(product);

    res.send(result);
  },
  delete: async (req, res) => {
    const id = req.params.id;

    const result = await db.deleteProduct(id);

    res.send({ result });
  },
  edit: async (req, res) => {
    const id = req.params.id;
    const product = req.body;

    const result = await db.updateProduct(id, product);

    res.send(result);
  }
};

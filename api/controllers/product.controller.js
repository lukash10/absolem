const db = require('../repository');

module.exports = {

  findListAndOne: async (req, res) => {
    
    const id = req.query.id;
    const categoryId = req.query.categoryId;
    const tagId = req.query.tagId;
    const promotion = req.query.promotion;
    const disabled = req.query.disabled;
    const page = parseInt(req.query.page); // Número da página, padrão é 1
    const pageSize = parseInt(req.query.pageSize); // Quantidade de itens por página, padrão é 10

    if (id) {
      res.send(await db.findOneProduct(id));
      return;
    }
    // Se promotion for passado como 'true', desativado ou indefinido, mantém o valor 'true'
    const isPromotion = promotion === 'true' ? 'false' : undefined;
    const offset = (page - 1) * pageSize;

    console.log("Offset", offset);
    console.log("pageSize", pageSize);

    const products = await db.findAllProducts(tagId, categoryId, isPromotion, disabled, offset, pageSize);
            
    // Realize a contagem total de produtos
    const totalCount = await db.countAllProducts(tagId, categoryId, isPromotion, disabled);

    const result = {
        products,
        totalCount
    };

    console.log("totalCOunt", totalCount);

    res.send(result);
    

  },
  findByTitle: async (req, res) => {

    const productName = req.params.productName;

    console.log("productName", productName);

    try {
      // Chame a função do seu módulo de banco de dados para encontrar produtos por título
      const product = await db.findByTitle(productName);
  
      // Se o produto for encontrado, retorne-o
      if (product) {
        res.json({ product });
      } else {
        res.status(404).json({ error: 'Produto não encontrado' });
      }
    }catch (error) {
      console.error('Erro ao encontrar produto por título:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }

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

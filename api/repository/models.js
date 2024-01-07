const { sequelize, db } = require('../config/sequelize.js');

const generateModels = (model, dataTypes) => {
  
  const User = model.define('users', {
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    }
  });

  const Product = model.define('products', {
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: dataTypes.STRING,
      allowNull: false
    },
    description: {
      type: dataTypes.TEXT
    },
    value: {
      type: dataTypes.TEXT,
    },
    image: {
      type: dataTypes.TEXT,
    },
    promotion: {
      type: dataTypes.BOOLEAN,
      defaultValue: false
    },
    disabled: {
      type: dataTypes.BOOLEAN,
      defaultValue: false
    },
    additional: {
      type: dataTypes.STRING
    },
    weight: {
      type: dataTypes.STRING
    },
    stock: {
      type: dataTypes.INTEGER
    }
  });

  const Category = model.define('categories', {
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false
    },
    image: {
      type: dataTypes.STRING
    }
  });

  const Tag = model.define('tags', {
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: dataTypes.STRING,
      unique: true
    },
  });

  const CategoryTag = model.define('category_tag', {});

  Category.belongsToMany(Tag, { through: CategoryTag });
  Tag.belongsToMany(Category, { through: CategoryTag });

  Category.hasMany(Product);
  Product.belongsTo(Category);

  Tag.hasMany(Product);
  Product.belongsTo(Tag);

  return { User, Product, Category, Tag };
};

module.exports = generateModels(db, sequelize);

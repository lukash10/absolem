const { User, Post, Pole, Course, CoursePole, Tag, Doc, Product, Category} = require('./models.js');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { randomUUID } = require('crypto');

module.exports = {
  getCounts: async () => {
    try {
      var categories = await Category.count();
      var products = await Product.count();

      return { categories, products };
    } catch (e) {
      console.log(e);
    }
  },
  doLogin: async (auth) => {
    try {
      var result = {
        success: false,
        token: null,
      };

      const user = await User.findOne({ where: { email: auth.login } });

      if (!user) {
        return result;
      }

      result.success = bcrypt.compareSync(auth.password, user.password);

      user.password = undefined;

      if (result.success) {
        result.token = jwt.sign({ userId: user.id }, 'myjwtsecret', {
          expiresIn: '10000000d',
        });
      }

      return result;
    } catch (e) {
      console.log(e);
    }
  },
  createUser: async (user) => {
    try {
      user.password = bcrypt.hashSync(user.password, 10);

      const result = await User.create(user);

      return result;
    } catch (e) {
      console.log(e);
    }
  },
  updateUser: async (id, user) => {
    try {
      const userToUpdate = await User.findOne({ where: { id: id } });

      if (user.password) {
        user.password = bcrypt.hashSync(user.password, 10);
      }

      userToUpdate.update(user);

      return userToUpdate;
    } catch (e) {
      console.log(e);
    }
  },
  deleteUser: async (id) => {
    try {
      const code = await User.destroy({ where: { id: id } });

      return code;
    } catch (e) {
      console.log(`Error ao deletar o usuario ${id}`, e);
    }
  },
  findAllUsers: async () => {
    try {
      var users = await User.findAll({
        order: [['name', 'ASC']],
        attributes: { exclude: ['password']}
      });

      return users;
    } catch (e) {
      console.log(e);
    }
  },
  findOneUser: async (id) => {
    try {
      var user = await User.findOne({
        where: { id: id },
        attributes: { exclude: ['password']}
      });

      return user;
    } catch (e) {
      console.log(e);
    }
  },
  createProduct: async (product) => {
    try {
      if (product.image) {
        var base64Data = product.image.replace(
          /^data:image\/(png|jpeg|jpg|webp);base64,/,
          '',
        );
        var fileName = randomUUID();

        fs.writeFile(
          `../public/upload_images/products/${fileName}.png`,
          base64Data,
          'base64',
          function (err) {
            console.log(err);
          },
        );

        product.image = fileName + '.png';
      }


      const result = await Product.create(product);

      return result;
    } catch (e) {
      console.log(e);
    }
  },

  findAllProducts: async (tagId, categoryId, promotion, disabled, offset, pageSize) => {
    try {

      var whereStatements = {};

      if (tagId) {
        whereStatements['tagId'] = tagId
      }
      
      if (categoryId) {
        whereStatements['categoryId'] = categoryId
      }

      if (promotion) {
        whereStatements['promotion'] = true
      }

      if (disabled) {
        whereStatements['disabled'] = false
      }

      const options = {
        where: whereStatements,
      };

      if (pageSize) {
        options.limit = pageSize;
      }
  
      if (offset) {
        options.offset = offset;
      }

      const products = await Product.findAll(options);

      return products;

    } catch (e) {
      console.log(e);
    }
  },
  findByTitle: async (title) => {
    try {
      const options = {
        where: { title: title }, // Adicione a condição de busca por título
      };

      console.log("TITULO BD", title);
  
      const product = await Product.findOne(options);
  
      return product;
  
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  countAllProducts: async (tagId, categoryId, promotion, disabled) => {
    try {
      var whereStatements = {};
  
      if (tagId) {
        whereStatements['tagId'] = tagId
      }
      
      if (categoryId) {
        whereStatements['categoryId'] = categoryId
      }
  
      if (promotion) {
        whereStatements['promotion'] = true
      }
  
      if (disabled) {
        whereStatements['disabled'] = false
      }
  
      const count = await Product.count({
        where: whereStatements,
      });
  
      return count;
  
    } catch (e) {
      console.log(e);
    }
  },
  updateProduct: async (id, product) => {
    try {
      const productUpdate = await Product.findOne({ where: { id: id } });

      if (product.image && product.image.length > 200) {
        var base64Data = product.image.replace(
           /^data:image\/(png|jpeg|jpg|webp);base64,/,
           '',
         );
         var fileName = randomUUID();

         fs.writeFile(
           `../public/upload_images/products/${fileName}.png`,
           base64Data,
           'base64',
           function (err) {
             console.log(err);
           },
         );

         product.image = fileName + '.png';
      }

      productUpdate.update(product);

      return productUpdate;
    } catch (e) {
      console.log(e);
    }
  },
  deleteProduct: async (id) => {
    try {
      const product = await Product.destroy({ where: { id: id } });

      return product;
    } catch (e) {
      console.log('Error:', e);
    }
  },
   findOneProduct: async (id) => {
    try {
      const product = await Product.findOne({
        where: { id: id }
      })

      return product
    } catch (e) {
      console.log(e);
    }
  },
  createCategory: async (category) => {
    try {
      if (category.image) {
        var base64Data = category.image.replace(
          /^data:image\/(png|jpeg|jpg|webp);base64,/,
          '',
        );
        var fileName = randomUUID();

        fs.writeFile(
          `../public/upload_images/categories/${fileName}.png`,
          base64Data,
          'base64',
          function (err) {
            console.log(err);
          },
        );

        category.image = fileName + '.png';
      }

      const result = await Category.create(category);

      return result;
    } catch (e) {
      console.log(e);
    }
  },
  findAllCategories: async () => {
    try {
      const categories = await Category.findAll();
      

      return categories;
    } catch (e) {
      console.log(e);
    }
  },
  findOneCategory: async (id) => {
    try {
      const category = await Category.findOne({ where: { id: id } });

      return category;
    } catch (e) {
      console.log(e);
    }
  },
  updateCategory: async (id, category) => {
    try {
      const categoryToUpdate = await Category.findOne({ where: { id: id } });

      if (category.image && category.image.length > 200) {
        var base64Data = category.image.replace(
           /^data:image\/(png|jpeg|jpg|webp);base64,/,
           '',
         );
         var fileName = randomUUID();

         fs.writeFile(
           `../public/upload_images/categories/${fileName}.png`,
           base64Data,
           'base64',
           function (err) {
             console.log(err);
           },
         );

         category.image = fileName + '.png';
      }

      
      categoryToUpdate.update(category);
      return categoryToUpdate;

    } catch (e) {
      console.log(e);
    }
  },
  deleteCategory: async (id) => {
    try {
      const category = await Category.destroy({ where: { id: id } });

      return category;
    } catch (e) {
      console.log(`Error ao deletar a categoria ${id}`, e);
    }
  },
  createCourse: async (course) => {
    try {
      if (course.matrix) {
        const base64Pdf = course.matrix.replace(
          /^data:application\/pdf;base64,/,
          '',
        );

        var fileNamePdf = randomUUID();

        fs.writeFileSync(
          `../public/pdfs/${fileNamePdf}.pdf`,
          base64Pdf,
          'base64',
          function (err) {
            console.log(err);
          },
        );

        console.log('entrou aqui');

        course.matrix = fileNamePdf + '.pdf';
      }

      if (course.image) {
        var base64Data = course.image.replace(
          /^data:image\/(png|jpeg|jpg|webp);base64,/,
          '',
        );

        var fileName = randomUUID();

        fs.writeFileSync(
          `../public/images_uploaded/course/${fileName}.png`,
          base64Data,
          'base64',
          function (err) {
            console.log(err);
          },
        );

        course.image = fileName + '.png';
      }

      const courseStored = await Course.create(course);

      if (course.poles) {
        const poles = await Pole.findAll({
          where: { id: { [Op.in]: course.poles.map((c) => c.id) } },
        });

        if (poles) {
          await courseStored.addPole(poles);

          course.poles.map(async (p) => {
            const coursePole = await CoursePole.findOne({
              where: {
                courseId: courseStored.id,
                poleId: p.id,
              },
            });

            coursePole.set({ linkCourse: p.linkCourse, monthlyPayment: p.monthlyPayment,registrationPayment: p.registrationPayment });

            await coursePole.save();
          });
        }
      }

      return courseStored;
    } catch (e) {
      console.log(e);
    }
  },
  findAllCourse: async (modality, search) => {
    try {
      var whereStatements = {};

      if (modality) {
        whereStatements['modality'] = modality;
      }

      if (search) {
        whereStatements['name'] = { [Op.like]: '%' + search + '%' };
      }

      var courses = await Course.findAll({
        where: whereStatements,
        include: { model: Pole, as: 'poles' },
        order: [['name', 'ASC']],
      });

      return courses;
    } catch (e) {
      console.log(e);
    }
  },
  updateCourse: async (id, course) => {
    try {
      const courseToUpdate = await Course.findOne({ where: { id: id } });

      if (course.matrix && course.matrix.length > 300) {
        const base64Pdf = course.matrix.replace(
          /^data:application\/pdf;base64,/,
          '',
        );

        var fileNamePdf = randomUUID();

        fs.writeFileSync(
          `../public/pdfs/${fileNamePdf}.pdf`,
          base64Pdf,
          'base64',
          function (err) {
            console.log(err);
          },
        );

        course.matrix = fileNamePdf + '.pdf';
      }

      if (course.image && course.image.length > 200) {
        var base64Data = course.image.replace(
          /^data:image\/(png|jpeg|jpg|webp);base64,/,
          '',
        );

        var fileName = randomUUID();

        fs.writeFileSync(
          `../public/images_uploaded/course/${fileName}.png`,
          base64Data,
          'base64',
          function (err) {
            console.log(err);
          },
        );

        course.image = fileName + '.png';
      }

      if (course.poles) {
        const poles = await Pole.findAll({
          where: { id: { [Op.in]: course.poles.map((c) => c.id) } },
        });

        if (poles) {
          await courseToUpdate.setPoles(poles);
        }
      }
      
      courseToUpdate.update(course);

      return courseToUpdate;
    } catch (e) {
      console.log(e);
    }
  },
  deleteCourse: async (id) => {
    try {
      const course = await Course.destroy({ where: { id: id } });

      return course;
    } catch (e) {
      console.log(`Error ao deletar o polo ${id}`, e);
    }
  },
  findOneCourse: async (id) => {
    try {
      const course = await Course.findOne({ where: { id: id } });

      return course;
    } catch (e) {
      console.log(e);
    }
  },
  createTag: async (tag) => {
    try {

      const tagStored = await Tag.create(tag);

      if (tag.categories) {
        const categories = await Category.findAll({
          where: { id: { [Op.in]: tag.categories.map((c) => c.id) } }
        });

        if (categories) {
          await tagStored.setCategories(categories);
        }
      }
      
      await tagStored.save();

      return tagStored;
    } catch (e) {
      console.log(e);
    }
  },
  findAllTags: async (categoryId) => {
    try {
      var whereStatements = {};

      if (categoryId) {
        whereStatements['$categories.id$'] = categoryId
      }

      var tags = await Tag.findAll({
        include: [
          { model: Category, as: 'categories', through: { attributes: [] } }
        ],
        where: whereStatements,
        order: [['name', 'ASC']],
      });

      return tags;
    } catch (e) {
      console.log(e);
    }
  },
  updateTag: async (id, tag) => {
    try {
      const tagToUpdate = await Tag.findOne({ where: { id: id } });

      if (tag.categories) {
        const categories = await Category.findAll({
          where: { id: { [Op.in]: tag.categories.map((c) => c.id) } }
        });

        if (categories) {
          await tagToUpdate.setCategories(categories);
        }
      }

      tagToUpdate.update(tag);

      return tagToUpdate;
    } catch (e) {
      console.log(e);
    }
  },
  deleteTag: async (id) => {
    try {
      const tag = await Tag.destroy({ where: { id: id } });

      return tag;
    } catch (e) {
      console.log(`Error ao deletar a tag ${id}`, e);
    }
  },
  findOneTag: async (id) => {
    try {
      const tag = await Tag.findOne({ 
        where: { id: id },
        include: [
          { model: Category, as: 'categories', through: { attributes: [] } }
        ]
      });

      return tag;
    } catch (e) {
      console.log(e);
    }
  },
  createDoc: async (doc) => {
    try {
      const result = await Doc.create(doc);

      return result;
    } catch (e) {
      console.log(e);
    }
  },
  findAllDocs: async () => {
    try {
      const docs = await Doc.findAll();

      return docs;
    } catch (e) {
      console.log(e);
    }
  },
  findOneDoc: async (id) => {
    try {
      const doc = await Doc.findOne({ where: { id: id } });

      return doc;
    } catch (e) {
      console.log(e);
    }
  },
  updatedoc: async (id, doc) => {
    try {
      const docToUpdate = await Doc.findOne({ where: { id: id } });

      docToUpdate.update(doc);

      return docToUpdate;
    } catch (e) {
      console.log(e);
    }
  },
  deletedoc: async (id) => {
    try {
      const doc = await Doc.destroy({ where: { id: id } });

      return doc;
    } catch (e) {
      console.log(`Error ao deletar o doc ${id}`, e);
    }
  },
};

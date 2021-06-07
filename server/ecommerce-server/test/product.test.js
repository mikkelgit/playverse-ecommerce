const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize
const { User, Product, Category } = require('../models');
const { generateToken } = require('../helpers/jwt');

let adminToken = ''
let customerToken = ''
let productId = ''
let testCategoryId = ''

beforeAll((done) => {
  User.create({
    email: 'testadmin@mail.com',
    password: 'testadmin',
    role: 'admin'
  })
    .then(res => {
      adminToken = generateToken({
        id: res.id,
        email: res.email
      })
      return User.create({
        email: 'customer@mail.com',
        password: 'customer'
      })
    })
    .then(res => {
      customerToken = generateToken({
        id: res.id,
        email: res.email
      })
      return Category.create({
        name: 'Test'
      })
    })
    .then(res => {
      testCategoryId = res.id
      return Product.create({
        name: 'Kaos Patrick',
        image_url: 'https://images.tokopedia.net/img/cache/900/product-1/2018/12/25/4360611/4360611_6f62c20e-5927-4dc6-9bee-751549f61d55_1200_1200.jpg',
        price: 50000,
        stock: 20,
        CategoryId: testCategoryId,
      })
    })
    .then(res => {
      productId = res.id
      done()
    })
})

afterAll((done) => {
  if (process.env.NODE_ENV === "test") {
    queryInterface.bulkDelete('Users', null)
    .then(() => {
      return queryInterface.bulkDelete('Products', null)
    })
    .then(() => {
      return queryInterface.bulkDelete('Categories', null)
    })
    .then(() => {
      done()
    })
    .catch(err => {
      done(err)
    })
  }
})

let testProductData = {
  name: 'Sweater bulu mata',
  image_url: 'https://cf.shopee.co.id/file/f21304e8d829c2d8407b0d75e70f2912',
  price: 50000,
  stock: 20,
  CategoryId: testCategoryId,
}

let updateProduct = {
  name: 'Tanda Tangan Patrick',
  image_url: 'https://images.tokopedia.net/img/cache/900/product-1/2018/12/25/4360611/4360611_6f62c20e-5927-4dc6-9bee-751549f61d55_1200_1200.jpg',
  price: 100000,
  stock: 50,
  CategoryId: testCategoryId,
}

// Success Case Create Product
describe('Create product case', () => {
  it('responds with id, name, image_url, price, stock, CategoryId value', (done) => {
    return request(app)
    .post('/products')
    .send({
      name: 'Sweater bulu mata',
      image_url: 'https://cf.shopee.co.id/file/f21304e8d829c2d8407b0d75e70f2912',
      price: 50000,
      stock: 20,
      CategoryId: testCategoryId,
    })
    .set('access_token', adminToken)
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(201)
      expect(body).toHaveProperty('id', expect.any(Number))
      expect(body).toHaveProperty('name', testProductData.name)
      expect(body).toHaveProperty('price', testProductData.price)
      expect(body).toHaveProperty('stock', testProductData.stock)
      expect(body).toHaveProperty('CategoryId', testCategoryId)
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

// Failed Case Create Product
describe('Create product case without access_token', () => {
  it('responds with status 400', (done) => {
    return request(app)
    .post('/products')
    .send({
      name: 'Sweater bulu mata',
      image_url: 'https://cf.shopee.co.id/file/f21304e8d829c2d8407b0d75e70f2912',
      price: 50000,
      stock: 20,
      CategoryId: testCategoryId,
    })
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Bad Request')
      expect(body).toHaveProperty('errors', ['Login Required'])
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

describe('Create product case without admin access_token', () => {
  it('responds with status 401', (done) => {
    return request(app)
    .post('/products')
    .send({
      name: 'Sweater bulu mata',
      image_url: 'https://cf.shopee.co.id/file/f21304e8d829c2d8407b0d75e70f2912',
      price: 50000,
      stock: 20,
      CategoryId: testCategoryId,
    })
    .set('access_token', customerToken)
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(401)
      expect(body).toHaveProperty('message', ['Unauthorized.'])
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

describe('Create product case without product data', () => {
  it('responds with status 400', (done) => {
    return request(app)
    .post('/products')
    .send({
      name: '',
      image_url: '',
      price: undefined,
      stock: undefined,
      CategoryId: undefined,
    })
    .set('access_token', adminToken)
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Bad Request')
      expect(body).toHaveProperty('errors', expect.anything())
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

describe('Create product case minus stock value', () => {
  it('responds with status 400', (done) => {
    return request(app)
    .post('/products')
    .send({
      name: 'Sweater bulu mata',
      image_url: 'https://cf.shopee.co.id/file/f21304e8d829c2d8407b0d75e70f2912',
      price: 50000,
      stock: -5,
      CategoryId: 1,
    })
    .set('access_token', adminToken)
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Bad Request')
      expect(body).toHaveProperty('errors', ['Product stock cannot be 0 or lower'])
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

describe('Create product case minus price value', () => {
  it('responds with status 400', (done) => {
    return request(app)
    .post('/products')
    .send({
      name: 'Sweater bulu mata',
      image_url: 'https://cf.shopee.co.id/file/f21304e8d829c2d8407b0d75e70f2912',
      price: -50000,
      stock: 20,
      CategoryId: 1,
    })
    .set('access_token', adminToken)
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Bad Request')
      expect(body).toHaveProperty('errors', ['Product price cannot be 0 or lower'])
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

describe('Create product case invalid data type', () => {
  it('responds with status 400', (done) => {
    return request(app)
    .post('/products')
    .send({
      name: 'Sweater bulu mata',
      image_url: 'https://cf.shopee.co.id/file/f21304e8d829c2d8407b0d75e70f2912',
      price: "hahaha",
      stock: "hahaha",
      CategoryId: 1,
    })
    .set('access_token', adminToken)
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Bad Request')
      expect(body).toHaveProperty('errors', ['Product stock & price must be in valid number format'])
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

// Success Case Read Product
describe('Read product case', () => {
  it('responds with array of products', (done) => {
    return request(app)
    .get('/products')
    .set('access_token', adminToken)
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(200)
      expect(Array.isArray(body)).toBe(true)
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

// Success Case Update Product
describe('Update product case', () => {
  it('responds with updated value of product', (done) => {
    return request(app)
    .put('/products/' + productId)
    .send({
      name: 'Tanda Tangan Patrick',
      image_url: 'https://images.tokopedia.net/img/cache/900/product-1/2018/12/25/4360611/4360611_6f62c20e-5927-4dc6-9bee-751549f61d55_1200_1200.jpg',
      price: 100000,
      stock: 50,
      CategoryId: testCategoryId,
    })
    .set('access_token', adminToken)
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(200)
      expect(body).toHaveProperty('id', expect.any(Number))
      expect(body).toHaveProperty('name', updateProduct.name)
      expect(body).toHaveProperty('price', updateProduct.price)
      expect(body).toHaveProperty('stock', updateProduct.stock)
      expect(body).toHaveProperty('CategoryId', testCategoryId)
      done()
    })
    .catch(err => {
        done(err)
    })
  });
});

// Failed Case Update Product
describe('Update product case without access_token', () => {
  it('responds with status 400', (done) => {
    return request(app)
    .put('/products/' + productId)
    .send({
      name: 'Tanda Tangan Patrick',
      image_url: 'https://images.tokopedia.net/img/cache/900/product-1/2018/12/25/4360611/4360611_6f62c20e-5927-4dc6-9bee-751549f61d55_1200_1200.jpg',
      price: 100000,
      stock: 50,
      CategoryId: testCategoryId,
    })
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Bad Request')
      expect(body).toHaveProperty('errors', ['Login Required'])
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

describe('Update product case without admin access', () => {
  it('responds with status 401', (done) => {
    return request(app)
    .put('/products/' + productId)
    .send({
      name: 'Tanda Tangan Patrick',
      image_url: 'https://images.tokopedia.net/img/cache/900/product-1/2018/12/25/4360611/4360611_6f62c20e-5927-4dc6-9bee-751549f61d55_1200_1200.jpg',
      price: 100000,
      stock: 50,
      CategoryId: testCategoryId,
    })
    .set('access_token', customerToken)
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(401)
      expect(body).toHaveProperty('message', ['Unauthorized.'])
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

describe('Update product case minus product stock', () => {
  it('responds with status 400', (done) => {
    return request(app)
    .put('/products/' + productId)
    .send({
      name: 'Tanda Tangan Patrick',
      image_url: 'https://images.tokopedia.net/img/cache/900/product-1/2018/12/25/4360611/4360611_6f62c20e-5927-4dc6-9bee-751549f61d55_1200_1200.jpg',
      price: 100000,
      stock: -50,
      CategoryId: 1,
    })
    .set('access_token', adminToken)
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Bad Request')
      expect(body).toHaveProperty('errors', ['Product stock cannot be 0 or lower'])
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

describe('Update product case minus product price', () => {
  it('responds with status 400', (done) => {
    return request(app)
    .put('/products/' + productId)
    .send({
      name: 'Tanda Tangan Patrick',
      image_url: 'https://images.tokopedia.net/img/cache/900/product-1/2018/12/25/4360611/4360611_6f62c20e-5927-4dc6-9bee-751549f61d55_1200_1200.jpg',
      price: -100000,
      stock: 50,
      CategoryId: 1,
    })
    .set('access_token', adminToken)
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Bad Request')
      expect(body).toHaveProperty('errors', ['Product price cannot be 0 or lower'])
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});


describe('Update product case invalid data type', () => {
  it('responds with status 400', (done) => {
    return request(app)
    .put('/products/' + productId)
    .send({
      name: 'Tanda Tangan Patrick',
      image_url: 'https://images.tokopedia.net/img/cache/900/product-1/2018/12/25/4360611/4360611_6f62c20e-5927-4dc6-9bee-751549f61d55_1200_1200.jpg',
      price: "hahaha",
      stock: "hahaha",
      CategoryId: 1,
    })
    .set('access_token', adminToken)
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Bad Request')
      expect(body).toHaveProperty('errors', ['Product stock & price must be in valid number format'])
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

// Success Case Delete Product
describe('Delete product case', () => {
  it('responds with success message', (done) => {
    return request(app)
    .delete('/products/' + productId)
    .set('access_token', adminToken)
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(200)
      expect(body).toHaveProperty('message', 'Product deleted successfully')
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

// Failed Case Delete Product
describe('Delete product case without access_token', () => {
  it('responds with status 400', (done) => {
    return request(app)
    .delete('/products/' + productId)
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(400)
      expect(body).toHaveProperty('message', 'Bad Request')
      expect(body).toHaveProperty('errors', ['Login Required'])
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

describe('Delete product case', () => {
  it('responds with status 401', (done) => {
    return request(app)
    .delete('/products/' + productId)
    .set('access_token', customerToken)
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(401)
      expect(body).toHaveProperty('message', ['Unauthorized.'])
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});
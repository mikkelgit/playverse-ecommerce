const request = require('supertest');
const app = require('../app');
const { User } = require('../models');
const { sequelize } = require('../models');
const { queryInterface } = sequelize

let adminData = {
    email: 'testadmin@mail.com',
    password: 'testadmin',
}

beforeAll((done) => {
  adminData.role = 'admin'
  User.create(adminData)
    .then(data => {
      done()
    })
    .catch(err => {
      done(err);
    })
})

afterAll((done) => {
  if (process.env.NODE_ENV === "test") {
    queryInterface.bulkDelete('Users', null)
    .then(() => {
      done()
    })
    .catch(err => {
      done(err)
    })
  }
})

// Success Case
describe('Admin login case', () => {
  it('responds with id, email, access_token value', (done) => {
    return request(app)
    .post('/login')
    .send(adminData)
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(200)
      expect(body).toHaveProperty('id', expect.any(Number))
      expect(body).toHaveProperty('email', adminData.email)
      expect(body).toHaveProperty('access_token', expect.anything())
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

// Failed Case
describe('Admin login case with wrong password', () => {
  it('responds with invalid email / password', (done) => {
    return request(app)
    .post('/login')
    .send({
        email: adminData.email,
        password: "salah"
    })
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(401)
      expect(body).toHaveProperty('message', 'Unauthorized')
      expect(body).toHaveProperty('errors', ['Invalid Email / Password'])
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

describe('Unknown user login case', () => {
  it('responds with invalid email / password', (done) => {
    return request(app)
    .post('/login')
    .send({
        email: "sayasiapa@mail.com",
        password: "salah"
    })
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(401)
      expect(body).toHaveProperty('message', 'Unauthorized')
      expect(body).toHaveProperty('errors', ['Invalid Email / Password'])
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});

describe('Login case without email and password', () => {
  it('responds with status 500', (done) => {
    return request(app)
    .post('/login')
    .send()
    .set('Accept', 'application/json')
    .then(res => {
      let { body, status} = res
      expect(status).toBe(500)
      expect(body).toHaveProperty('message', ['WHERE parameter "email" has invalid "undefined" value'])
      done()
    })
    .catch(err => {
      done(err)
    })
  });
});
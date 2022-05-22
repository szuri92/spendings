const request = require('supertest')
const app = require('./index')

describe('/spendings/list', () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/spendings/list")
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})

describe('/spendings/add', () => {
  test("It should response the GET method", done => {
    const body = {
      description: "Mango",
      amount: 1200,
      spent_at: new Date().toISOString(),
      currency: "USD",
    }

    request(app)
      .post("/spendings/add")
      .send(body)
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})


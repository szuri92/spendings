const request = require('supertest')
const app = require('./index')

describe('/spendings/list', () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/spendings/list")
    expect(response.statusCode).toBe(200)
  })
})

describe('/spendings/add', () => {
  test("It should response the GET method", async() => {
    const body = {
      description: "Mango",
      amount: 1200,
      spent_at: new Date().toISOString(),
      currency: "USD",
    }

    const response = await request(app).post("/spendings/add").send(body)
    expect(response.statusCode).toBe(200)
  })

  test("It should response with http 400 with invalid data", async() => {
    const body = {
      description: "",
      amount: 1200,
      spent_at: new Date().toISOString(),
      currency: "USD",
    }

    const response = await request(app).post("/spendings/add").send(body)
    expect(response.statusCode).toBe(400)
  })

})

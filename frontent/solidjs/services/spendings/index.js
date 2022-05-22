import { Subject } from 'rxjs'

const baseURL = 'http://localhost:5000'

const _spendingSaved = new Subject()

export const spendingsAPI = {
    getSpendings: async ({currency, sort}) => {

        const currencyQuery = currency ? `?currency=${currency}` : '?currency='
        const sortByQuery = sort ? `&sortBy=${sort}` : '&sortBy='

        const response = await fetch(`${baseURL}/spendings/list${currencyQuery}${sortByQuery}`)
        return await response.json()
    },

    postNewSpending: async (spending) => {
        const data = {
            ...spending,
            spent_at: new Date().toISOString(),
        }

        const response = await fetch(`${baseURL}/spendings/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        _spendingSaved.next()
        return await response.json()
    },

    spendingSaved: () => _spendingSaved.asObservable()
}

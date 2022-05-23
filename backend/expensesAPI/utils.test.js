const { 
    sortSpendings,
    filterSpending,
    isRequestValid
} = require('./utils')

describe('isRequestValid', () => {
    it('should return true with valid data', () => {
        const body = {
            description: "Mango",
            amount: 1200,
            spent_at: new Date().toISOString(),
            currency: "USD",
        }
    
        expect(isRequestValid(body)).toBe(true)
    })

    it('should return false with invalid data', () => {
        const body1 = {
            description: "",
            amount: 1200,
            spent_at: new Date().toISOString(),
            currency: "USD",
        }

        const body2 = {
            description: "Mango",
            amount: 0,
            spent_at: new Date().toISOString(),
            currency: "USD",
        }

        const body3 = {
            description: "Mango",
            amount: 1200,
            spent_at: "",
            currency: "USD",
        }

        const body4 = {
            description: "Mango",
            amount: 1200,
            spent_at: new Date().toISOString(),
            currency: "",
        }

        const body5 = {
            description: "",
            amount: 1200,
            spent_at: new Date().toISOString(),
            currency: "",
        }
    
        expect(isRequestValid(body1)).toBe(false)
        expect(isRequestValid(body2)).toBe(false)
        expect(isRequestValid(body3)).toBe(false)
        expect(isRequestValid(body4)).toBe(false)
        expect(isRequestValid(body5)).toBe(false)
    })

    
})


describe('filterSpending', () => {
    it('should filter items', () => {
        const data = [
            {
                currency: 'USD',
                amount: 1200, 
            },
            {
                currency: 'USD',
                amount: 1200, 
            },
            {
                currency: 'HUF',
                amount: 1200, 
            }
        ]
    
        expect((data.filter(e => filterSpending(e, 'USD')))?.length).toEqual(2)
        expect((data.filter(e => filterSpending(e, 'HUF')))?.length).toEqual(1)
    })
})

describe('sortSpendings', () => {
    it('should sort items based on amount', () => {
        const data = [
            {
                currency: 'USD',
                amount: 1000, 
            },
            {
                currency: 'USD',
                amount: 1200, 
            },
            {
                currency: 'HUF',
                amount: 1400, 
            }
        ]
    
        expect((data.sort((a, b) => sortSpendings(a, b, 'amount'))))
            .toEqual([
                {   
                    currency: 'HUF',
                    amount: 1400, 
                },
                {
                    currency: 'USD',
                    amount: 1200, 
                },
                {      
                    currency: 'USD',
                    amount: 1000, 
                }
               
            ])
    })
    

    it('should sort items based on -amount', () => {
        const data = [
            {
                currency: 'USD',
                amount: 1200, 
            },
            {
                currency: 'USD',
                amount: 1000, 
            },
            {
                currency: 'USD',
                amount: 1400, 
            }
        ]
    
        expect((data.sort((a, b) => sortSpendings(a, b, '-amount'))))
            .toEqual([
                {   
                    currency: 'USD',
                    amount: 1000, 
                },
                {
                    currency: 'USD',
                    amount: 1200, 
                },
                {      
                    currency: 'USD',
                    amount: 1400, 
                }
               
            ])
    })

    it('should sort items based on -date', () => {

        const dates = {
            date1: new Date(1).toISOString(),
            date2: new Date(2).toISOString(),
            date3: new Date(3).toISOString(),
        }

        const data = [
            {   
                spent_at: dates.date2,
                amount: 1200, 
            },
            {
                spent_at: dates.date3,
                amount: 1000, 
            },
            {
                spent_at: dates.date1,
                amount: 1400, 
            }
        ]
    
        expect((data.sort((a, b) => sortSpendings(a, b, 'date'))))
            .toEqual([
                {   
                    spent_at: dates.date3,
                    amount: 1000, 
                },
                {
                    spent_at: dates.date2,
                    amount: 1200, 
                },
                {
                    spent_at: dates.date1,
                    amount: 1400, 
                }
               
            ])
    })

    it('should sort items based on -date', () => {

        const dates = {
            date1: new Date(1).toISOString(),
            date2: new Date(2).toISOString(),
            date3: new Date(3).toISOString(),
        }

        const data = [
            {   
                spent_at: dates.date2,
                amount: 1200, 
            },
            {
                spent_at: dates.date3,
                amount: 1000, 
            },
            {
                spent_at: dates.date1,
                amount: 1400, 
            }
        ]
    
        expect((data.sort((a, b) => sortSpendings(a, b, '-date'))))
            .toEqual([
                {   
                    spent_at: dates.date1,
                    amount: 1400, 
                },
                {
                    spent_at: dates.date2,
                    amount: 1200, 
                },
                {
                    spent_at: dates.date3,
                    amount: 1000, 
                }
               
            ])
    })
})
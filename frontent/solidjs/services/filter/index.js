import { BehaviorSubject } from 'rxjs'

export const availableSortings = [
    {
        name: 'date',
        description: 'Sort by Date descending (default)',
    },
    {
        name: '-date',
        description: 'Sort by Date ascending',
    },
    {
        name: 'amount',
        description: 'Sort by Amount descending',

    },
    {
        name: '-amount',
        description: 'Sort by Amount ascending',
    }
]

export const availableCurrencies = [
    'ALL',
    'HUF',
    'USD',
]

const filter = new BehaviorSubject({
    currency: availableCurrencies[0],
    sort: availableSortings[0].name
})

export const filterService = {
    filter: () => filter.asObservable(),
    updateFilter: (value) => {
        filter.next(value)
    }
}

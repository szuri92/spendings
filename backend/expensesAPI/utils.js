const sortSpendings = (a, b, sortBy) => {
    if (sortBy === 'date') {
        return new Date(b.spent_at) - new Date(a.spent_at)
    }

    if (sortBy === '-date') {
        return new Date(a.spent_at) - new Date(b.spent_at)
    }

    if (sortBy === 'amount') {
        return b.amount - a.amount
    }

    if (sortBy === '-amount') {
        return a.amount - b.amount
    }
}

const filterSpending = (element, currency) => {
    if (currency === 'ALL' || currency === '') {
        return element
    }

    return element.currency === currency
}

module.exports = {
    sortSpendings,
    filterSpending
}
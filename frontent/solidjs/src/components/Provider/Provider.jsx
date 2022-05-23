import { createSignal, createContext, useContext, createEffect } from 'solid-js'
import { spendingsAPI } from '../../../services/spendings'

const SpendingsContext = createContext()

export function SpendingsProvider(props) {

    const [ sorting, setSorting ] = createSignal({ currency: '', sort: 'date' })

    const [ loading, setLoading ] = createSignal(true)

    const [ error, setError ] = createSignal(false)

    const [ spendingList, setSpendingList ] = createSignal([])

    const fetchData = async(params) => {
        try {
            setLoading(true)
            const spendingList = await spendingsAPI.getSpendings(params)
            setSpendingList(spendingList)
        } catch (e) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const postAndRefresh = async(spending) => {
        const params = sorting()
        try {
            const spendingList = await spendingsAPI.postAndRefresh(spending, params)
            setSpendingList(spendingList)
        } catch (e) {
            console.error({e})
            setError(true)
        }
    }

    const store = [
        {
            sorting,
            loading,
            error,
            spendingList,
        },
        {
            updateSorting(s) {
                setSorting(value => ({...value, ...s}))
            },
            postAndRefresh
        }

    ]

    createEffect(() => {
        const params = sorting()
        fetchData(params)
    })

    return (
        <SpendingsContext.Provider value={store}>
          {props.children}
        </SpendingsContext.Provider>
      )
}

export function useSpending() { return useContext(SpendingsContext) }
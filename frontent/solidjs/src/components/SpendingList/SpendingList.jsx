import { createEffect, createSignal, For, onCleanup, Show } from 'solid-js'

import Loading from '../Loading'
import SpendingTile from '../SpendingTile'

import { filterService } from '../../../services/filter'
import { spendingsAPI } from './../../../services/spendings'

const SpendingList = () => {
    
    const [ spendings, setSpendings ] = createSignal([])
    const [ error, setError ] = createSignal(false)
    const [ loading, setLoading ] = createSignal(true)
    const [ filter, setFilter ] = createSignal({})

    const requestList = async (params) => {
        params && setFilter(params)
        try {
            setLoading(true)
            setError(false)

            const list = await spendingsAPI.getSpendings(filter())

            setSpendings(list)
        } catch (e) {
            setError(true)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    createEffect(() => {
        const call = filterService.filter()
        .subscribe(async res => {
            requestList(res)
        })

        onCleanup(() => {
            call.unsubscribe()
        })
    })

    createEffect(() => {
        const call = spendingsAPI.spendingSaved()
        .subscribe(() => {
            requestList()
        })

        onCleanup(() => {
            call.unsubscribe()
        })
    })


    return (
        <Show when={!loading()} fallback={<Loading/>}>
            <Show when={!error()} fallback={
                <div className="error">The server is probably down. Please try again later.</div>
            }>
                <div className="spending-list">   
                    <For each={ spendings() }>
                        {item => <SpendingTile { ...item }/> }
                    </For>
                </div>
            </Show>
        </Show>


    )
}

export default SpendingList
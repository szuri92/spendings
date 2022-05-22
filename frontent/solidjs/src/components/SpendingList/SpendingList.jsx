import { createEffect, createSignal, For, onCleanup, Show } from 'solid-js'

import Loading from '../Loading'
import SpendingTile from '../SpendingTile'

import { filterService } from '../../../services/filter'
import { spendingsAPI } from './../../../services/spendings'
import {  merge } from 'rxjs'

const SpendingList = () => {
    const [ spendings, setSpendings ] = createSignal([])
    const [ error, setError ] = createSignal(false)
    const [ loading, setLoading ] = createSignal(true)
    const [ filter, setFilter ] = createSignal({})

    createEffect(() => {
        const call = merge(
            spendingsAPI.spendingSaved(),
            filterService.filter(),
        ).subscribe(async res => {
            res && setFilter(res)
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
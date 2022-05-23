import { Show } from 'solid-js'

import Loading from '../Loading'
import { useSpending } from '../Provider/Provider'
import SpendingTile from '../SpendingTile'

const SpendingList = () => {
    
    const [ { spendingList, error, loading } ] = useSpending()


    return (
        <Show when={!loading()} fallback={<Loading/>}>
            <Show when={!error()} fallback={
                <div className="error">The server is probably down. Please try again later.</div>
            }>
                <div className="spending-list">   
                    <For each={ spendingList() }>
                        {item => <SpendingTile { ...item }/> }
                    </For>
                </div>
            </Show>
        </Show>


    )
}

export default SpendingList
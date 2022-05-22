import styles from './Filter.module.scss'

import { createEffect, createSignal, For, onCleanup } from "solid-js"
import { filterService, availableCurrencies, availableSortings } from '../../../services/filter'

const Filter = () => {

    const [filter, setFilter] = createSignal({
        currency: "",
        sort: "",
    })


    createEffect(() => {
        const call = filterService.filter().subscribe(filter => {
            setFilter(filter)
        })

        onCleanup(() => {
            call.unsubscribe()
        })
    })


    const updateSorting = (event) => {
        const sort = event.target.value
        filterService.updateFilter({...filter(), sort})
    }

    const updateFilter = (value) => {
        filterService.updateFilter({...filter(), currency: value})
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.order}>
                <select onChange={updateSorting} value={filter()?.sort}>
                    <For each={availableSortings}>
                        {item => <option value={item?.name}>{item?.description}</option>}
                    </For>
                </select>
            </div>

            <div className="filter">

            <ul className={styles.filter}>
            <For each={availableCurrencies}>
                    { item => <li onClick={() => updateFilter(item)}>
                        <button className={`${styles.currency_btn} ${filter()?.currency === item ? styles.active : ""}`}>
                            { item }
                        </button>
                    </li> }
            </For>
            </ul>


               
            </div>
        </div>
    )
}

export default Filter
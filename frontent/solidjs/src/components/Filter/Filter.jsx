import styles from './Filter.module.scss'
import { useSpending } from '../Provider/Provider'

const availableSortings = [
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
const availableCurrencies = [
    'ALL',
    'HUF',
    'USD',
]


const Filter = () => {
    const [ { sorting }, { updateSorting }] = useSpending();
    const setSorting = (event) => {
        const sort = event.target.value
        updateSorting({sort})
    }
    const setFilter = (value) => {
        updateSorting({currency: value})
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.order}>
                <select onChange={setSorting} value={sorting()?.sort}>
                    <Index each={availableSortings}>
                        { item => <option value={item()?.name}>{item()?.description}</option> }
                    </Index>
                </select>
            </div>

            <div className="filter">

            <ul className={styles.filter}>
            <Index each={availableCurrencies}>
                    { item => <li onClick={() => setFilter(item())}>
                        <button className={`${styles.currency_btn} ${sorting()?.currency === item() ? styles.active : ""}`}>
                            { item() }
                        </button>
                    </li> }
            </Index>
            </ul>


               
            </div>
        </div>
    )
}

export default Filter
import { DateTime } from 'luxon'
import styles from './SpendingTile.module.scss'

const getAmount = (currency, amount) => {
    switch(currency) {
        case 'HUF':
            return `${amount}Ft`
        case 'USD':
            return `$${amount}`
        default:
            return amount
    }
}

const convertDate = (dateString) => {
    return DateTime.fromISO(dateString).toFormat("t - MMMM dd, yyyy")
}


const SpendingTile = ({
    description,
    amount,
    currency,
    spent_at
}) => {    
    return(
        <div className={styles.spending_tile}>
            <div>
                <div className={styles.spending_tile_description}>{ description }</div>
                <div className="spending_tile__spent_at">{ convertDate(spent_at) }</div>
            </div>

            <div>
                <div className={styles.spending_tile__amount}>{ getAmount(currency, amount) }</div>
            </div>
        </div>
    ) 
}

export default SpendingTile
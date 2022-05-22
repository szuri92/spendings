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
    const date = new Date(dateString)
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
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
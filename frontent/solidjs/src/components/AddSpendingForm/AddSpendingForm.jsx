import { createSignal } from "solid-js";

import styles from './AppSpendingForm.module.scss'
import { spendingsAPI } from '../../../services/spendings'

const AddSpendingForm = () => {
    const [formData, setFormData] = createSignal({
        description: '',
        amount: 0,
        currency: 'USD',
    })


    const resetForm = () => {
        setFormData({
            description: '',
            amount: 0,
            currency: 'USD',
        })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData(),
            [name]: value,
          })
    }

    const submit = (event) => {
        event.preventDefault()
        spendingsAPI.postNewSpending(formData())
        resetForm()
    }

    return (
        <form class={styles.form}>
            <input 
                type='text'
                placeholder='description'
                name='description'
                value={formData().description}
                onChange={handleChange}
            />

            <input 
                type='number'
                placeholder='amount'
                name='amount'
                value={formData().amount}
                onChange={handleChange}
            />

            <select  
                name='currency'
                value={formData().currency}
                onChange={handleChange}>
                <option value='HUF'>HUF</option>
                <option value='USD'>USD</option>
            </select>

            <button onClick={submit}>Save</button>

        </form>
    )
}

export default AddSpendingForm;
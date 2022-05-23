import { createSignal, Show } from 'solid-js'

import styles from './AppSpendingForm.module.scss'
import { useSpending } from '../Provider/Provider'

const defaultData = {
    description: '',
    amount: 0,
    currency: 'USD',
}

const AddSpendingForm = () => {
    const [formData, setFormData] = createSignal(defaultData)
    const [error, setError] = createSignal(false)

    const postAndRefresh = useSpending()[1].postAndRefresh


    const isFormValid = (formData) => {
        return formData?.description && formData?.amount 
    }

    const resetForm = () => {
        setFormData(defaultData)
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData(),
            [name]: value,
          })
    }

    const submit = (event) => {
        event.preventDefault()
        setError(false)

        const data = formData()

        if(!isFormValid(data)) {
            setError(true)
            return
        }

        postAndRefresh(data)
        resetForm()
    }

    return (
        <> 
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

        <Show when={error()}>Form is invalid</Show>
        </>
    )
}

export default AddSpendingForm
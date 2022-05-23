import Filter from './components/Filter'
import SpendingList from './components/SpendingList'
import AddSpendingForm from './components/AddSpendingForm'
import { SpendingsProvider } from './components/Provider/Provider'

function App() {
  return (
    <SpendingsProvider>
      <AddSpendingForm/>
      <Filter/>
      <SpendingList/>
    </SpendingsProvider>
  )
}

export default App

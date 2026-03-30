import { useState, useEffect } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseStats from './components/ExpenseStats'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [editingExpense, setEditingExpense] = useState(null)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Load expenses from localStorage
    const savedExpenses = localStorage.getItem('spendwise-expenses')
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses))
    }

    // Load theme preference
    const savedTheme = localStorage.getItem('spendwise-theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  useEffect(() => {
    // Save expenses to localStorage whenever they change
    localStorage.setItem('spendwise-expenses', JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    // Update theme attribute
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('spendwise-theme', theme)
  }, [theme])

  const addExpense = (expense) => {
    const newExpense = {
      id: Date.now().toString(),
      ...expense,
      amount: parseFloat(expense.amount),
      date: expense.date || new Date().toISOString().split('T')[0]
    }
    setExpenses([...expenses, newExpense])
  }

  const updateExpense = (id, updatedExpense) => {
    setExpenses(expenses.map(exp => 
      exp.id === id 
        ? { ...updatedExpense, id, amount: parseFloat(updatedExpense.amount) }
        : exp
    ))
    setEditingExpense(null)
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
    if (editingExpense?.id === id) {
      setEditingExpense(null)
    }
  }

  const startEdit = (expense) => {
    setEditingExpense(expense)
  }

  const cancelEdit = () => {
    setEditingExpense(null)
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>SpendWise</h1>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <ExpenseStats expenses={expenses} />
          
          <div className="content-grid">
            <div className="form-section">
              <ExpenseForm
                onSubmit={editingExpense ? (exp) => updateExpense(editingExpense.id, exp) : addExpense}
                editingExpense={editingExpense}
                onCancel={cancelEdit}
              />
            </div>

            <div className="list-section">
              <ExpenseList
                expenses={expenses}
                onEdit={startEdit}
                onDelete={deleteExpense}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

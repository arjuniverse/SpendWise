import { useState, useEffect } from 'react'
import './ExpenseForm.css'

const CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
  'Health',
  'Education',
  'Other'
]

function ExpenseForm({ onSubmit, editingExpense, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: CATEGORIES[0],
    date: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title || '',
        amount: editingExpense.amount?.toString() || '',
        category: editingExpense.category || CATEGORIES[0],
        date: editingExpense.date || new Date().toISOString().split('T')[0]
      })
    } else {
      setFormData({
        title: '',
        amount: '',
        category: CATEGORIES[0],
        date: new Date().toISOString().split('T')[0]
      })
    }
  }, [editingExpense])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.amount || parseFloat(formData.amount) <= 0) {
      return
    }
    onSubmit(formData)
    if (!editingExpense) {
      setFormData({
        title: '',
        amount: '',
        category: CATEGORIES[0],
        date: new Date().toISOString().split('T')[0]
      })
    }
  }

  return (
    <div className="expense-form-card">
      <h2>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Grocery shopping"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          {editingExpense && (
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
          )}
          <button type="submit" className="btn-submit">
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ExpenseForm

import './ExpenseList.css'

function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="expense-list-card">
        <h2>Your Expenses</h2>
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 11l3 3L22 4"></path>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          <p>No expenses yet. Add your first expense to get started!</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getCategoryColor = (category) => {
    const colors = {
      Food: '#f59e0b',
      Transport: '#3b82f6',
      Shopping: '#8b5cf6',
      Bills: '#ef4444',
      Entertainment: '#ec4899',
      Health: '#10b981',
      Education: '#06b6d4',
      Other: '#6b7280'
    }
    return colors[category] || colors.Other
  }

  return (
    <div className="expense-list-card">
      <h2>Your Expenses ({expenses.length})</h2>
      <div className="expense-list">
        {expenses
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map(expense => (
            <div key={expense.id} className="expense-item">
              <div className="expense-item-main">
                <div className="expense-info">
                  <div className="expense-title-row">
                    <h3>{expense.title}</h3>
                    <span 
                      className="category-badge"
                      style={{ backgroundColor: getCategoryColor(expense.category) + '20', color: getCategoryColor(expense.category) }}
                    >
                      {expense.category}
                    </span>
                  </div>
                  <div className="expense-meta">
                    <span className="expense-date">{formatDate(expense.date)}</span>
                  </div>
                </div>
                <div className="expense-amount">
                  {formatAmount(expense.amount)}
                </div>
              </div>
              <div className="expense-actions">
                <button 
                  className="btn-edit"
                  onClick={() => onEdit(expense)}
                  aria-label="Edit expense"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Edit
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => onDelete(expense.id)}
                  aria-label="Delete expense"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ExpenseList

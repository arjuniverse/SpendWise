import { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import './ExpenseStats.css'

function ExpenseStats({ expenses }) {
  const stats = useMemo(() => {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)
    
    const categoryTotals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount
      return acc
    }, {})

    const categoryData = Object.entries(categoryTotals)
      .map(([name, value]) => ({
        name,
        value: parseFloat(value.toFixed(2))
      }))
      .sort((a, b) => b.value - a.value)

    return { total, categoryData }
  }, [expenses])

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const COLORS = {
    Food: '#f59e0b',
    Transport: '#3b82f6',
    Shopping: '#8b5cf6',
    Bills: '#ef4444',
    Entertainment: '#ec4899',
    Health: '#10b981',
    Education: '#06b6d4',
    Other: '#6b7280'
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{payload[0].name}</p>
          <p className="tooltip-value">{formatAmount(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="expense-stats">
      <div className="stat-card total-card">
        <div className="stat-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div className="stat-content">
          <p className="stat-label">Total Spending</p>
          <p className="stat-value">{formatAmount(stats.total)}</p>
          <p className="stat-count">{expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}</p>
        </div>
      </div>

      {stats.categoryData.length > 0 && (
        <div className="stat-card chart-card">
          <h3>Category Breakdown</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stats.categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS.Other} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => value}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="category-list">
            {stats.categoryData.map((item) => (
              <div key={item.name} className="category-item">
                <div className="category-info">
                  <span 
                    className="category-dot"
                    style={{ backgroundColor: COLORS[item.name] || COLORS.Other }}
                  ></span>
                  <span className="category-name">{item.name}</span>
                </div>
                <span className="category-amount">{formatAmount(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ExpenseStats

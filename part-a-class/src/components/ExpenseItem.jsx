import React, { Component } from 'react';
import { CATEGORY_COLORS } from '../data/initialExpenses';

class ExpenseItem extends Component {
  render() {
    const { expense, onDelete } = this.props;
    const colorInfo = CATEGORY_COLORS[expense.category] || {
      bg: '#f1f5f9',
      text: '#475569',
      icon: '🏷️'
    };

    const formattedDate = new Date(expense.date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    return (
      <li className="expense-item">
        <div className="expense-left">
          <div
            className="category-pill"
            style={{
              backgroundColor: colorInfo.bg,
              color: colorInfo.text
            }}
          >
            <span>{colorInfo.icon}</span>
            <span>{expense.category}</span>
          </div>

          <div className="expense-details">
            <h4 className="expense-title">{expense.title}</h4>
            <span className="expense-date">📅 {formattedDate}</span>
          </div>
        </div>

        <div className="expense-right">
          <span className="expense-amount">
            {expense.amount.toLocaleString('vi-VN')} đ
          </span>
          <button
            type="button"
            className="btn-delete"
            onClick={() => onDelete(expense.id, expense.title)}
            title="Xóa khoản chi này"
          >
            🗑️ Xóa
          </button>
        </div>
      </li>
    );
  }
}

export default ExpenseItem;

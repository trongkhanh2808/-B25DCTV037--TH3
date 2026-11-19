import React, { Component } from 'react';
import ExpenseItem from './ExpenseItem';

class ExpenseList extends Component {
  render() {
    const { expenses, onDelete, filterCategory } = this.props;

    if (expenses.length === 0) {
      return (
        <div className="empty-state">
          <p>Chưa có khoản chi nào.</p>
        </div>
      );
    }

    return (
      <ul className="expense-list">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={onDelete}
          />
        ))}
      </ul>
    );
  }
}

export default ExpenseList;

import React, { Component } from 'react';
import ExpenseItem from './ExpenseItem';

class ExpenseList extends Component {
  render() {
    const { expenses, onDelete, filterCategory } = this.props;

    if (expenses.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p className="empty-title">Không tìm thấy khoản chi nào</p>
          <p className="empty-subtitle">
            {filterCategory === 'Tất cả'
              ? 'Hãy thêm khoản chi đầu tiên của bạn bằng form phía trên.'
              : `Hiện chưa có khoản chi nào thuộc danh mục "${filterCategory}".`}
          </p>
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

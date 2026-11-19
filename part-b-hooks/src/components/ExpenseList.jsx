import React from 'react';
import ExpenseItem from './ExpenseItem';

function ExpenseList({
  expenses,
  onDelete,
  filterCategory,
  searchTerm,
  loading,
  error,
  onRetry
}) {
  // Dang tai du lieu
  if (loading) {
    return (
      <div className="state-container">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  // Co loi xay ra
  if (error) {
    return (
      <div className="state-container">
        <p style={{ color: 'red' }}>Lỗi: {error}</p>
        {onRetry && (
          <button type="button" className="btn btn-secondary" onClick={onRetry}>
            Thử lại
          </button>
        )}
      </div>
    );
  }

  // Danh sach trong
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

export default ExpenseList;

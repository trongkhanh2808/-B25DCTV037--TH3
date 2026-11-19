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
  // Trạng thái đang tải (Loading state)
  if (loading) {
    return (
      <div className="state-container loading-state">
        <div className="spinner" />
        <p className="state-title">Đang đồng bộ dữ liệu với API...</p>
        <p className="state-subtitle">Vui lòng chờ trong giây lát</p>
      </div>
    );
  }

  // Trạng thái lỗi (Error state)
  if (error) {
    return (
      <div className="state-container error-state">
        <div className="state-icon">⚠️</div>
        <p className="state-title">Đã xảy ra sự cố!</p>
        <p className="state-subtitle">{error}</p>
        {onRetry && (
          <button type="button" className="btn btn-primary btn-retry" onClick={onRetry}>
            🔄 Thử tải lại
          </button>
        )}
      </div>
    );
  }

  // Trạng thái danh sách rỗng (Empty state)
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <p className="empty-title">Không tìm thấy khoản chi nào</p>
        <p className="empty-subtitle">
          {searchTerm
            ? `Không có kết quả khớp với từ khóa "${searchTerm}".`
            : filterCategory === 'Tất cả'
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

export default ExpenseList;

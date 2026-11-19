import React from 'react';

function ExpenseSummary({
  filteredTotal,
  filteredCount,
  totalExpenses,
  totalCount,
  filterCategory,
  searchTerm
}) {
  return (
    <div className="summary-banner">
      <div className="summary-left">
        <span className="summary-tag">
          {filterCategory === 'Tất cả'
            ? 'Tất cả danh mục'
            : `Danh mục: ${filterCategory}`}
          {searchTerm ? ` • Tìm kiếm: "${searchTerm}"` : ''}
        </span>
        <span className="summary-subtext">
          Hiển thị <strong>{filteredCount}</strong> / {totalCount} khoản chi
        </span>
      </div>

      <div className="summary-right">
        <span className="summary-label">Tổng tiền chi tiêu:</span>
        <span className="summary-amount">
          {filteredTotal.toLocaleString('vi-VN')} đ
        </span>
        {(filterCategory !== 'Tất cả' || searchTerm) && (
          <span className="summary-all">
            (Tổng toàn bộ: {totalExpenses.toLocaleString('vi-VN')} đ)
          </span>
        )}
      </div>
    </div>
  );
}

export default ExpenseSummary;

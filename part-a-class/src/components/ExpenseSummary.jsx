import React, { Component } from 'react';

class ExpenseSummary extends Component {
  render() {
    const { filteredTotal, filteredCount, totalExpenses, totalCount, filterCategory } =
      this.props;

    return (
      <div className="summary-banner">
        <div className="summary-left">
          <span className="summary-tag">
            {filterCategory === 'Tất cả'
              ? 'Tất cả danh mục'
              : `Danh mục: ${filterCategory}`}
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
          {filterCategory !== 'Tất cả' && (
            <span className="summary-all">
              (Tổng toàn bộ: {totalExpenses.toLocaleString('vi-VN')} đ)
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default ExpenseSummary;

import React, { Component } from 'react';
import { CATEGORIES, CATEGORY_COLORS } from '../data/initialExpenses';

class CategoryStats extends Component {
  render() {
    const { expenses } = this.props;

    const totalAll = expenses.reduce((sum, item) => sum + item.amount, 0);

    const stats = CATEGORIES.map((cat) => {
      const catExpenses = expenses.filter((e) => e.category === cat);
      const catTotal = catExpenses.reduce((sum, e) => sum + e.amount, 0);
      const percentage = totalAll > 0 ? ((catTotal / totalAll) * 100).toFixed(1) : '0';
      return {
        category: cat,
        total: catTotal,
        count: catExpenses.length,
        percentage
      };
    });

    return (
      <section className="card stats-card">
        <h3 className="stats-heading">Thống kê chi tiêu theo từng loại</h3>
        <div className="stats-grid">
          {stats.map((item) => {
            const colorInfo = CATEGORY_COLORS[item.category];
            return (
              <div
                key={item.category}
                className="stat-box"
                style={{
                  borderLeftColor: colorInfo?.border || '#cbd5e1'
                }}
              >
                <div className="stat-header">
                  <span className="stat-title">
                    {colorInfo?.icon} {item.category}
                  </span>
                  <span className="stat-count">{item.count} mục</span>
                </div>
                <div className="stat-amount">
                  {item.total.toLocaleString('vi-VN')} đ
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: colorInfo?.text || '#3b82f6'
                    }}
                  />
                </div>
                <div className="stat-footer">{item.percentage}% tổng chi</div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

export default CategoryStats;

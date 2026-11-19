import React, { Component } from 'react';
import { CATEGORIES, CATEGORY_COLORS } from '../data/initialExpenses';

class ExpenseFilter extends Component {
  render() {
    const { currentFilter, onFilterChange, expenses } = this.props;

    const filterOptions = ['Tất cả', ...CATEGORIES];

    return (
      <div className="filter-container">
        <span className="filter-label">Lọc theo loại:</span>
        <div className="filter-buttons">
          {filterOptions.map((option) => {
            const isActive = currentFilter === option;
            const count =
              option === 'Tất cả'
                ? expenses.length
                : expenses.filter((e) => e.category === option).length;

            return (
              <button
                key={option}
                type="button"
                className={`btn-filter ${isActive ? 'active' : ''}`}
                onClick={() => onFilterChange(option)}
              >
                {option !== 'Tất cả' && (
                  <span className="filter-cat-icon">
                    {CATEGORY_COLORS[option]?.icon || '🏷️'}
                  </span>
                )}
                <span>{option}</span>
                <span className="filter-badge">{count}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ExpenseFilter;

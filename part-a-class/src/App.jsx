import React, { Component } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import CategoryStats from './components/CategoryStats';
import { initialExpenses } from './data/initialExpenses';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: initialExpenses,
      filterCategory: 'Tất cả',
      showClock: true
    };

    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleDeleteExpense = this.handleDeleteExpense.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleToggleClock = this.handleToggleClock.bind(this);
  }

  componentDidMount() {
    this.updateTitle();
  }

  // Yeu cau 4: Cap nhat tieu de tab bang componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.expenses !== this.state.expenses ||
      prevState.filterCategory !== this.state.filterCategory
    ) {
      this.updateTitle();
    }
  }

  updateTitle() {
    const total = this.state.expenses.reduce((sum, item) => sum + item.amount, 0);
    document.title = `Tổng chi: ${total.toLocaleString('vi-VN')} đ - Sổ chi tiêu`;
  }

  handleAddExpense(newExpense) {
    this.setState((prevState) => ({
      expenses: [newExpense, ...prevState.expenses]
    }));
  }

  // Yeu cau 3: Xoa co xac nhan
  handleDeleteExpense(id, title) {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${title}" không?`)) {
      this.setState((prevState) => ({
        expenses: prevState.expenses.filter((item) => item.id !== id)
      }));
    }
  }

  handleFilterChange(category) {
    this.setState({ filterCategory: category });
  }

  handleToggleClock() {
    this.setState((prevState) => ({
      showClock: !prevState.showClock
    }));
  }

  render() {
    const { expenses, filterCategory, showClock } = this.state;

    // Loc danh sach theo loai
    const filteredExpenses =
      filterCategory === 'Tất cả'
        ? expenses
        : expenses.filter((e) => e.category === filterCategory);

    const totalAll = expenses.reduce((sum, item) => sum + item.amount, 0);
    const totalFiltered = filteredExpenses.reduce((sum, item) => sum + item.amount, 0);

    return (
      <div className="app-container">
        <Header
          showClock={showClock}
          onToggleClock={this.handleToggleClock}
        />

        <main className="main-content">
          <div className="layout-grid">
            <div className="layout-left">
              <ExpenseForm onAddExpense={this.handleAddExpense} />
              <CategoryStats expenses={expenses} />
            </div>

            <div className="layout-right">
              <div className="card">
                <h2>Danh sách khoản chi</h2>

                <ExpenseFilter
                  currentFilter={filterCategory}
                  onFilterChange={this.handleFilterChange}
                  expenses={expenses}
                />

                <ExpenseSummary
                  filteredTotal={totalFiltered}
                  filteredCount={filteredExpenses.length}
                  totalExpenses={totalAll}
                  totalCount={expenses.length}
                  filterCategory={filterCategory}
                />

                <ExpenseList
                  expenses={filteredExpenses}
                  onDelete={this.handleDeleteExpense}
                  filterCategory={filterCategory}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;

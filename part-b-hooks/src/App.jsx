import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import CategoryStats from './components/CategoryStats';
import SearchBar from './components/SearchBar';
import { useFetch } from './hooks/useFetch';

function App() {
  const [filterCategory, setFilterCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [showClock, setShowClock] = useState(true);

  // Hook lay, them, xoa du lieu qua mockapi
  const { data: expenses, loading, error, refetch, addExpense, deleteExpense } = useFetch();

  // Tinh tong tat ca khoan chi
  const totalAll = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  // Cap nhat tieu de tab bang useEffect
  useEffect(() => {
    document.title = `Tổng chi: ${totalAll.toLocaleString('vi-VN')} đ - Sổ chi tiêu`;
  }, [totalAll]);

  // Loc theo danh muc va tim kiem (debounce)
  const filteredExpenses = expenses.filter((item) => {
    const matchCat = filterCategory === 'Tất cả' || item.category === filterCategory;
    const matchSearch = !searchTerm.trim() || item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalFiltered = filteredExpenses.reduce((sum, item) => sum + Number(item.amount), 0);

  // Them khoan chi
  const handleAddExpense = async (newExpense) => {
    await addExpense(newExpense);
  };

  // Xoa co xac nhan
  const handleDeleteExpense = async (id, title) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${title}" không?`)) {
      await deleteExpense(id);
    }
  };

  return (
    <div className="app-container">
      <Header
        showClock={showClock}
        onToggleClock={() => setShowClock(!showClock)}
      />

      <main className="main-content">
        <div className="layout-grid">
          <div className="layout-left">
            <ExpenseForm onAddExpense={handleAddExpense} isLoading={loading} />
            <CategoryStats expenses={expenses} />
          </div>

          <div className="layout-right">
            <div className="card">
              <h2>Danh sách khoản chi</h2>
              <SearchBar onSearchChange={setSearchTerm} />
              <ExpenseFilter
                currentFilter={filterCategory}
                onFilterChange={setFilterCategory}
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
                onDelete={handleDeleteExpense}
                loading={loading}
                error={error}
                onRetry={refetch}
                filterCategory={filterCategory}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

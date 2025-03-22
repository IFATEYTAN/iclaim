import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useStore from '../store/useStore';
import TransactionsList from '../components/transactions/TransactionsList';
import TransactionFilters from '../components/transactions/TransactionFilters';
import AddTransactionButton from '../components/transactions/AddTransactionButton';
import TransactionFormModal from '../components/transactions/TransactionFormModal';

const TransactionsPage = () => {
  const { fetchTransactions, transactions, isLoading } = useStore(state => ({
    fetchTransactions: state.fetchTransactions,
    transactions: state.transactions.items,
    isLoading: state.transactions.isLoading
  }));
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    startDate: null,
    endDate: null,
    barId: '',
    type: 'all'
  });
  
  useEffect(() => {
    fetchTransactions(filterValues);
  }, [fetchTransactions, filterValues]);
  
  return (
    <>
      <Helmet>
        <title>תנועות כספיות | מערכת גורם מפנה</title>
        <meta name="description" content="ניהול תנועות כספיות במערכת" />
      </Helmet>
      
      <div className="container px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl font-bold">תנועות כספיות</h1>
          <AddTransactionButton onClick={() => setIsModalOpen(true)} />
        </div>
        
        <TransactionFilters 
          values={filterValues} 
          onChange={setFilterValues} 
        />
        
        <TransactionsList 
          transactions={transactions} 
          isLoading={isLoading}
        />
        
        {isModalOpen && (
          <TransactionFormModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={(data) => {
              // הטיפול בשמירת תנועה חדשה
            }}
          />
        )}
      </div>
    </>
  );
};

export default TransactionsPage;
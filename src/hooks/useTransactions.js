import { useEffect, useState } from 'react';
import useStore from '../store/useStore';
import { toast } from 'sonner';

export const useTransactions = (initialFilters = {}) => {
  const { 
    transactions, 
    fetchTransactions, 
    createTransaction 
  } = useStore(state => ({
    transactions: state.transactions,
    fetchTransactions: state.fetchTransactions,
    createTransaction: state.createTransaction
  }));

  const [filters, setFilters] = useState(initialFilters);
  
  useEffect(() => {
    fetchTransactions(filters);
  }, [fetchTransactions, filters]);

  const handleCreateTransaction = async (transactionData) => {
    try {
      const newTransaction = await createTransaction(transactionData);
      toast.success('התנועה הכספית נוצרה בהצלחה');
      return newTransaction;
    } catch (error) {
      toast.error(`שגיאה ביצירת התנועה הכספית: ${error.message}`);
      throw error;
    }
  };

  return {
    transactions: transactions.items,
    isLoading: transactions.isLoading,
    error: transactions.error,
    filters,
    setFilters,
    createTransaction: handleCreateTransaction,
  };
};

export default useTransactions;

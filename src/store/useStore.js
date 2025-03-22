import { create } from 'zustand';
import * as api from '../lib/api';

const useStore = create((set, get) => ({
  // ========== מצב אימות משתמש ==========
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },

  // ========== דשבורד ==========
  dashboard: {
    stats: {
      totalBars: 0,
      activeReferrals: 0,
      monthlyRevenue: 0,
      growthRate: 0,
    },
    recentTransactions: [],
    topBars: [],
    isLoading: false,
    error: null,
  },

  // ========== ברים ==========
  bars: {
    items: [],
    isLoading: false,
    error: null,
  },

  // ========== תנועות כספיות ==========
  transactions: {
    items: [],
    isLoading: false,
    error: null,
  },

  // ========== פעולות אימות ==========
  login: async (credentials) => {
    set((state) => ({
      auth: { ...state.auth, isLoading: true, error: null }
    }));

    try {
      const userData = await api.auth.login(credentials);
      set((state) => ({
        auth: {
          ...state.auth,
          user: userData,
          isAuthenticated: true,
          isLoading: false,
        }
      }));
      return userData;
    } catch (error) {
      set((state) => ({
        auth: {
          ...state.auth,
          error: error.message,
          isLoading: false
        }
      }));
      throw error;
    }
  },

  logout: async () => {
    set((state) => ({
      auth: { ...state.auth, isLoading: true }
    }));

    try {
      await api.auth.logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }

    set((state) => ({
      auth: {
        ...state.auth,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }
    }));
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    set((state) => ({
      auth: { ...state.auth, isLoading: true }
    }));

    try {
      const userData = await api.auth.getCurrentUser();
      set((state) => ({
        auth: {
          ...state.auth,
          user: userData,
          isAuthenticated: true,
          isLoading: false,
        }
      }));
    } catch (error) {
      localStorage.removeItem('token');
      set((state) => ({
        auth: {
          ...state.auth,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        }
      }));
    }
  },

  // ========== פעולות דשבורד ==========
  fetchDashboardData: async () => {
    set((state) => ({
      dashboard: { ...state.dashboard, isLoading: true }
    }));

    try {
      const data = await api.dashboard.getSummary();
      set((state) => ({
        dashboard: {
          ...state.dashboard,
          stats: data.stats,
          recentTransactions: data.recentTransactions,
          topBars: data.topBars,
          isLoading: false,
        }
      }));
    } catch (error) {
      set((state) => ({
        dashboard: {
          ...state.dashboard,
          error: error.message,
          isLoading: false,
        }
      }));
    }
  },

  // ========== פעולות ברים ==========
  fetchBars: async (filters = {}) => {
    set((state) => ({
      bars: { ...state.bars, isLoading: true }
    }));

    try {
      const bars = await api.bars.getAll(filters);
      set((state) => ({
        bars: {
          ...state.bars,
          items: bars,
          isLoading: false,
        }
      }));
    } catch (error) {
      set((state) => ({
        bars: {
          ...state.bars,
          error: error.message,
          isLoading: false,
        }
      }));
    }
  },

  getBarById: async (id) => {
    set((state) => ({
      bars: { ...state.bars, isLoading: true }
    }));

    try {
      const bar = await api.bars.getById(id);
      return bar;
    } catch (error) {
      set((state) => ({
        bars: {
          ...state.bars,
          error: error.message,
          isLoading: false,
        }
      }));
      throw error;
    } finally {
      set((state) => ({
        bars: { ...state.bars, isLoading: false }
      }));
    }
  },

  createBar: async (barData) => {
    set((state) => ({
      bars: { ...state.bars, isLoading: true }
    }));

    try {
      const newBar = await api.bars.create(barData);
      set((state) => ({
        bars: {
          ...state.bars,
          items: [...state.bars.items, newBar],
          isLoading: false,
        }
      }));
      return newBar;
    } catch (error) {
      set((state) => ({
        bars: {
          ...state.bars,
          error: error.message,
          isLoading: false,
        }
      }));
      throw error;
    }
  },

  updateBar: async (id, barData) => {
    set((state) => ({
      bars: { ...state.bars, isLoading: true }
    }));

    try {
      const updatedBar = await api.bars.update(id, barData);
      set((state) => ({
        bars: {
          ...state.bars,
          items: state.bars.items.map(bar => 
            bar.id === id ? updatedBar : bar
          ),
          isLoading: false,
        }
      }));
      return updatedBar;
    } catch (error) {
      set((state) => ({
        bars: {
          ...state.bars,
          error: error.message,
          isLoading: false,
        }
      }));
      throw error;
    }
  },

  deleteBar: async (id) => {
    set((state) => ({
      bars: { ...state.bars, isLoading: true }
    }));

    try {
      await api.bars.delete(id);
      set((state) => ({
        bars: {
          ...state.bars,
          items: state.bars.items.filter(bar => bar.id !== id),
          isLoading: false,
        }
      }));
    } catch (error) {
      set((state) => ({
        bars: {
          ...state.bars,
          error: error.message,
          isLoading: false,
        }
      }));
      throw error;
    }
  },

  // ========== פעולות תנועות כספיות ==========
  fetchTransactions: async (filters = {}) => {
    set((state) => ({
      transactions: { ...state.transactions, isLoading: true }
    }));

    try {
      const transactions = await api.transactions.getAll(filters);
      set((state) => ({
        transactions: {
          ...state.transactions,
          items: transactions,
          isLoading: false,
        }
      }));
    } catch (error) {
      set((state) => ({
        transactions: {
          ...state.transactions,
          error: error.message,
          isLoading: false,
        }
      }));
    }
  },

  getTransactionById: async (id) => {
    set((state) => ({
      transactions: { ...state.transactions, isLoading: true }
    }));

    try {
      const transaction = await api.transactions.getById(id);
      return transaction;
    } catch (error) {
      set((state) => ({
        transactions: {
          ...state.transactions,
          error: error.message,
          isLoading: false,
        }
      }));
      throw error;
    } finally {
      set((state) => ({
        transactions: { ...state.transactions, isLoading: false }
      }));
    }
  },

  createTransaction: async (transactionData) => {
    set((state) => ({
      transactions: { ...state.transactions, isLoading: true }
    }));

    try {
      const newTransaction = await api.transactions.create(transactionData);
      set((state) => ({
        transactions: {
          ...state.transactions,
          items: [...state.transactions.items, newTransaction],
          isLoading: false,
        }
      }));
      return newTransaction;
    } catch (error) {
      set((state) => ({
        transactions: {
          ...state.transactions,
          error: error.message,
          isLoading: false,
        }
      }));
      throw error;
    }
  },
}));

export default useStore;

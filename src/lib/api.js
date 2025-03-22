// /src/lib/api.js
import useStore from '../store/useStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * פונקציית עזר לביצוע בקשות HTTP
 */
async function fetchWithAuth(endpoint, options = {}) {
  const store = useStore.getState();
  const { auth } = store;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  // הוספת טוקן אימות אם יש
  if (auth.user?.token) {
    defaultHeaders['Authorization'] = `Bearer ${auth.user.token}`;
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
  
  // בדיקת סטטוס התגובה
  if (!response.ok) {
    // אם יש בעיה בהרשאות, ניתוק משתמש
    if (response.status === 401) {
      store.logout();
    }
    
    // הכנת הודעת שגיאה
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || 'אירעה שגיאה בתקשורת עם השרת');
    error.status = response.status;
    error.data = errorData;
    throw error;
  }
  
  // החזרת הנתונים אם הכל בסדר
  return response.json();
}

/**
 * שירותי אימות משתמש
 */
export const authAPI = {
  login: async (credentials) => {
    const store = useStore.getState();
    store.setAuthLoading(true);
    
    try {
      const data = await fetchWithAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      store.login(data);
      return data;
    } catch (error) {
      store.setAuthError(error.message);
      throw error;
    }
  },
  
  logout: async () => {
    const store = useStore.getState();
    
    try {
      await fetchWithAuth('/auth/logout', {
        method: 'POST',
      });
      
      store.logout();
    } catch (error) {
      console.error('Error during logout:', error);
      // מתנתקים גם במקרה של שגיאה
      store.logout();
    }
  },
  
  register: async (userData) => {
    return fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
};

/**
 * שירותי ניהול ברים
 */
export const barsAPI = {
  getAll: async () => {
    const store = useStore.getState();
    store.setBarsLoading(true);
    
    try {
      const data = await fetchWithAuth('/bars');
      store.setBars(data);
      return data;
    } catch (error) {
      store.setBarsError(error.message);
      throw error;
    }
  },
  
  getById: async (id) => {
    return fetchWithAuth(`/bars/${id}`);
  },
  
  create: async (barData) => {
    const store = useStore.getState();
    
    try {
      const data = await fetchWithAuth('/bars', {
        method: 'POST',
        body: JSON.stringify(barData),
      });
      
      store.addBar(data);
      return data;
    } catch (error) {
      store.setBarsError(error.message);
      throw error;
    }
  },
  
  update: async (id, barData) => {
    const store = useStore.getState();
    
    try {
      const data = await fetchWithAuth(`/bars/${id}`, {
        method: 'PUT',
        body: JSON.stringify(barData),
      });
      
      store.updateBar(data);
      return data;
    } catch (error) {
      store.setBarsError(error.message);
      throw error;
    }
  },
  
  delete: async (id) => {
    const store = useStore.getState();
    
    try {
      await fetchWithAuth(`/bars/${id}`, {
        method: 'DELETE',
      });
      
      store.deleteBar(id);
    } catch (error) {
      store.setBarsError(error.message);
      throw error;
    }
  },
};

/**
 * שירותי ניהול תנועות כספיות
 */
export const transactionsAPI = {
  getAll: async (filters = {}) => {
    const store = useStore.getState();
    store.setTransactionsLoading(true);
    
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    
    try {
      const data = await fetchWithAuth(`/transactions${queryString}`);
      store.setTransactions(data);
      return data;
    } catch (error) {
      store.setTransactionsError(error.message);
      throw error;
    }
  },
  
  getById: async (id) => {
    return fetchWithAuth(`/transactions/${id}`);
  },
  
  create: async (transactionData) => {
    const store = useStore.getState();
    
    try {
      const data = await fetchWithAuth('/transactions', {
        method: 'POST',
        body: JSON.stringify(transactionData),
      });
      
      store.addTransaction(data);
      return data;
    } catch (error) {
      store.setTransactionsError(error.message);
      throw error;
    }
  },
};

export default {
  auth: authAPI,
  bars: barsAPI,
  transactions: transactionsAPI,
};

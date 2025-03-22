// קבוע לקידומת ה-API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// פונקציה לטיפול בבקשות
const handleRequest = async (url, options = {}) => {
  try {
    // הוספת טוקן אימות אם קיים
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
    });

    // בדיקת סטטוס התגובה
    if (!response.ok) {
      if (response.status === 401) {
        // במקרה של בעיית אימות, מנקה את הטוקן
        localStorage.removeItem('token');
      }
      
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.message || 'שגיאה בתקשורת עם השרת');
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    // כאשר התגובה תקינה
    if (response.status === 204) {
      return null; // אין תוכן
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// =============== שירותי אימות ===============
export const auth = {
  // התחברות למערכת
  login: async (credentials) => {
    const data = await handleRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // שמירת הטוקן בלוקל סטורג'
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data.user;
  },
  
  // התנתקות מהמערכת
  logout: async () => {
    localStorage.removeItem('token');
    return handleRequest('/auth/logout', {
      method: 'POST',
    });
  },
  
  // בדיקת משתמש נוכחי
  getCurrentUser: async () => {
    return handleRequest('/auth/me');
  },
  
  // רישום למערכת
  register: async (userData) => {
    return handleRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
};

// =============== שירותי דשבורד ===============
export const dashboard = {
  // קבלת נתוני סיכום
  getSummary: async () => {
    return handleRequest('/dashboard/summary');
  },
};

// =============== שירותי ברים ===============
export const bars = {
  // קבלת כל הברים
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    // הוספת פרמטרים לפילטרים
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString() 
      ? `?${queryParams.toString()}` 
      : '';
    
    return handleRequest(`/bars${queryString}`);
  },
  
  // קבלת בר לפי מזהה
  getById: async (id) => {
    return handleRequest(`/bars/${id}`);
  },
  
  // יצירת בר חדש
  create: async (barData) => {
    return handleRequest('/bars', {
      method: 'POST',
      body: JSON.stringify(barData),
    });
  },
  
  // עדכון בר קיים
  update: async (id, barData) => {
    return handleRequest(`/bars/${id}`, {
      method: 'PUT',
      body: JSON.stringify(barData),
    });
  },
  
  // מחיקת בר
  delete: async (id) => {
    return handleRequest(`/bars/${id}`, {
      method: 'DELETE',
    });
  },
};

// =============== שירותי תנועות כספיות ===============
export const transactions = {
  // קבלת כל התנועות
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    // הוספת פרמטרים לפילטרים
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString() 
      ? `?${queryParams.toString()}` 
      : '';
    
    return handleRequest(`/transactions${queryString}`);
  },
  
  // קבלת תנועה לפי מזהה
  getById: async (id) => {
    return handleRequest(`/transactions/${id}`);
  },
  
  // יצירת תנועה חדשה
  create: async (transactionData) => {
    return handleRequest('/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    });
  },
};

// ייצוא כל השירותים
export default {
  auth,
  dashboard,
  bars,
  transactions,
};
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// פונקציית עזר לשילוב מחלקות Tailwind
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// פורמט סכומים כספיים
export function formatCurrency(amount) {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    minimumFractionDigits: 2,
  }).format(amount);
}

// פורמט תאריכים לפורמט עברי
export function formatDate(date) {
  if (!date) return '';
  
  return new Intl.DateTimeFormat('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

// פורמט תאריך ושעה
export function formatDateTime(date) {
  if (!date) return '';
  
  return new Intl.DateTimeFormat('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

// יצירת מזהה ייחודי
export function generateId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// בדיקה אם אובייקט ריק
export function isEmptyObject(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

// קבלת שם מקוצר
export function getInitials(name) {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

// פורמט מספר טלפון
export function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) return '';
  
  // ניקוי מספר הטלפון
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // פורמט לפי תבנית ישראלית
  if (cleaned.length === 10) {
    return `${cleaned.substring(0, 3)}-${cleaned.substring(3, 10)}`;
  }
  
  return phoneNumber;
}

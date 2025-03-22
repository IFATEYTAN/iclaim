import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Loader2 } from 'lucide-react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  const { login, isLoading } = useStore(state => ({
    login: state.login,
    isLoading: state.auth.isLoading
  }));
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'שגיאה בהתחברות, אנא נסה שוב.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-white bg-destructive rounded">
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">דוא"ל</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">סיסמה</Label>
          <a href="#" className="text-sm text-primary hover:underline">
            שכחת סיסמה?
          </a>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          required
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            מתחבר...
          </>
        ) : (
          'התחבר'
        )}
      </Button>
    </form>
  );
};

export default LoginForm;

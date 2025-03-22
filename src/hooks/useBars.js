import { useEffect, useState } from 'react';
import useStore from '../store/useStore';
import { toast } from 'sonner';

export const useBars = (initialFilters = {}) => {
  const { 
    bars, 
    fetchBars, 
    createBar,
    updateBar,
    deleteBar
  } = useStore(state => ({
    bars: state.bars,
    fetchBars: state.fetchBars,
    createBar: state.createBar,
    updateBar: state.updateBar,
    deleteBar: state.deleteBar
  }));

  const [filters, setFilters] = useState(initialFilters);
  
  useEffect(() => {
    fetchBars(filters);
  }, [fetchBars, filters]);

  const handleCreateBar = async (barData) => {
    try {
      const newBar = await createBar(barData);
      toast.success('הבר נוצר בהצלחה');
      return newBar;
    } catch (error) {
      toast.error(`שגיאה ביצירת הבר: ${error.message}`);
      throw error;
    }
  };

  const handleUpdateBar = async (id, barData) => {
    try {
      const updatedBar = await updateBar(id, barData);
      toast.success('הבר עודכן בהצלחה');
      return updatedBar;
    } catch (error) {
      toast.error(`שגיאה בעדכון הבר: ${error.message}`);
      throw error;
    }
  };

  const handleDeleteBar = async (id) => {
    try {
      await deleteBar(id);
      toast.success('הבר נמחק בהצלחה');
    } catch (error) {
      toast.error(`שגיאה במחיקת הבר: ${error.message}`);
      throw error;
    }
  };

  return {
    bars: bars.items,
    isLoading: bars.isLoading,
    error: bars.error,
    filters,
    setFilters,
    createBar: handleCreateBar,
    updateBar: handleUpdateBar,
    deleteBar: handleDeleteBar,
  };
};

export default useBars;

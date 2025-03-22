import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useStore from '../store/useStore';
import BarsList from '../components/bars/BarsList';
import BarFilters from '../components/bars/BarFilters';
import AddBarButton from '../components/bars/AddBarButton';
import BarFormModal from '../components/bars/BarFormModal';

const BarsPage = () => {
  const { fetchBars, bars, isLoading } = useStore(state => ({
    fetchBars: state.fetchBars,
    bars: state.bars.items,
    isLoading: state.bars.isLoading
  }));
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    search: '',
    status: 'all'
  });
  
  useEffect(() => {
    fetchBars(filterValues);
  }, [fetchBars, filterValues]);
  
  return (
    <>
      <Helmet>
        <title>ניהול ברים | מערכת גורם מפנה</title>
        <meta name="description" content="ניהול ברים במערכת" />
      </Helmet>
      
      <div className="container px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl font-bold">ניהול ברים</h1>
          <AddBarButton onClick={() => setIsModalOpen(true)} />
        </div>
        
        <BarFilters 
          values={filterValues} 
          onChange={setFilterValues} 
        />
        
        <BarsList 
          bars={bars} 
          isLoading={isLoading} 
          onEdit={(bar) => {
            // הטיפול בעריכת בר
          }}
          onDelete={(barId) => {
            // הטיפול במחיקת בר
          }}
        />
        
        {isModalOpen && (
          <BarFormModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={(data) => {
              // הטיפול בשמירת בר חדש
            }}
          />
        )}
      </div>
    </>
  );
};

export default BarsPage;

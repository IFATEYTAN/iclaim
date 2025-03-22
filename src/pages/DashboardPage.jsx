import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import useStore from '../store/useStore';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import TopBars from '../components/dashboard/TopBars';

const DashboardPage = () => {
  const { fetchDashboardData, dashboard } = useStore(state => ({
    fetchDashboardData: state.fetchDashboardData,
    dashboard: state.dashboard
  }));

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <>
      <Helmet>
        <title>דשבורד | מערכת גורם מפנה</title>
        <meta name="description" content="דשבורד ניהול גורמים מפנים" />
      </Helmet>
      
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">דשבורד</h1>
        
        <DashboardStats stats={dashboard.stats} isLoading={dashboard.isLoading} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <RecentTransactions 
            transactions={dashboard.recentTransactions} 
            isLoading={dashboard.isLoading} 
          />
          <TopBars 
            bars={dashboard.topBars} 
            isLoading={dashboard.isLoading} 
          />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

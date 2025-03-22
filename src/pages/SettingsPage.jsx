import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import ProfileSettings from '../components/settings/ProfileSettings';
import SystemSettings from '../components/settings/SystemSettings';
import NotificationSettings from '../components/settings/NotificationSettings';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <>
      <Helmet>
        <title>הגדרות | מערכת גורם מפנה</title>
        <meta name="description" content="הגדרות מערכת" />
      </Helmet>
      
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">הגדרות</h1>
        
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">פרופיל</TabsTrigger>
            <TabsTrigger value="system">מערכת</TabsTrigger>
            <TabsTrigger value="notifications">התראות</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>
          
          <TabsContent value="system">
            <SystemSettings />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default SettingsPage;
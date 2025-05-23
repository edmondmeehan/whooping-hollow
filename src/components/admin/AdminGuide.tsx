
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusIcon, LockIcon } from 'lucide-react';
import { useGuideSections } from '@/hooks/use-guide-sections';
import { useGuideCredentials } from '@/hooks/use-guide-credentials';
import GuideCredentialsCard from './guide/GuideCredentialsCard';
import GuideTabContent from './guide/GuideTabContent';

const AdminGuide = () => {
  const {
    guideSections,
    activeTab,
    editingSection,
    setActiveTab,
    setEditingSection,
    handleEditSection,
    handleUpdateSection,
    handleAddSection,
    handleDeleteSection
  } = useGuideSections();
  
  const {
    guideCredentials,
    showCredentials,
    setGuideCredentials,
    setShowCredentials,
    handleUpdateCredentials
  } = useGuideCredentials();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Guide Content</h2>
        <div className="flex space-x-2">
          <Button onClick={handleAddSection}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="welcome">Welcome</TabsTrigger>
          <TabsTrigger value="house">House Info</TabsTrigger>
          <TabsTrigger value="local">Local Area</TabsTrigger>
          <TabsTrigger value="checkout">Check-out</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
        </TabsList>
        
        {Object.keys(guideSections).map(tabKey => (
          <GuideTabContent
            key={tabKey}
            tabKey={tabKey}
            sections={guideSections[tabKey]}
            editingSection={editingSection}
            setEditingSection={setEditingSection}
            handleEditSection={handleEditSection}
            handleUpdateSection={handleUpdateSection}
            handleDeleteSection={handleDeleteSection}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default AdminGuide;

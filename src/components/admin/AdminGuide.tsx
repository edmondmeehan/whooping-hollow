
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { SaveIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample guide sections data
const initialGuideSections = {
  welcome: [
    {
      id: 'welcome-1',
      title: 'Welcome to Whooping Hollow',
      content: 'Welcome to 26 Whooping Hollow in East Hampton! We\'re delighted to have you stay with us. This guide contains everything you need to know to make your stay comfortable and enjoyable.'
    },
    {
      id: 'welcome-2',
      title: 'House Rules',
      content: 'Please observe the following rules during your stay:\n- No smoking inside the house\n- No parties or events without prior approval\n- Please be mindful of noise levels, especially after 10 PM\n- No pets allowed without prior approval'
    },
    {
      id: 'welcome-3',
      title: 'Wi-Fi Information',
      content: 'Network Name: WhoopingHollow_Guest\nPassword: HamptonStay2023'
    }
  ],
  house: [
    {
      id: 'house-1',
      title: 'Check-in Instructions',
      content: 'Check-in time is 3:00 PM. Early check-in may be available upon request.\nTo access the property:\n1. Locate the lockbox to the right of the front door\n2. Enter the code: 4578\n3. Take the key and unlock the front door'
    },
    {
      id: 'house-2',
      title: 'Appliance Instructions',
      content: 'Kitchen Appliances:\n- Oven: Turn the dial to select temperature. Press the "Start" button to begin preheating.\n- Dishwasher: Add detergent to the dispenser, select cycle, and press "Start".\n- Coffee Maker: Add water to the reservoir, place coffee grounds in the filter, and press the power button.'
    },
    {
      id: 'house-3',
      title: 'Trash & Recycling Information',
      content: 'Trash and recycling bins are located on the side of the house. Please separate your waste according to these guidelines:\n- Trash (Black Bin): Food waste, plastic wrap, non-recyclable items\n- Recycling (Blue Bin): Glass bottles, plastic containers, paper, metal cans'
    }
  ],
  local: [
    {
      id: 'local-1',
      title: 'Directions & Location',
      content: 'Our property is located at 26 Whooping Hollow, East Hampton, NY.'
    },
    {
      id: 'local-2',
      title: 'Local Recommendations',
      content: 'Restaurants:\n- Nick & Toni\'s: Upscale Italian, reservation recommended\n- Rowdy Hall: Casual pub fare, great for lunch\n- The 1770 House: Fine dining in historic setting'
    },
    {
      id: 'local-3',
      title: 'Transportation & Parking',
      content: 'Our driveway can accommodate up to 3 vehicles. Street parking is also available without restrictions.'
    }
  ],
  checkout: [
    {
      id: 'checkout-1',
      title: 'Check-out Instructions',
      content: 'Check-out time is 11:00 AM. Late check-out may be available upon request.\nBefore departing, please:\n- Wash and put away all dishes, or start the dishwasher\n- Remove all food from the refrigerator\n- Take out all trash and recycling to the appropriate bins'
    }
  ],
  emergency: [
    {
      id: 'emergency-1',
      title: 'Emergency Contacts',
      content: 'In case of emergency, dial 911\nOur exact address is: 26 Whooping Hollow Road, East Hampton, NY\n\nProperty Manager: (631) 555-1234\nEast Hampton Hospital: (631) 324-8400\nPolice (Non-Emergency): (631) 324-0777'
    }
  ]
};

type GuideSection = {
  id: string;
  title: string;
  content: string;
};

type GuideSections = {
  [key: string]: GuideSection[];
};

const AdminGuide = () => {
  const [guideSections, setGuideSections] = useState<GuideSections>(initialGuideSections);
  const [activeTab, setActiveTab] = useState('welcome');
  const [editingSection, setEditingSection] = useState<GuideSection | null>(null);
  const { toast } = useToast();

  const handleEditSection = (section: GuideSection) => {
    setEditingSection(section);
  };

  const handleUpdateSection = () => {
    if (!editingSection) return;
    
    const updatedSections = { ...guideSections };
    const sectionIndex = updatedSections[activeTab].findIndex(s => s.id === editingSection.id);
    
    if (sectionIndex !== -1) {
      updatedSections[activeTab][sectionIndex] = editingSection;
      setGuideSections(updatedSections);
      setEditingSection(null);
      
      toast({
        title: 'Section Updated',
        description: 'Guide section has been updated successfully',
      });
    }
  };

  const handleAddSection = () => {
    const newSection: GuideSection = {
      id: `${activeTab}-${Date.now()}`,
      title: 'New Section',
      content: 'Enter content here'
    };
    
    const updatedSections = { ...guideSections };
    updatedSections[activeTab] = [...updatedSections[activeTab], newSection];
    setGuideSections(updatedSections);
    
    toast({
      title: 'Section Added',
      description: 'New guide section has been added',
    });
  };

  const handleDeleteSection = (sectionId: string) => {
    const updatedSections = { ...guideSections };
    updatedSections[activeTab] = updatedSections[activeTab].filter(s => s.id !== sectionId);
    setGuideSections(updatedSections);
    
    toast({
      title: 'Section Deleted',
      description: 'Guide section has been deleted',
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Guide Content</h2>
        <Button onClick={handleAddSection}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Section
        </Button>
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
          <TabsContent key={tabKey} value={tabKey}>
            <div className="space-y-6">
              {guideSections[tabKey].map(section => (
                <Card key={section.id}>
                  <CardContent className="pt-6">
                    {editingSection && editingSection.id === section.id ? (
                      <div className="space-y-4">
                        <Input
                          value={editingSection.title}
                          onChange={(e) => setEditingSection({
                            ...editingSection,
                            title: e.target.value
                          })}
                          placeholder="Section Title"
                          className="font-medium text-lg"
                        />
                        <Textarea
                          value={editingSection.content}
                          onChange={(e) => setEditingSection({
                            ...editingSection,
                            content: e.target.value
                          })}
                          placeholder="Section Content"
                          rows={6}
                          className="font-normal"
                        />
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            onClick={() => setEditingSection(null)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleUpdateSection}
                          >
                            <SaveIcon className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-lg mb-2">{section.title}</h3>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditSection(section)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteSection(section.id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="whitespace-pre-line text-gray-700">{section.content}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminGuide;

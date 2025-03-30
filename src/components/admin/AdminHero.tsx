
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useHeroFeatures, HeroFeature } from '@/hooks/use-hero-features';
import HeroFeatureForm, { HeroFeatureFormValues } from './hero/HeroFeatureForm';
import HeroFeatureCarousel from './hero/HeroFeatureCarousel';

const AdminHero = () => {
  const { heroFeatures, updateHeroFeatures } = useHeroFeatures();
  const [editingFeature, setEditingFeature] = useState<HeroFeature | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const { toast } = useToast();
  
  const handleEditFeature = (feature: HeroFeature) => {
    console.log("Edit feature clicked:", feature);
    setIsAddingNew(false);
    setEditingFeature(feature);
  };
  
  const handleAddNewFeature = () => {
    setIsAddingNew(true);
    setEditingFeature(null);
  };
  
  const handleSaveFeature = (values: HeroFeatureFormValues) => {
    console.log("Saving feature with values:", values);
    
    // Ensure all required fields have values
    const featureToSave: HeroFeature = {
      id: isAddingNew ? `feature-${Date.now()}` : (editingFeature?.id || `feature-${Date.now()}`),
      title: values.title,
      subtitle: values.subtitle,
      imageUrl: values.imageUrl,
      videoUrl: values.videoUrl || undefined
    };

    if (!isAddingNew && editingFeature) {
      // Update existing feature
      const updatedFeatures = heroFeatures.map(feature => 
        feature.id === editingFeature.id ? featureToSave : feature
      );
      
      updateHeroFeatures(updatedFeatures);
      
      toast({
        title: "Feature updated",
        description: `${values.title} has been updated.`,
      });
    } else {
      // Add new feature
      updateHeroFeatures([...heroFeatures, featureToSave]);
      
      toast({
        title: "Feature added",
        description: `${values.title} has been added to your hero features.`,
      });
    }
    
    setEditingFeature(null);
    setIsAddingNew(false);
  };
  
  const handleDeleteFeature = (featureId: string) => {
    // Don't allow deleting the last feature
    if (heroFeatures.length <= 1) {
      toast({
        title: "Cannot delete",
        description: "You must have at least one hero feature.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedFeatures = heroFeatures.filter(
      feature => feature.id !== featureId
    );
    
    updateHeroFeatures(updatedFeatures);
    
    toast({
      title: "Feature deleted",
      description: "The feature has been removed.",
    });
    
    if (editingFeature?.id === featureId) {
      setEditingFeature(null);
      setIsAddingNew(false);
    }
  };
  
  const handleCancelEdit = () => {
    setEditingFeature(null);
    setIsAddingNew(false);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Hero Features</h2>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Manage Hero Features</h3>
          <Button onClick={handleAddNewFeature} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Feature
          </Button>
        </div>
        
        {/* Feature editor form */}
        {(editingFeature !== null || isAddingNew) && (
          <HeroFeatureForm 
            editingFeature={editingFeature}
            onSave={handleSaveFeature}
            onCancel={handleCancelEdit}
          />
        )}
        
        {/* Features preview carousel */}
        {heroFeatures.length > 0 && (
          <HeroFeatureCarousel
            heroFeatures={heroFeatures}
            onEditFeature={handleEditFeature}
            onDeleteFeature={handleDeleteFeature}
          />
        )}
      </div>
    </div>
  );
};

export default AdminHero;

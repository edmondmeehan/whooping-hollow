
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SaveIcon, TrashIcon } from 'lucide-react';
import { GuideSection } from '@/types/guide';

interface GuideSectionCardProps {
  section: GuideSection;
  editingSection: GuideSection | null;
  onEdit: (section: GuideSection) => void;
  onUpdate: () => void;
  onCancelEdit: () => void;
  onDelete: (sectionId: string) => void;
  setEditingSection: React.Dispatch<React.SetStateAction<GuideSection | null>>;
}

const GuideSectionCard = ({
  section,
  editingSection,
  onEdit,
  onUpdate,
  onCancelEdit,
  onDelete,
  setEditingSection
}: GuideSectionCardProps) => {
  const isEditing = editingSection && editingSection.id === section.id;

  return (
    <Card key={section.id}>
      <CardContent className="pt-6">
        {isEditing ? (
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
                onClick={onCancelEdit}
              >
                Cancel
              </Button>
              <Button onClick={onUpdate}>
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
                  onClick={() => onEdit(section)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onDelete(section.id)}
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
  );
};

export default GuideSectionCard;

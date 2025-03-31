
import React from 'react';
import { Home, Info, Wifi } from 'lucide-react';
import GuideSection from '../GuideSection';
import { useLocalStorageSections } from '@/hooks/use-local-storage-sections';

const WelcomeTab = () => {
  const sections = useLocalStorageSections('welcome');
  
  // Extract WiFi details from the relevant section
  const wifiSection = sections.find(section => 
    section.title.toLowerCase().includes('wifi') || 
    section.title.toLowerCase().includes('network')
  );
  
  // Parse WiFi details from content or use defaults
  let wifiNetwork = "whoopinghollow";
  let wifiPassword = "26262626";
  
  if (wifiSection) {
    const content = wifiSection.content;
    const networkMatch = content.match(/network(?:\s+name)?(?:\s*:\s*|\s+)([^\n\r]+)/i);
    const passwordMatch = content.match(/password(?:\s*:\s*|\s+)([^\n\r]+)/i);
    
    if (networkMatch && networkMatch[1]) wifiNetwork = networkMatch[1].trim();
    if (passwordMatch && passwordMatch[1]) wifiPassword = passwordMatch[1].trim();
  }

  // Render icons based on section title
  const getSectionIcon = (title: string) => {
    if (title.toLowerCase().includes('wifi')) return <Wifi />;
    if (title.toLowerCase().includes('rule')) return <Info />;
    return <Home />;
  };

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <GuideSection key={section.id} title={section.title} icon={getSectionIcon(section.title)}>
          <div className="space-y-4">
            {section.title.toLowerCase().includes('wifi') ? (
              // Special rendering for WiFi section
              <div>
                <p className="whitespace-pre-line mb-4">{section.content}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium mb-2">Network Name:</p>
                    <p className="font-mono bg-white p-2 rounded border">{wifiNetwork}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium mb-2">Password:</p>
                    <p className="font-mono bg-white p-2 rounded border">{wifiPassword}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  If you experience any connectivity issues, please try restarting the router located in the living room.
                </p>
              </div>
            ) : (
              // Standard rendering for other sections
              <p className="whitespace-pre-line">{section.content}</p>
            )}
          </div>
        </GuideSection>
      ))}
    </div>
  );
};

export default WelcomeTab;

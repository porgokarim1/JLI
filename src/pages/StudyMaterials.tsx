import NavigationBar from "@/components/navigation/NavigationBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Video, Book, Eye } from "lucide-react";

const StudyMaterials = () => {
  const materials = [
    {
      title: "Course PDFs",
      icon: FileText,
      items: [
        { name: "Understanding Israel's History", size: "2.3 MB" },
        { name: "Modern Israeli Society", size: "1.8 MB" },
        { name: "Israel's Global Impact", size: "3.1 MB" },
      ]
    },
    {
      title: "Video Resources",
      icon: Video,
      items: [
        { name: "Introduction to Israeli Culture", duration: "45 mins" },
        { name: "Understanding Middle East Relations", duration: "30 mins" },
        { name: "Israel's Role in Global Innovation", duration: "60 mins" },
      ]
    },
    {
      title: "Reading Materials",
      icon: Book,
      items: [
        { name: "Israeli Innovation & Technology", pages: "25 pages" },
        { name: "Understanding Modern Israel", pages: "40 pages" },
        { name: "Israel's Cultural Diversity", pages: "15 pages" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-24 pb-8">
        <h1 className="text-3xl font-bold mb-8">Study Materials</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <section.icon className="h-5 w-5" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.size || item.duration || item.pages}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResourcesSection = () => {
  return (
    <div className="container mx-auto px-4 py-8 mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Additional Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100">
          <CardHeader>
            <CardTitle className="text-slate-800">Study Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 mb-4">Access supplementary reading materials and resources.</p>
            <Button variant="outline" className="w-full">View Materials</Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100">
          <CardHeader>
            <CardTitle className="text-slate-800">Discussion Forum</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 mb-4">Engage with other students and share insights.</p>
            <Button variant="outline" className="w-full">Join Discussion</Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100">
          <CardHeader>
            <CardTitle className="text-slate-800">Schedule Session</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 mb-4">Book your next learning session.</p>
            <Button variant="outline" className="w-full">Schedule Now</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourcesSection;
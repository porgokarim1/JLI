import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProgressOverview = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-white/90 backdrop-blur-sm border-indigo-100 mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-800">Your Progress</CardTitle>
          <CardDescription>Track your journey through the Know Israel program</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-900">Lessons Completed</h3>
              <p className="text-2xl font-bold text-indigo-600">2/4</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-900">Hours Invested</h3>
              <p className="text-2xl font-bold text-indigo-600">3</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-900">Next Session</h3>
              <p className="text-2xl font-bold text-indigo-600">Tomorrow</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressOverview;
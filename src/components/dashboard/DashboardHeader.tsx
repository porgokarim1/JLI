import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Welcome Back!</h1>
        <Button 
          variant="outline"
          onClick={() => {/* Add logout handler later */}}
          className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
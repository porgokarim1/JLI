import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProgramGoals = () => {
  const goals = [
    {
      title: "Educate",
      description: "Provide students with a solid understanding of Jewish perspectives on key issues relating to Israel."
    },
    {
      title: "Empower",
      description: "Equip students with the communication skills and confidence to engage in thoughtful conversations about Israel with non-Jewish peers."
    },
    {
      title: "Advocate",
      description: "Encourage students to share their knowledge and advocate for Israel using a Torah-based approach."
    },
    {
      title: "Shift Focus",
      description: "Move beyond traditional hasbara (public diplomacy) methods and inspire students to justify Israel's actions through the lens of timeless Jewish values."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Our Program Goals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {goals.map((goal, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100">
            <CardHeader>
              <CardTitle className="text-slate-800">{goal.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">{goal.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProgramGoals;
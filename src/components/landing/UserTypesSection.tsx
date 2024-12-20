import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const userTypes = [
  {
    title: "Students",
    description: "College students interested in learning about Israel through a Jewish lens and engaging in meaningful conversations.",
    image: "https://images.jpost.com/image/upload/q_auto/c_fill,g_faces:center,h_537,w_822/632729"
  },
  {
    title: "Instructors (Shluchim)",
    description: "Leaders who guide and facilitate the Know Israel courses on college campuses.",
    image: "https://i.ytimg.com/vi/b9kj-h1w2tA/sddefault.jpg"
  },
  {
    title: "Administrators",
    description: "JLI on Campus program administrators who oversee and manage the program's operation.",
    image: "https://c8.alamy.com/comp/T496JM/social-concept-group-senior-jewish-people-standing-together-in-different-traditional-national-clothes-on-background-with-israel-flag-in-flat-style-T496JM.jpg"
  },
];

const UserTypesSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Who Can Join?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {userTypes.map((type, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100">
            <CardHeader>
              <div className="w-full h-48 mb-4 rounded-t-lg overflow-hidden">
                <img 
                  src={type.image} 
                  alt={type.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-slate-800">{type.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserTypesSection;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const userTypes = [
  {
    title: "Students",
    description: "College students interested in learning about Israel through a Jewish lens and engaging in meaningful conversations.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc-AvbggMne_9iZImmdrLgT1qLUu88H4RG8w&s"
  },
  {
    title: "Instructors (Shluchim)",
    description: "Leaders who guide and facilitate the Know Israel courses on college campuses.",
    image: "https://jnf.blob.core.windows.net/images/images/librariesprovider5/college-logos/img_7920-(1).jpg?sfvrsn=85f74431_1"
  },
  {
    title: "Administrators",
    description: "JLI on Campus program administrators who oversee and manage the program's operation.",
    image: "https://www.israelhayom.com/wp-content/uploads/2023/09/Capture-350x250.png"
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
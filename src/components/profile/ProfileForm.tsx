import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Profile } from "@/components/dashboard/types";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { toast } from "sonner";

interface ProfileFormProps {
  profile: Profile;
  isEditing: boolean;
  formData: Partial<Profile>;
  onSave: () => Promise<void>;
  onCancel: () => void;
  onChange: (field: string, value: any) => void;
}

export const ProfileForm = ({ 
  profile, 
  isEditing, 
  formData, 
  onSave, 
  onCancel,
  onChange 
}: ProfileFormProps) => {
  // Initialize formData with profile data when editing starts
  useEffect(() => {
    if (isEditing) {
      onChange('first_name', profile.first_name || '');
      onChange('last_name', profile.last_name || '');
      onChange('email', profile.email || '');
      onChange('phone', profile.phone || '');
      onChange('campus', profile.campus || '');
      onChange('gender', profile.gender || '');
    }
  }, [isEditing, profile, onChange]);

  const handlePhoneChange = (value: string | undefined) => {
    if (value && !isValidPhoneNumber(value)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    onChange('phone', value || '');
  };

  if (!isEditing) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm text-gray-500">First Name</Label>
          <p className="text-lg">{profile.first_name}</p>
        </div>
        <div>
          <Label className="text-sm text-gray-500">Last Name</Label>
          <p className="text-lg">{profile.last_name}</p>
        </div>
        <div>
          <Label className="text-sm text-gray-500">Email</Label>
          <p className="text-lg">{profile.email}</p>
        </div>
        <div>
          <Label className="text-sm text-gray-500">Phone</Label>
          <p className="text-lg">{profile.phone}</p>
        </div>
        <div>
          <Label className="text-sm text-gray-500">Campus</Label>
          <p className="text-lg">{profile.campus}</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    onChange(field, value);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            name="first_name"
            value={formData.first_name || ''}
            onChange={(e) => handleInputChange('first_name', e.target.value)}
            className="bg-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            name="last_name"
            value={formData.last_name || ''}
            onChange={(e) => handleInputChange('last_name', e.target.value)}
            className="bg-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="phone-input-container">
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="US"
              value={formData.phone || ''}
              onChange={handlePhoneChange}
              className="bg-white"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="campus">Campus</Label>
          <Select 
            value={formData.campus || ''}
            onValueChange={(value) => handleInputChange('campus', value)}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select your campus" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg">
              {universities.map((university) => (
                <SelectItem 
                  key={university} 
                  value={university}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  {university}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

const universities = [
  "Adelphi University",
  "American University",
  "Arizona State University",
  "Auraria Campus",
  "Binghamton University",
  "Birmingham Chabad Student Centre",
  "Bradley University",
  "Brooklyn College",
  "Brown University",
  "Bucknell University",
  "Buenos Aires Universities",
  "California Polytechnic University (Cal Poly)",
  "California State University, Chico",
  "California State University, Northridge",
  "California State University, San Marcos",
  "Caltech",
  "Carnegie Mellon",
  "Case Western Reserve University",
  "Chabad of Macalester-Groveland",
  "Chapman University",
  "Colgate University",
  "Colorado State University",
  "Columbia University",
  "Concordia University",
  "Cornell University",
  "Culinary Institute of America",
  "Dartmouth College",
  "DePaul University",
  "Drexel University",
  "Duke University",
  "Elon University",
  "Emory University",
  "Florida Atlantic University",
  "Florida Gulf Coast University",
  "Florida International University",
  "Florida State University",
  "George Mason University",
  "George Washington University",
  "Georgetown University",
  "Georgia Tech & Georgia State",
  "Grand Canyon University",
  "Hamilton College",
  "Harvard, MIT",
  "Hofstra",
  "Humboldt State University",
  "Illinois State University",
  "Indiana University",
  "International Jewish Student Center of Boston",
  "Ithaca College",
  "James Madison University",
  "Johns Hopkins University",
  "Kennesaw State University",
  "Kent State University",
  "Kraków, Poland",
  "La Sapienza, Italy",
  "Lauder Businesses School",
  "Lehigh University",
  "Lewis and Clark College",
  "Liverpool University",
  "Louisiana State University",
  "Majon Haia",
  "Marist College & Vasser",
  "McGill University",
  "Miami U",
  "Michigan State University",
  "Muhlenberg College",
  "North Carolina State University",
  "Northeastern University",
  "Northwestern University",
  "Nottingham Universities",
  "Nova Southeastern University",
  "Oakland University",
  "Occidental College",
  "Ohio State University",
  "Ohio University",
  "Oregon State University",
  "Paris La Sorbonne",
  "Pavol Jozef Šafarik University",
  "Penn State Altoona",
  "Penn State University",
  "Pepperdine University",
  "Pontifica Universidade Catolica PUC-Rio",
  "Princeton University",
  "Purdue University",
  "Queen's University",
  "Queens College",
  "Ramapo College of NJ",
  "Reed College",
  "Rensselaer Polytechnique Institute",
  "Rice University",
  "Rochester Institute of Technology",
  "Rowan University",
  "S. Diego State University",
  "San Jose State University",
  "Santa Monica College",
  "Savannah College of Art & Design",
  "Shenandoah University",
  "Siena College",
  "Stanford University",
  "Stockton University",
  "SUNY Buffalo",
  "SUNY New Paltz",
  "SUNY Oneonta",
  "SUNY Stony Brook",
  "Syracuse University",
  "Temple University",
  "Texas A&M University",
  "Texas State University",
  "The College of New Jersey",
  "The University of Arizona",
  "Towson University & Goucher College",
  "Tufts University",
  "Tulane University",
  "Uba Martinez, Buenos Aires, Argentina",
  "UC Berkeley",
  "UC Davis",
  "UC Santa Barbara",
  "UCLA",
  "Union College",
  "Universidad Anahuac, Mexico",
  "Universidad de Moron",
  "Universidad de Palermo | ISEJ",
  "Universidad de Palermo, UP, Buenos Aires",
  "Universidad Nacional del Sur",
  "Université de Médecine Aix-Marseille",
  "Université de Montréal",
  "Universities in the State of NSW, Australia",
  "Universities of Sao Paulo",
  "Universities of Victoria",
  "University of Alabama",
  "University of Alberta",
  "University of Bristol",
  "University of British Columbia",
  "University of Budapest",
  "University of California, Irvine",
  "University of California, Riverside",
  "University of Cape Town",
  "University of Central Florida",
  "University of Chicago",
  "University of Cincinnati",
  "University of Colorado",
  "University of Connecticut",
  "University of Delaware",
  "University of Denver",
  "University of Florida, Gainesville",
  "University of Georgia",
  "University of Guelph",
  "University of Hartford",
  "University of Illinois at Urbana Champaign",
  "University of Illinois Chicago",
  "University of Kansas",
  "University Of Kentucky",
  "University of Leeds",
  "University of Manchester",
  "University of Maryland, Baltimore County",
  "University of Maryland, College Park",
  "University of Massachusetts",
  "University of Miami",
  "University of Michigan",
  "University of Minnesota",
  "University of Missouri",
  "University of Nebraska, Lincoln",
  "University of Nevada, Las Vegas",
  "University of Nevada, Reno",
  "University of North Carolina, Chapel Hill",
  "University of North Florida",
  "University of Oregon",
  "University of Ottawa",
  "University of Oxford",
  "University of Pittsburgh",
  "University of Rhode Island",
  "University of Rochester",
  "University of Sheffield Western Bank",
  "University of South Carolina",
  "University of Southern California",
  "University of Texas at Austin",
  "University of Texas at Dallas",
  "University of Tucumán",
  "University of Utah",
  "University of Vermont",
  "University of Virginia",
  "University of Washington",
  "University of Waterloo",
  "University of West Florida",
  "University of Wisconsin",
  "University of Zagreb, School of Medicine",
  "USF, Tampa",
  "Vanderbilt University",
  "Virginia Tech",
  "Wake Forest University",
  "Washington University",
  "Wesleyan University",
  "West Virginia U",
  "Western University",
  "Western Washington University",
  "Wichita State University",
  "William & Mary",
  "Yale University",
  "York University"
];
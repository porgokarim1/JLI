import NavigationBar from "@/components/navigation/NavigationBar";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8 text-center">About KNOW ISRAEL</h1>
        
        <div className="prose prose-lg mx-auto">
          <p className="mb-6">
            KNOW ISRAEL is a pioneering educational initiative designed to empower Jewish and Israeli individuals with the knowledge, wisdom, and communication skills needed to engage in meaningful dialogues about Israel through a Torah-based perspective.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-6">
            Our mission is to bridge the gap between traditional advocacy and authentic Jewish wisdom, providing our students with a deep understanding of Israel's significance through the lens of Torah values. We believe that meaningful conversations about Israel should be grounded in our rich heritage while remaining accessible and relevant to contemporary discourse.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Educational Approach</h2>
          <p className="mb-6">
            Our curriculum combines traditional Jewish learning with modern communication techniques, enabling participants to:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Develop a deep understanding of Israel's historical and spiritual significance</li>
            <li>Master the art of engaging in respectful and meaningful dialogue</li>
            <li>Learn to address complex topics with clarity and confidence</li>
            <li>Build bridges of understanding with people from diverse backgrounds</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Torah-Based Understanding</h2>
          <p className="mb-6">
            We believe that understanding Israel through a Torah perspective provides a unique and profound framework for discussion. Our program helps students explore how ancient wisdom can illuminate contemporary issues and foster meaningful connections across cultural boundaries.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Program Impact</h2>
          <p className="mb-6">
            Through our comprehensive curriculum, students gain:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>A deeper connection to their Jewish heritage and Israel</li>
            <li>Confidence in discussing complex topics related to Israel</li>
            <li>Skills to build bridges of understanding with others</li>
            <li>A supportive community of like-minded individuals</li>
          </ul>

          <div className="bg-primary/10 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
            <p>
              Whether you're a student, professional, or community leader, KNOW ISRAEL provides the tools and knowledge needed to become an effective advocate for Israel while staying true to Torah values. Join us in building bridges of understanding and fostering meaningful dialogue about Israel in your community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

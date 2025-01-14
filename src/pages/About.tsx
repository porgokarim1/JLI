import NavigationBar from "@/components/navigation/NavigationBar";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8 text-center">About KNOW ISRAEL</h1>
        
        <div className="prose prose-lg mx-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">The Course</h2>
            <p className="mb-4">
              This four-part course confronts the pervasive lies and misinformation about Israel that Jewish students frequently face on college campuses.
            </p>
            <p className="mb-4">
              You'll have the opportunity to explore the big questions and accusations leveled against Israel in an open and supportive environment.
            </p>
            <p>
              Additionally, each class concludes with a section on communication to equip you with tools and skills to effectively and confidently engage with your fellow peers on this topic.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Bonus track!</h2>
            <h3 className="text-xl font-medium mb-3">Never underestimate the power of a conversation</h3>
            <p className="mb-4">
              Much of the animus and anti-jewish sentiment in our society stems from either misinformation or ignorance. You'll find, barring real extremists, most people are open to hearing new information and re-evaluating their stances as a result.
            </p>
            <p className="mb-4">
              We strongly encourage and challenge you to take the knowledge and communication tips you learn in the course – and share with your non jewish peers what Israel and Judaism mean to you.
            </p>
            <p>
              To assist with these conversations, you'll have all the course content at your fingertips via the AI chat feature. Just plug in your question about the course and the chatbox will answer based on what you learned in the previous lessons!
            </p>
          </section>

          <div className="bg-primary/10 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-2">Pro Tip!</h3>
            <p className="italic">
              The goal is to simply engage in these conversations; not to convince or transform the other person.
            </p>
          </div>

          <p className="text-lg">
            Score merch + additional perks, by letting us know when you've engaged with 7 peers- and don't forget to tell us how it went :)
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

import NavigationBar from "@/components/navigation/NavigationBar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8 text-center">About Know Israel</h1>

        <div className="max-w-3xl mx-auto space-y-6">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="course" className="border rounded-lg px-4">
              <AccordionTrigger className="text-xl font-semibold">
                🎓The Course
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <ul className="list-disc pl-5 space-y-2">
                  <li>This four-part course confronts the pervasive lies and misinformation about Israel that Jewish students frequently face on college campuses.</li>
                  <li>You'll have the opportunity to explore the big questions and accusations leveled against Israel in an open and supportive environment.</li>
                  <li>Additionally, each class concludes with a section on communication to equip you with tools and skills to effectively and confidently engage with your fellow peers on this topic.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bonus" className="border rounded-lg px-4">
              <AccordionTrigger className="text-xl font-semibold">
                🎉Bonus track!
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <h3 className="text-xl font-medium mb-3">Never underestimate the power of a conversation🔥</h3>
                <div className="space-y-4">
                  <p>
                    🤝Much of the animus and anti-jewish sentiment in our society stems from either misinformation or ignorance. You'll find, barring real extremists, most people are open to hearing new information and re-evaluating their stances as a result.
                  </p>
                  <p>
                    📚We strongly encourage and challenge you to take the knowledge and communication tips you learn in the course and share with your non jewish peers what Israel and Judaism mean to you.
                  </p>
                  <p>
                    🤖To assist with these conversations, you'll have all the course content at your fingertips via the AI chat feature. Just plug in your question about the course and the chatbox will answer based on what you learned in the previous lessons!
                  </p>
                  <div className="space-y-2">
                    <p>Log your conversations with how many peers you talked to... and don't forget to tell us how it went ☺️</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Goal 1: Engage with 7 a total of peers - you'll score cool merch!</li>
                      <li>Goal 2: Reach a total of 15 peers - you'll get our Skilled Communicator Certificate!</li>
                      <li>Goal 3: Attain a total of 25 peers - you'll participate in our grand raffle at the end of the semester (draw on June 1st, 2025).</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card className="bg-primary/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">💡Pro Tip!</h3>
            <p className="italic">
              The goal is to simply engage in these conversations; not to convince or transform the other person 💬.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;

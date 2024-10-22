import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function Landing() {
  return (
    <div className="scroll-smooth landing flex flex-col items-center min-h-screen p-2">
      <Card className="p-36 pt-8 mt-6 text-center mx-8">
        <CardHeader>
          <Image
            src="/pathfinder.PNG"
            alt="Pathfinder logo"
            height={128}
            width={128}
            className="mx-auto pt-1"
          />
          <CardTitle className="text-5xl bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-indigo-600 inline-block text-transparent bg-clip-text">
            Welcome to Pathfinder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl text-fuchsia-700">
            Your Opportunities & Internships Hub
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-screen-md text-black">
            Whether you are looking for volunteering and internship
            opportunities or searching for volunteers and bright people willing
            to learn, Pathfinder is your catalog.
          </p>
        </CardContent>
      </Card>

      <div className="m-8 flex flex-col min-h-screen items-center: none p-2 w-3/5">
        <div class="flex items-center space-x-4">
          <img src="portrait.jpg" alt="Image of Taj and Kunling, the creators of this web app, coding and discussing" 
          class="w-96 h-96 object-cover rounded-lg shadow-lg -rotate-4"></img>
          <Card className="mt-8 mx-20 ml-60 mr-10 shadow-xl">
    
            <CardHeader className="text-2xl font-semibold text-fuchsia-700">The Birth of Pathfinder</CardHeader>
            <CardContent className="text-lg">
              Pathfinder was created by Taj and KL, two high schoolers from
              San Antonio who realized the scarcity of platforms where
              eager-minded students can find local opportunities, be it
              internship, volunteering, or others, tailored to their needs.
            </CardContent>
          </Card>
        </div>

        <div class="flex items-center space-x-4">
          <Card className="mt-16 mx-20 ml-0.5 mr-2 shadow-xl">
            <CardHeader className="text-2xl font-semibold text-fuchsia-700">
              Who can use Pathfinder?</CardHeader>
            <CardContent className="text-lg">
              Everyone is welcomed to use or contribute to Pathfinder! Pathfinder
              embodies listings and user-friendly functions that we encourage
              everyone---students, teachers, nonprofits, companies, etc.---to make
              use of. Instead of having to scroll through countless websites and
              links, Pathfinder is a place where concentrated information can be
              shared with efficiency.
            </CardContent>
          </Card>
          <img src="volunteers.jpg" alt="Image of a group of high school volunteers smiling and organizing brown bags of food items" 
          class="w-96 h-96 object-cover rounded-lg shadow-lg mt-10 rotate-4"></img>
        </div>

        <div class="flex items-center space-x-4">
          <img src="work.jpg" alt="Image of a woman working at a laptop with her notebook, pen, and mug visible" 
          class="w-96 h-96 object-cover rounded-lg shadow-lg mt-16 -rotate-4"></img>
            <Card className="mt-20 mx-20 ml-64 mr-10 mb-42 shadow-xl">
      
              <CardHeader className="text-2xl font-semibold text-fuchsia-700">Get started now!</CardHeader>
              <CardContent className="text-lg">
                When Taj and KL created Pathfinder, they had in mind all the high schoolers 
                in San Antonio and beyond and their need for convenient, clear information 
                regarding local opportunities---it could be quite draining searching through 
                everything on Google! With Pathfinder, students who have created their 
                own organizations and events also find a easier way to share their 
                opportunities with everyone. Pathfinder is a great way to save time and to connect
                with others in your community. So what are you waiting for?
              </CardContent>
            </Card>
          </div>

      </div>

      <footer className="w-100">
        <h1 className="text-xl text-white font-bold">Contact Us</h1>
        <p className="text-white mb-8">
          thans@keystoneschool.org <br />
          kwu@keystoneschool.org
        </p>
      </footer>
    </div>
  );
}

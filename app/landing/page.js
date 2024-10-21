import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="landing flex flex-col items-center min-h-screen p-2">
      <Card className="p-36 pt-8 mt-6 text-center">
        <CardHeader>
        <img src="/pathfinder.PNG" alt="Description of the image" class="w-32 h-35 object-cover mx-auto  pt-1 "></img>
          <CardTitle className="text-5xl bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-indigo-600 inline-block text-transparent bg-clip-text">
            Welcome to Pathfinder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl text-fuchsia-700">Your Opportunities & Internships Hub</h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-screen-md text-black">
            Whether you are looking for volunteering and internship opportunities or 
            searching for volunteers and bright people willing to learn, Pathfinder is your catalog.
          </p>
        </CardContent>
      </Card>

      <div className="m-8 flex flex-col min-h-screen items-center: none p-2 w-3/5">
      <Card className="mt-8 mx-20 ml-60 mr-10 shadow-xl">
          <CardHeader>
            The birth of Pathfinder
          </CardHeader>
          <CardContent>
            Pathfinder was created by Taj and Kunling, 
            two high schoolers from San Antonio who realized the scarcity
            of platforms where eager-minded students can find local opportunities,
            be it internship, volunteering, or others, tailored to their needs. 
          </CardContent>
        </Card>

        <Card className="mt-16 mx-20 ml-10 mr-60 shadow-xl">
          <CardHeader>
            Who can use Pathfinder?
          </CardHeader>
          <CardContent>
            Everyone is welcomed to use or contribute to Pathfinder! Pathfinder embodies 
            listings and user-friendly functions that we encourage everyone---students,
            teachers, nonprofits, companies, etc.---to make use of. Instead of having to scroll
            through countless websites and links, Pathfinder is a place where concentrated 
            information can be shared with efficiency. 
          </CardContent>
        </Card>
      </div>

      <footer className="w-100">
        <h1 className="text-xl">
          Contact Us
        </h1>
        <p>
          thans@keystoneschool.org <br/>
          kwu@keystoneschool.org
        </p>
      </footer>
    </div>
  );
}

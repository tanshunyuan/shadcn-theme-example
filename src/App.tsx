import { ModeToggle } from "./components/mode-toggle";
import { useTheme } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./components/ui/select";
import { Separator } from "./components/ui/separator";
import { Skeleton } from "./components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { COLORS, DarkColorKey, LightColorKey } from "./constants/colors";

function App() {
  const { theme } = useTheme();
  return (
    <main>
      <nav className="sticky top-0 p-8 bg-background">
        <div className="flex gap-4">
          <ModeToggle />
          <p>Current theme: {theme}</p>
        </div>
      </nav>
      <section className="container">
        <article className="flex flex-col gap-4">
          <div className="text-sm">
            <p className="pb-2">
              Muted backgrounds and text colors for components such as
              &lt;TabsList /&gt;, &lt;Skeleton /&gt;
            </p>

            <DisplayElement
              colors={[
                {
                  cssVariable: "--muted",
                  colorKey: "muted",
                },
                {
                  cssVariable: "--muted-foreground",
                  colorKey: "mutedForeground",
                },
              ]}
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <DisplayDemo
              componentName="TabsList"
              demo={
                <Tabs defaultValue="account" className="w-[400px]">
                  <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                  </TabsList>
                </Tabs>
              }
              affectedClasses={{
                bg: "bg-muted",
                text: "text-muted-foreground",
              }}
            />
            <DisplayDemo
              componentName="Skeleton"
              demo={
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              }
              affectedClasses={{
                bg: "bg-muted",
              }}
            />
          </div>
        </article>
        <Separator className="my-4" />
        <article className="flex flex-col gap-4">
          <div className="text-sm">
            <p className="pb-2">
              Background color and text color for &lt;Card /&gt;
            </p>

            <DisplayElement
              colors={[
                {
                  cssVariable: "--card",
                  colorKey: "card",
                },
                {
                  cssVariable: "--card-foreground",
                  colorKey: "cardForeground",
                },
              ]}
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <DisplayDemo
              componentName="Card"
              demo={
                <Card>
                  <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>
                      Deploy your new project in one-click.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <div className="grid items-center w-full gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Name of your project" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="framework">Framework</Label>
                          <Select>
                            <SelectTrigger id="framework">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectItem value="next">Next.js</SelectItem>
                              <SelectItem value="sveltekit">
                                SvelteKit
                              </SelectItem>
                              <SelectItem value="astro">Astro</SelectItem>
                              <SelectItem value="nuxt">Nuxt.js</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                  </CardFooter>
                </Card>
              }
              affectedClasses={{
                bg: "bg-card",
                text: "text-card-foreground",
              }}
            />
          </div>
        </article>
        <Separator className="my-4" />
      </section>
    </main>
  );
}

interface DisplayDemoProps {
  componentName: string;
  demo: React.ReactNode;
  affectedClasses: {
    bg?: string;
    text?: string;
  };
}
const DisplayDemo = (props: DisplayDemoProps) => {
  const { componentName, demo, affectedClasses } = props;
  return (
    <div className="grid grid-cols-2 p-4 border">
      <div className="border-r-2">
        <pre className="mb-2">{`<${componentName}/>`}</pre>
        <div className="mr-4">{demo}</div>
      </div>
      <div className="ml-4">
        {affectedClasses.bg && <p>Bg color classname: {affectedClasses.bg}</p>}
        {affectedClasses.text && (
          <p>Txt color classname: {affectedClasses.text}</p>
        )}
      </div>
    </div>
  );
};

interface DisplayElementProps {
  colors: {
    cssVariable: string;
    colorKey: LightColorKey | DarkColorKey;
  }[];
}
const DisplayElement = (props: DisplayElementProps) => {
  const { theme } = useTheme();
  const { colors } = props;
  return (
    <div className="grid grid-cols-2">
      <div className={`${theme === "light" ? "font-bold" : ""}`}>
        <p>Light {theme === "light" ? " (selected)" : ""}</p>
        {colors.map((item, index) => (
          <div key={index}>
            <pre>
              {item.cssVariable}: {COLORS["light"][item.colorKey]}
            </pre>
          </div>
        ))}
      </div>
      <div className={`${theme === "dark" ? "font-bold" : ""}`}>
        <p>Dark {theme === "dark" ? " (selected)" : ""}</p>
        {colors.map((item, index) => (
          <div key={index}>
            <pre>
              {item.cssVariable}: {COLORS["dark"][item.colorKey]}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

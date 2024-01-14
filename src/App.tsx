import { ModeToggle } from "./components/mode-toggle";
import { useTheme } from "./components/theme-provider";
import { Skeleton } from "./components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { COLORS, DarkColorKey, LightColorKey } from "./constants/colors";

function App() {
  const { theme } = useTheme();
  return (
    <main>
      <nav className="p-8">
        <div className="flex gap-4">
          <ModeToggle />
          <p>Current theme: {theme}</p>
        </div>
      </nav>
      <section className="container">
        <article className="flex flex-col gap-4">
          <div className="text-sm">
            <div>
              Muted backgrounds such as &lt;TabsList /&gt;, &lt;Skeleton /&gt;
            </div>

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
        {demo}
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

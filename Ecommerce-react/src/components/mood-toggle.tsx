//import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch";
import { useTheme } from "./theme-provider";

export function SwitchDemo() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-toggle"
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />

      <span className="text-sm text-gray-600 dark:text-gray-300">🌙</span>
    </div>
  );
}

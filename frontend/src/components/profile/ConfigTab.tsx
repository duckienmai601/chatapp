import { useLanguageStore } from "@/i18n/useLanguageStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { Settings, Moon, Sun, Bell, Globe } from "lucide-react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Card, CardContent } from "../ui/card";

const ConfigTab = () => {
    const { isDark, toggleTheme } = useThemeStore();
    const { language, setLanguage, t } = useLanguageStore();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Settings className="size-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                        {t.config.title}
                    </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                    {t.config.subtitle}
                </p>
            </div>

            {/* Settings Cards */}
            <div className="space-y-3">
                {/* Dark Mode */}
                <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className="flex items-center justify-between py-4 px-5">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                                {isDark ? (
                                    <Moon className="size-5 text-white" />
                                ) : (
                                    <Sun className="size-5 text-white" />
                                )}
                            </div>
                            <div>
                                <Label className="text-sm font-medium cursor-pointer">
                                    {t.config.darkMode}
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    {isDark ? t.config.darkModeOn : t.config.darkModeOff}
                                </p>
                            </div>
                        </div>
                        <Switch
                            checked={isDark}
                            onCheckedChange={toggleTheme}
                            className="cursor-pointer"
                        />
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className="flex items-center justify-between py-4 px-5">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-md">
                                <Bell className="size-5 text-white" />
                            </div>
                            <div>
                                <Label className="text-sm font-medium cursor-pointer">
                                    {t.config.notifications}
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    {t.config.notificationsSubtitle}
                                </p>
                            </div>
                        </div>
                        <Switch defaultChecked className="cursor-pointer" />
                    </CardContent>
                </Card>

                {/* Language */}
                <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className="flex items-center justify-between py-4 px-5">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
                                <Globe className="size-5 text-white" />
                            </div>
                            <div>
                                <Label htmlFor="language-select" className="text-sm font-medium">
                                    {t.config.language}
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    {t.config.languageUsing}
                                </p>
                            </div>
                        </div>
                        <select
                            id="language-select"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as "vi" | "en")}
                            className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm font-medium text-foreground cursor-pointer outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                        >
                            <option value="vi">🇻🇳 Tiếng Việt</option>
                            <option value="en">🇺🇸 English</option>
                        </select>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ConfigTab;

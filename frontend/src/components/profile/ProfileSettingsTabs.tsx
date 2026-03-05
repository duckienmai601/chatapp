import { useLanguageStore } from "@/i18n/useLanguageStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { User, Settings, ShieldCheck } from "lucide-react";
import AccountTab from "./AccountTab";
import ConfigTab from "./ConfigTab";
import SecurityTab from "./SecurityTab";

const ProfileSettingsTabs = () => {
    const { t } = useLanguageStore();

    return (
        <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full grid grid-cols-3 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="account" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm cursor-pointer transition-all duration-200">
                    <User className="size-4" />
                    <span className="hidden sm:inline">{t.profile.tabAccount}</span>
                </TabsTrigger>
                <TabsTrigger value="config" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm cursor-pointer transition-all duration-200">
                    <Settings className="size-4" />
                    <span className="hidden sm:inline">{t.profile.tabConfig}</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm cursor-pointer transition-all duration-200">
                    <ShieldCheck className="size-4" />
                    <span className="hidden sm:inline">{t.profile.tabSecurity}</span>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="mt-6"><AccountTab /></TabsContent>
            <TabsContent value="config" className="mt-6"><ConfigTab /></TabsContent>
            <TabsContent value="security" className="mt-6"><SecurityTab /></TabsContent>
        </Tabs>
    );
};

export default ProfileSettingsTabs;

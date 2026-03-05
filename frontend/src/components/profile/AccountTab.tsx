import { useAuthStore } from "@/stores/useAuthStore";
import { useUserStore } from "@/stores/useUserStore";
import { useLanguageStore } from "@/i18n/useLanguageStore";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const AccountTab = () => {
    const { user } = useAuthStore();
    const { updateProfile } = useUserStore();
    const { t } = useLanguageStore();

    const [displayName, setDisplayName] = useState(user?.displayName ?? "");
    const [username, setUsername] = useState(user?.username ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [phone, setPhone] = useState(user?.phone ?? "");
    const [bio, setBio] = useState(user?.bio ?? "");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateProfile({ displayName, username, email, phone, bio });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Heart className="size-5 text-pink-500 fill-pink-500" />
                    <h3 className="text-lg font-semibold text-foreground">
                        {t.account.title}
                    </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                    {t.account.subtitle}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="displayName">{t.account.displayName}</Label>
                    <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder={t.account.displayNamePlaceholder} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="username">{t.account.username}</Label>
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t.account.usernamePlaceholder} className="focus:border-primary focus:ring-primary/30" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">{t.account.email}</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.account.emailPlaceholder} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">{t.account.phone}</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.account.phonePlaceholder} />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio">{t.account.bio}</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder={t.account.bioPlaceholder} className="resize-none min-h-[80px]" maxLength={500} />
            </div>

            <Button onClick={handleSave} disabled={loading} className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                {loading ? t.account.saving : t.account.save}
            </Button>
        </div>
    );
};

export default AccountTab;

import { useUserStore } from "@/stores/useUserStore";
import { useLanguageStore } from "@/i18n/useLanguageStore";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const SecurityTab = () => {
    const { changePassword } = useUserStore();
    const { t } = useLanguageStore();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");

    const handleChangePassword = async () => {
        setError("");
        if (!currentPassword || !newPassword || !confirmPassword) { setError(t.security.fillAll); return; }
        if (newPassword.length < 6) { setError(t.security.passwordMin); return; }
        if (newPassword !== confirmPassword) { setError(t.security.passwordMismatch); return; }

        setLoading(true);
        try {
            await changePassword(currentPassword, newPassword);
            setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
        } catch { /* toast in store */ } finally { setLoading(false); }
    };

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="size-5 text-emerald-500" />
                    <h3 className="text-lg font-semibold text-foreground">{t.security.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t.security.subtitle}</p>
            </div>

            <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                    <Label htmlFor="currentPassword">{t.security.currentPassword}</Label>
                    <div className="relative">
                        <Input id="currentPassword" type={showCurrent ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder={t.security.currentPasswordPlaceholder} />
                        <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                            {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="newPassword">{t.security.newPassword}</Label>
                    <div className="relative">
                        <Input id="newPassword" type={showNew ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder={t.security.newPasswordPlaceholder} />
                        <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                            {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t.security.confirmPassword}</Label>
                    <div className="relative">
                        <Input id="confirmPassword" type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={t.security.confirmPasswordPlaceholder} />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                            {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                    </div>
                </div>
                {error && <p className="text-sm text-destructive font-medium">{error}</p>}
                <Button onClick={handleChangePassword} disabled={loading} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    {loading ? t.security.changing : t.security.changePassword}
                </Button>
            </div>
        </div>
    );
};

export default SecurityTab;

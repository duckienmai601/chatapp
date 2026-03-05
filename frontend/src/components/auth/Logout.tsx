import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useLanguageStore } from "@/i18n/useLanguageStore";

const Logout = () => {
    const { signOut } = useAuthStore();
    const navigate = useNavigate();
    const { t } = useLanguageStore();
    const handleLogout = async () => {
        try {
            await signOut();
            navigate("/signin");
        }
        catch (error) {
            console.error("Logout error:", error);
        }

    }
    return (
        <Button variant="completeGhost" onClick={handleLogout}> <LogOut className="text-destructive" />{t.navUser.logOut}</Button>
    )
}

export default Logout;
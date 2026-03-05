import type { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import ProfileCard from "./ProfileCard";
import ProfileSettingsTabs from "./ProfileSettingsTabs";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLanguageStore } from "@/i18n/useLanguageStore";

interface ProfileDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
const ProfileDialog = ({ open, setOpen }: ProfileDialogProps) => {
    const { user } = useAuthStore();
    const { t } = useLanguageStore();

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent className="overflow-y-auto max-h-[90vh] p-0 bg-transparent border-0 shadow-2xl">
                <div className="bg-gradient-glass">
                    <div className="max-w-4xl mx-auto p-4">
                        <DialogHeader className="mb-6">
                            <DialogTitle className="text-2xl font-bold text-foreground">
                                {t.profile.title}
                            </DialogTitle>
                        </DialogHeader>

                        <ProfileCard user={user} />

                        <div className="mt-6">
                            <ProfileSettingsTabs />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileDialog

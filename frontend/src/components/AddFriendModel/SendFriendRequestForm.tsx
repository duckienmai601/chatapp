import type { UseFormRegister } from "react-hook-form"
import type { IFormValues } from "../chat/AddFriendModel"
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";
import { useLanguageStore } from "@/i18n/useLanguageStore";


interface SendRequestProps {
    register: UseFormRegister<IFormValues>;
    loading: boolean;
    searchedUsername: string;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    onBack: () => void;
}
const SendFriendRequestForm = ({
    register, loading, searchedUsername, onSubmit, onBack,
}: SendRequestProps) => {
    const { t } = useLanguageStore();

    return (
        <form onSubmit={onSubmit} >
            <div className="space-y-4">
                <span className="success-message">
                    {t.addFriend.found} <span className="font-semibold">@{searchedUsername}</span> {t.addFriend.alreadyFound}
                </span>

                <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold">
                        {t.addFriend.introduction}
                    </Label>
                    <Textarea id="message"
                        rows={3}
                        placeholder={t.addFriend.introPlaceholder}
                        className="glass border-border/50 focus:border-primary/50 transition-smooth resize-none"
                        {...register("message")}
                    />
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1 glass hover:text-destructive"
                        onClick={onBack}
                    >
                        {t.addFriend.goBack}
                    </Button>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-chat text-white hover:opacity-90 transition-smooth"

                    >
                        {loading ? (
                            <span>{t.addFriend.sending}</span>
                        ) : (
                            <>
                                <UserPlus className="size-4 mr-2" /> {t.addFriend.addFriend}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </div>
        </form>
    )
}

export default SendFriendRequestForm
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useFriendStore } from "@/stores/useFriendStore";
import SentRequests from "./SentRequests";
import ReceivedRequest from "./ReceivedRequest";
import { useLanguageStore } from "@/i18n/useLanguageStore";

interface FriendRequestDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
const FriendRequestDialog = ({ open, setOpen }: FriendRequestDialogProps) => {
    const [tab, setTab] = useState("received");
    const { getAllFriendRequest } = useFriendStore();
    const { t } = useLanguageStore();

    useEffect(() => {
        const loadRequest = async () => {
            try {
                await getAllFriendRequest();
            } catch (error) {
                console.error("Error loading friend requests", error);
            }
        }

        loadRequest();
    }, []);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{t.friendRequest.title}</DialogTitle>
                </DialogHeader>

                <Tabs
                    value={tab}
                    onValueChange={setTab}
                    className="w-full"
                >
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="received">
                            {t.friendRequest.received}
                        </TabsTrigger>
                        <TabsTrigger value="sent">
                            {t.friendRequest.sent}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="received">
                        <ReceivedRequest />
                    </TabsContent>

                    <TabsContent value="sent">
                        <SentRequests />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

export default FriendRequestDialog
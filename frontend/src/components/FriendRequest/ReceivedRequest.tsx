import { useFriendStore } from "@/stores/useFriendStore"
import FriendRequestItem from "./FriendRequestItem";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useLanguageStore } from "@/i18n/useLanguageStore";



const ReceivedRequest = () => {
    const { acceptRequest, declineRequest, loading, receivedList } = useFriendStore();
    const { t } = useLanguageStore();

    if (!receivedList || receivedList.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">
                {t.friendRequest.noReceived}
            </p>
        );
    }

    const handleAccept = async (requestId: string) => {
        try {
            await acceptRequest(requestId);
            toast.success(t.friendRequest.acceptSuccess);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDecline = async (requestId: string) => {
        try {
            await declineRequest(requestId);
            toast.info(t.friendRequest.declineSuccess);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="space-y-3 mt-4">
            {
                receivedList.map((req) => (
                    <FriendRequestItem
                        key={req._id}
                        requestInfo={req}
                        actions={
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => handleAccept(req._id)}
                                    disabled={loading}>
                                    {t.friendRequest.accept}
                                </Button>

                                <Button
                                    size="sm"
                                    variant="destructiveOutline"
                                    onClick={() => handleDecline(req._id)}
                                    disabled={loading}
                                >
                                    {t.friendRequest.decline}
                                </Button>
                            </div>
                        }
                        type="received"
                    />
                ))
            }
        </div>
    )
}

export default ReceivedRequest
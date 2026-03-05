import { useFriendStore } from "@/stores/useFriendStore"
import FriendRequestItem from "./FriendRequestItem";
import { useLanguageStore } from "@/i18n/useLanguageStore";


const SentRequests = () => {
    const { sentList } = useFriendStore();
    const { t } = useLanguageStore();

    if (!sentList || sentList.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">
                {t.friendRequest.noSent}
            </p>
        );
    }
    return (
        <div className="space-y-3 mt-4">
            <>{sentList.map((req) =>
                <FriendRequestItem
                    key={req._id}
                    requestInfo={req}
                    type="sent"
                    actions={
                        <p className="text-sm text-muted-foreground">{t.friendRequest.waiting}</p>
                    }
                />)}</>
        </div>
    )
}

export default SentRequests
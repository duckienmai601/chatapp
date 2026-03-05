import { useFriendStore } from "@/stores/useFriendStore";
import { Card } from "../ui/card";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { MessageCircle } from "lucide-react";
import FriendListModel from "../createNewChat/FriendListModel";
import { useLanguageStore } from "@/i18n/useLanguageStore";

const CreateNewChat = () => {
  const { getFriends } = useFriendStore();
  const { t } = useLanguageStore();

  return (
    <div className="flex gap-2">
      <Dialog onOpenChange={(open) => { if (open) getFriends(); }}>
        <DialogTrigger asChild>
          <Card className="flex-1 p-3 glass hover:shadow-soft transition-smooth cursor-pointer group/card">
            <div className="flex items-center gap-4">
              <div className="size-8 bg-gradient-chat rounded-full flex items-center justify-center group-hover/card:scale-110 transition-bounce">
                <MessageCircle className="size-4 text-white" />
              </div>
              <span className="text-sm font-medium capitalize">{t.chat.newMessage}</span>
            </div>
          </Card>
        </DialogTrigger>

        <FriendListModel />
      </Dialog>
    </div>
  );
};

export default CreateNewChat;

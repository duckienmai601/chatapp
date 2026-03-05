import { useFriendStore } from "@/stores/useFriendStore";
import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { UserPlus, Users } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { Friend } from "@/types/user";
import InviteSuggestionList from "../newGroupChat/InviteSuggestionList";
import SelectedUserList from "../newGroupChat/SelectedUserList";
import { toast } from "sonner";
import { useChatStore } from "@/stores/useChatStore";
import { useLanguageStore } from "@/i18n/useLanguageStore";


const NewGroupChatModel = () => {

  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const { friends, getFriends } = useFriendStore();
  const [invitedUser, setInvitedUser] = useState<Friend[]>([]);
  const { loading, createConversation } = useChatStore();
  const { t } = useLanguageStore();

  const handleGetFriends = async () => {
    await getFriends();
  };

  const handleSelectFriend = (friend: Friend) => {
    setInvitedUser([...invitedUser, friend]);
    setSearch("");
  };

  const handleRemoveFriend = (friend: Friend) => {
    setInvitedUser(invitedUser.filter((u) => u._id !== friend._id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (invitedUser.length === 0) {
        toast.warning(t.groupChat.mustInvite);
        return;
      }

      await createConversation(
        "group",
        groupName,
        invitedUser.map((u) => u._id)
      );

      setSearch("");
      setInvitedUser([]);
    } catch (error) {
      console.error("Error creating group", error);
    }
  };

  const filteredFriends = friends.filter((friend) =>
    friend.displayName.toLowerCase().includes(search.toLowerCase()) &&
    !invitedUser.some((u) => u._id === friend._id));


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          onClick={handleGetFriends}
          className="flex z-10 justify-center items-center size-5 rounded-full hover:bg-sidebar-accent transition cursor-pointer"

        >
          <Users className="size-4" />
          <span className="sr-only">{t.groupChat.createGroup}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] border-none">
        <DialogHeader>
          <DialogTitle className="capitalize">
            {t.groupChat.createTitle}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Tên nhóm */}
          <div className="sapce-y-2">
            <Label
              htmlFor="groupName"
              className="text-sm font-semibold mb-2"
            >
              {t.groupChat.groupName}
            </Label>

            <Input
              id="groupName"
              placeholder={t.groupChat.groupNamePlaceholder}
              className="glass border-border/50 focus:border-primary/50 transition-smooth"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>


          {/* mời thành viên */}

          <div className="space-y-2">
            <Label
              htmlFor="invite"
              className="text-sm font-semibold"

            >
              {t.groupChat.inviteMembers}
            </Label>

            <Input
              id="invite"
              placeholder={t.groupChat.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* danh sách gợi ý  */}
            {search && filteredFriends.length > 0 && (
              <InviteSuggestionList
                filteredFriends={filteredFriends}
                onSelect={handleSelectFriend}
              />
            )}


            {/* danh sách user đã chọn */}
            <SelectedUserList
              invitedUser={invitedUser}
              onRemove={handleRemoveFriend}
            />

          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-chat text-white hover:opacity-90 transition-smooth"
            >
              {
                loading ? (
                  <span>{t.groupChat.creating}</span>
                ) : (
                  <>
                    <UserPlus className="size-4 mr-2" />
                    {t.groupChat.createGroup}
                  </>
                )
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>

    </Dialog>
  );
}

export default NewGroupChatModel
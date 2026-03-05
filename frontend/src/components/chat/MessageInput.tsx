import { useAuthStore } from "@/stores/useAuthStore";
import type { Conversation } from "@/types/chat";
import { useState } from "react";
import { Button } from "../ui/button";
import { ImagePlus, Send, Smile } from "lucide-react";
import { Input } from "../ui/input";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useThemeStore } from "@/stores/useThemeStore";
import { useChatStore } from "@/stores/useChatStore";
import { toast } from "sonner";
import { useLanguageStore } from "@/i18n/useLanguageStore";

const MessageInput = ({ selectedConvo }: { selectedConvo: Conversation }) => {
  const { user } = useAuthStore();
  const [value, setValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const { isDark } = useThemeStore();
  const { sendDirectMessage, sendGroupMessage } = useChatStore();
  const { t } = useLanguageStore();


  if (!user) return null;

  const sendMessage = async () => {
    if (!value.trim()) return;

    try {
      if (selectedConvo.type === "direct") {
        const participants = selectedConvo.participants;
        const otherUser = participants.filter((p) => p._id !== user._id)[0];
        await sendDirectMessage(otherUser._id, value);
      } else {
        await sendGroupMessage(selectedConvo._id, value);
      }
    } catch (error) {
      console.error(error);
      toast.error(t.chat.messageError);
    } finally {
      setValue("");
    }
  };

  const handlekeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex items-center gap-2 p-3 min-h-[56px] bg-background relative">
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-primary/10 transition-smooth"
      >
        <ImagePlus className="size-4" />
      </Button>

      <div className="flex-1 relative">
        <Input
          onKeyDown={handlekeyPress}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t.chat.messagePlaceholder}
          className="pr-20 h-9 bg-white border-border/50 focus:border-primary/50 transition-smooth"
        />

        {/* Icon emoji */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 hover:bg-primary/10"
            onClick={() => setShowEmoji((prev) => !prev)}
          >
            <Smile className="size-4" />
          </Button>
        </div>

        {/* Emoji picker */}
        {showEmoji && (
          <div className="absolute bottom-12 right-0 z-50 shadow-lg">
            <EmojiPicker
              theme={(isDark ? "dark" : "light") as Theme}
              onEmojiClick={(emojiData) =>
                setValue((prev) => prev + emojiData.emoji)
              }
            />

          </div>
        )}
      </div>

      <Button
        onClick={sendMessage}
        className="bg-gradient-chat hover:shadow-glow transition-smooth hover:scale-105"
        disabled={!value.trim()}
      >
        <Send className="size-4 text-white" />
      </Button>
    </div>
  );
};

export default MessageInput;

import { useThemeStore } from "@/stores/useThemeStore";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData, Theme } from "emoji-picker-react";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

const EmojiPickerComponent = ({ onChange }: EmojiPickerProps) => {
  const { isDark } = useThemeStore();

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <Smile className="size-4" />
      </PopoverTrigger>

      <PopoverContent className="p-0 border-none">
        <EmojiPicker
          theme={(isDark ? "dark" : "light") as Theme}
          onEmojiClick={(emojiData: EmojiClickData) =>
            onChange(emojiData.emoji)
          }
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPickerComponent;

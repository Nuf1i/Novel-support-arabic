import { Editor } from "@tiptap/core";
import { Check, ChevronDown } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";

export interface BubbleColorMenuItem {
  name: string;
  color: string | null;
}

interface ColorSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "تلقائي",
    color: "var(--novel-black)",
  },
  {
    name: "بنفسجي",
    color: "#9333EA",
  },
  {
    name: "احمر",
    color: "#E00000",
  },
  {
    name: "اصفر",
    color: "#EAB308",
  },
  {
    name: "ازرق",
    color: "#2563EB",
  },
  {
    name: "اخضر",
    color: "#008A00",
  },
  {
    name: "برتقالي",
    color: "#FFA500",
  },
  {
    name: "وردي",
    color: "#BA4081",
  },
  {
    name: "رصاصي",
    color: "#A8A29E",
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "تلقائي",
    color: "var(--novel-highlight-default)",
  },
  {
    name: "بنفسجي",
    color: "var(--novel-highlight-purple)",
  },
  {
    name: "احمر",
    color: "var(--novel-highlight-red)",
  },
  {
    name: "اصفر",
    color: "var(--novel-highlight-yellow)",
  },
  {
    name: "ازرق",
    color: "var(--novel-highlight-blue)",
  },
  {
    name: "اخضر",
    color: "var(--novel-highlight-green)",
  },
  {
    name: "برتقالي",
    color: "var(--novel-highlight-orange)",
  },
  {
    name: "وردي",
    color: "var(--novel-highlight-pink)",
  },
  {
    name: "رصاصي",
    color: "var(--novel-highlight-gray)",
  },
];

export const ColorSelector: FC<ColorSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive("textStyle", { color }),
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive("highlight", { color }),
  );

  return (
    <div className="relative h-full">
      <button
        className="flex items-center h-full gap-1 p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className="px-1 rounded-sm"
          style={{
            color: activeColorItem?.color,
            backgroundColor: activeHighlightItem?.color,
          }}
        >
          A
        </span>

        <ChevronDown className="w-4 h-4" />
      </button>


      {isOpen && (
        <section className="fixed right-0 top-full z-[99999] mt-1 flex w-48 flex-col overflow-hidden rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1">
          <div className="px-2 my-1 text-sm text-right text-stone-500">اللون</div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetColor();
                name !== "Default" &&
                  editor.chain().focus().setColor(color).run();
                setIsOpen(false);
              }}
              className="flex flex-row-reverse items-center justify-between px-2 py-1 text-sm rounded-sm text-stone-600 hover:bg-stone-100"
            >
              <div className="flex flex-row-reverse items-center gap-x-2">
                <div
                  className="px-1 py-px font-medium border rounded-sm border-stone-200"
                  style={{ color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("textStyle", { color }) && (
                <Check className="w-4 h-4" />
              )}
            </button>
          ))}

          <div className="px-2 mt-2 mb-1 text-sm text-right text-stone-500">
            الخلفية
          </div>

          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetHighlight();
                name !== "Default" && editor.commands.setHighlight({ color });
                setIsOpen(false);
              }}
              className="flex flex-row-reverse items-center justify-between px-2 py-1 text-sm rounded-sm text-stone-600 hover:bg-stone-100"
            >
              <div className="flex flex-row-reverse items-center gap-x-2">
                <div
                  className="px-1 py-px font-medium border rounded-sm border-stone-200"
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("highlight", { color }) && (
                <Check className="w-4 h-4" />
              )}
            </button>
          ))}
        </section>
      )}
    </div>
  );
};

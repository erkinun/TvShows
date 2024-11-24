import { MouseEventHandler } from "react";

export function PrimaryButton({
  onClick,
  text,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string;
}) {
  return (
    <button
      className="bg-white text-black border-2 border-white rounded-lg px-5 py-2 text-lg font-bold transition-transform transform hover:scale-105 hover:bg-gray-100 active:scale-95 active:bg-gray-200"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

import { ReactNode } from "react";
import { Plus } from "lucide-react";

type props = {
  text: string;
  onClick?: () => void;
}

export default function Button({
  text,
  icon,
  href,
}: {
  text: string;
  icon: ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
    >
      {icon}
      <span className="ml-2">{text}</span>
    </a>
  );
}

export function AddButton({ text, onClick }:props) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
      >
        <Plus className="w-5 h-5" />
        <span>{text}</span>
      </button>
    </>
  );
}
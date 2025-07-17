import { SendHorizontal } from "lucide-react";

export default function SubmitButton({
  text,
  disabled = false,
}: {
  text: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition 
        ${disabled ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"} text-white`}
      >
        
      <SendHorizontal />
      <span>{text}</span>
    </button>
  );
}

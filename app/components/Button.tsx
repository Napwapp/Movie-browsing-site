import { ReactNode } from 'react';

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

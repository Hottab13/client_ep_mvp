import { ReactNode } from "react";

interface BlockHeaderProps {
  children: ReactNode;
  d: string;
}

const BlockHeader: React.FC<BlockHeaderProps> = ({ children, d }) => (
  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
    <span className="text-green-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={d} />
      </svg>
    </span>
    <span className="tracking-wide">{children}</span>
  </div>
);
export { BlockHeader };

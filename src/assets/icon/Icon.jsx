const IconHeaderClose = () => (
  <svg
    className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      cstrokelinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
);
const IconMobileMenu = () => (
  <svg
    className="block h-4 w-4 fill-current"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
  </svg>
);
const IconDividerMenu = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none" 
    stroke="currentColor"
    className="w-4 h-4 current-fill text-gray-300"
    viewBox="0 0 24 24"
  >
    <path
      cstrokelinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
    />
  </svg>
);
export { IconHeaderClose, IconMobileMenu, IconDividerMenu };

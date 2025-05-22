import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.5 10C15.5 8.61929 16.6193 7.5 18 7.5H28C31.866 7.5 35 10.634 35 14.5V17.5C35 19.9853 32.9853 22 30.5 22H20.5C16.634 22 13.5 25.134 13.5 29V34.5C13.5 36.9853 15.5147 39 18 39H28C31.866 39 35 42.134 35 46"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
       <circle cx="18" cy="14.5" r="3" fill="currentColor" />
       <circle cx="30" cy="34.5" r="3" fill="currentColor" />
    </svg>
  );
}

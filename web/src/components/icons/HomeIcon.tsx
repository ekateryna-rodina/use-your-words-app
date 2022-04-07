import React from "react";
import { IconProps } from ".";

const HomeIcon = ({ fill, isFocused }: IconProps) => {
  const gFilterProps = isFocused ? { filter: "url(#filter0_d_19_1737)" } : {};
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g {...gFilterProps}>
        <path
          d="M38.5625 18.6562C40.0538 18.6544 41.4834 18.0612 42.5379 17.0067C43.5924 15.9522 44.1856 14.5225 44.1875 13.0312V8.8125H39.9688C38.5289 8.81463 37.1454 9.37168 36.1058 10.3678C35.3773 9.04597 34.3078 7.94358 33.0086 7.1754C31.7094 6.40721 30.228 6.00133 28.7188 6H24.5V10.2188C24.5026 12.4557 25.3924 14.6003 26.9742 16.1821C28.5559 17.7639 30.7005 18.6536 32.9375 18.6562H34.3438V36.9375H17.4688V29.9062H18.875C20.3663 29.9044 21.7959 29.3112 22.8504 28.2567C23.9049 27.2022 24.4981 25.7725 24.5 24.2812V20.0625H20.2812C18.8414 20.0646 17.4579 20.6217 16.4183 21.6178C15.6898 20.296 14.6203 19.1936 13.3211 18.4254C12.0219 17.6572 10.5405 17.2513 9.03125 17.25H4.8125V21.4688C4.81511 23.7057 5.70489 25.8503 7.28666 27.4321C8.86844 29.0139 11.013 29.9036 13.25 29.9062H14.6562V36.9375H4.8125V39.75H44.1875V36.9375H37.1562V18.6562H38.5625ZM37.1562 14.4375C37.157 13.6918 37.4535 12.9769 37.9808 12.4496C38.5081 11.9223 39.2231 11.6257 39.9688 11.625H41.375V13.0312C41.3743 13.7769 41.0777 14.4919 40.5504 15.0192C40.0231 15.5464 39.3082 15.843 38.5625 15.8438H37.1562V14.4375ZM17.4688 25.6875C17.4695 24.9418 17.7661 24.2269 18.2933 23.6996C18.8206 23.1723 19.5356 22.8757 20.2812 22.875H21.6875V24.2812C21.6868 25.0269 21.3902 25.7419 20.8629 26.2692C20.3356 26.7965 19.6207 27.093 18.875 27.0938H17.4688V25.6875ZM14.6562 27.0938H13.25C11.7587 27.0919 10.3291 26.4987 9.27458 25.4442C8.22009 24.3897 7.62686 22.96 7.625 21.4688V20.0625H9.03125C10.5225 20.0644 11.9522 20.6576 13.0067 21.7121C14.0612 22.7666 14.6544 24.1962 14.6562 25.6875V27.0938ZM34.3438 15.8438H32.9375C31.4462 15.8419 30.0166 15.2487 28.9621 14.1942C27.9076 13.1397 27.3144 11.71 27.3125 10.2188V8.8125H28.7188C30.21 8.81436 31.6397 9.40759 32.6942 10.4621C33.7487 11.5166 34.3419 12.9462 34.3438 14.4375V15.8438Z"
          className={fill}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_19_1737"
          x="-2"
          y="0"
          width="53"
          height="53"
          filterUnits="userSpaceOnUse"
          colorInterpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_19_1737"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_19_1737"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default HomeIcon;

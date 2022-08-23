const CloseIcon = ({ size }: { size?: number }) => {
  const _size = size || 20;
  return (
    <svg
      width={_size}
      height={_size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.52219 11.0709L17.4978 19.0487L19.0466 17.5022L11.0687 9.52437L19.0466 1.54875L17.5 0L9.52219 7.97781L1.54656 0L0 1.54875L7.97563 9.52437L0 17.5L1.54656 19.0487L9.52219 11.0709Z"
        fill="#AAAAAA"
      />
    </svg>
  );
};

export default CloseIcon;

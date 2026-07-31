export default function Pointer() {
  return (
    <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1">
      <div
        className="
          h-0 w-0
          border-l-[18px] border-r-[18px]
          border-t-[32px]
          border-l-transparent
          border-r-transparent
          border-t-white
          drop-shadow-lg
        "
      />
    </div>
  );
}
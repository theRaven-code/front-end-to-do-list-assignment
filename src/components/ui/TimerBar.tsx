interface TimerBarProps {
  progress: number;
  color: string;
  isActive: boolean;
}

const TimerBar = ({ progress, color, isActive }: TimerBarProps) => {
  // Choose gradient based on color prop
  const gradient =
    color === "pink"
      ? "bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600"
      : "bg-gradient-to-r from-green-400 via-green-500 to-green-600";
  const glow =
    color === "pink"
      ? "shadow-[0_0_10px_2px_rgba(236,72,153,0.5)]"
      : "shadow-[0_0_10px_2px_rgba(34,197,94,0.5)]";

  return (
    <div className="absolute bottom-0 left-0 w-full h-4 bg-gray-200 rounded-b-md overflow-hidden border-t border-gray-300">
      <div
        className={`h-full ${gradient} ${
          isActive ? glow : ""
        } rounded-b-md transition-all duration-500`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default TimerBar;

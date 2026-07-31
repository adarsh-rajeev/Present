interface WheelSliceProps {
  path: string;
  color: string;

  text: string;

  x: number;
  y: number;

  rotation: number;
}

export default function WheelSlice({
  path,
  color,
  text,
  x,
  y,
  rotation,
}: WheelSliceProps) {
  return (
    <>
      <path
        d={path}
        fill={color}
        stroke="#FFFFFF"
        strokeWidth={1}
      />

      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="12"
        fontWeight="700"
        transform={`rotate(${rotation} ${x} ${y})`}
      >
        {text}
      </text>
    </>
  );
}
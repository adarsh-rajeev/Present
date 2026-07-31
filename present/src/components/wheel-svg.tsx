import WheelSlice from "./WheelSlice";
import { describeDonutSlice, getTextPosition } from "@/lib/wheel";

interface Student {
  id: number;
  rollNo: number;
  name: string;
  excluded?: boolean;
}

interface WheelProps {
  rotation: number;
  students: Student[];
}

const SIZE = 520;
const CENTER = SIZE / 2;
const OUTER_RADIUS = 245;
const INNER_RADIUS = 130;

export default function Wheel({ rotation, students }: WheelProps) {
  const sliceAngle = 360 / Math.max(students.length, 1);

  const slices = students.map((student, index) => ({
    ...student,
    startAngle: index * sliceAngle,
    endAngle: (index + 1) * sliceAngle,
  }));

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="drop-shadow-2xl transition-transform duration-300"
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {/* Wheel Slices */}
        {slices.map((slice, index) => {
          const text = getTextPosition(
            CENTER,
            CENTER,
            INNER_RADIUS,
            OUTER_RADIUS,
            slice.startAngle,
            slice.endAngle,
          );

          return (
            <WheelSlice
              key={slice.id}
              path={describeDonutSlice(
                CENTER,
                CENTER,
                OUTER_RADIUS,
                INNER_RADIUS,
                slice.startAngle,
                slice.endAngle,
              )}
              color={index % 2 === 0 ? "#9333EA" : "#7E22CE"}
              text={slice.rollNo.toString()}
              x={text.x}
              y={text.y}
              rotation={(slice.startAngle + slice.endAngle) / 2}
            />
          );
        })}

        {/* Center Hub */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_RADIUS}
          fill="white"
          stroke="#6D28D9"
          strokeWidth="8"
        />

        <text
          x={CENTER}
          y={CENTER - 6}
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fill="#6D28D9"
        >
          PRESENT
        </text>

        <text
          x={CENTER}
          y={CENTER + 18}
          textAnchor="middle"
          fontSize="13"
          fill="#6D28D9"
        >
          {students.length} Active
        </text>
      </svg>
    </div>
  );
}

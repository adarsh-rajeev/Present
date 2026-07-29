type Student = {
  id: number;
  rollNo: number;
  name: string;
  excluded: boolean;
};

type StudentTableProps = {
  students: Student[];
};

export default function StudentTable({
  students,
}: StudentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-zinc-700 text-left">
            <th className="p-3">Roll No</th>
            <th className="p-3">Name</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="border-b border-zinc-800 hover:bg-zinc-800"
            >
              <td className="p-3">{student.rollNo}</td>

              <td className="p-3">{student.name}</td>

              <td className="p-3">
                {student.excluded ? (
                  <span className="text-red-400">Excluded</span>
                ) : (
                  <span className="text-yellow-400">Available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
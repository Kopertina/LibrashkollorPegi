import { cn } from "@/lib/utils";

interface GradeFilterProps {
  selectedGrade: number | null;
  onGradeChange: (grade: number | null) => void;
}

const gradeLabels = [
  { value: null, label: "All Grades" },
  { value: 1, label: "1st Grade" },
  { value: 2, label: "2nd Grade" },
  { value: 3, label: "3rd Grade" },
  { value: 4, label: "4th Grade" },
  { value: 5, label: "5th Grade" },
  { value: 6, label: "6th Grade" },
  { value: 7, label: "7th Grade" },
  { value: 8, label: "8th Grade" },
  { value: 9, label: "9th Grade" },
];

export default function GradeFilter({ selectedGrade, onGradeChange }: GradeFilterProps) {
  return (
    <section className="bg-white py-6 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Grade Level</h3>
        <div className="flex flex-wrap gap-2">
          {gradeLabels.map((grade) => (
            <button
              key={grade.label}
              onClick={() => onGradeChange(grade.value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedGrade === grade.value
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
              data-testid={`button-grade-filter-${grade.value || 'all'}`}
            >
              {grade.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

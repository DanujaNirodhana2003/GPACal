import { Semester, Subject, calculateSemesterGPA } from "@/lib/gpaCalculations";
import { getGradeMapping } from "@/lib/gradeMapping";
import { SubjectRow } from "./SubjectRow";
import { Button } from "./ui/button";
import { Plus, RotateCcw } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

type SemesterCardProps = {
  semester: Semester;
  onUpdate: (semester: Semester) => void;
};

export const SemesterCard = ({ semester, onUpdate }: SemesterCardProps) => {
  const gradeMapping = getGradeMapping();
  const { gpa, totalCredits } = calculateSemesterGPA(semester.subjects, gradeMapping);

  const addSubject = () => {
    const newSubject: Subject = {
      id: uuidv4(),
      name: "",
      credits: 0,
      grade: "",
    };
    onUpdate({ ...semester, subjects: [...semester.subjects, newSubject] });
  };

  const updateSubject = (index: number, subject: Subject) => {
    const newSubjects = [...semester.subjects];
    newSubjects[index] = subject;
    onUpdate({ ...semester, subjects: newSubjects });
  };

  const removeSubject = (index: number) => {
    const newSubjects = semester.subjects.filter((_, i) => i !== index);
    onUpdate({ ...semester, subjects: newSubjects });
  };

  const resetSemester = () => {
    onUpdate({ ...semester, subjects: [] });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Subject Header */}
      <div className="grid grid-cols-12 gap-3 text-sm font-semibold text-muted-foreground px-1">
        <div className="col-span-5">Subject Name</div>
        <div className="col-span-3">Credits</div>
        <div className="col-span-3">Grade</div>
        <div className="col-span-1"></div>
      </div>

      {/* Subject Rows */}
      <div className="space-y-3">
        {semester.subjects.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No subjects added yet</p>
            <p className="text-sm mt-1">Click "Add Subject" to get started</p>
          </div>
        ) : (
          semester.subjects.map((subject, index) => (
            <SubjectRow
              key={subject.id}
              subject={subject}
              onUpdate={(s) => updateSubject(index, s)}
              onRemove={() => removeSubject(index)}
            />
          ))
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button onClick={addSubject} className="flex-1 gap-2">
          <Plus className="w-4 h-4" />
          Add Subject
        </Button>
        {semester.subjects.length > 0 && (
          <Button variant="outline" onClick={resetSemester} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        )}
      </div>

      {/* Semester Summary */}
      <div className="glass-card p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Semester GPA:</span>
          <span className="text-2xl font-bold gradient-text">
            {gpa.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Total Credits:</span>
          <span className="font-semibold">{totalCredits.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

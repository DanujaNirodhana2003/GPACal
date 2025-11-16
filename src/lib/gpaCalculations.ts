import { GradeMapping } from "./gradeMapping";

export type Subject = {
  id: string;
  name: string;
  credits: number;
  grade: string;
};

export type Semester = {
  id: string;
  name: string;
  subjects: Subject[];
};

export const calculateSemesterGPA = (
  subjects: Subject[],
  gradeMapping: GradeMapping
): { gpa: number; totalCredits: number } => {
  let totalPoints = 0;
  let totalCredits = 0;

  subjects.forEach((subject) => {
    if (subject.credits > 0 && subject.grade) {
      const gradePoint = gradeMapping[subject.grade] ?? 0;
      totalPoints += subject.credits * gradePoint;
      totalCredits += subject.credits;
    }
  });

  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
  return { gpa, totalCredits };
};

export const calculateOverallGPA = (
  semesters: Semester[],
  gradeMapping: GradeMapping
): { gpa: number; totalCredits: number } => {
  let totalPoints = 0;
  let totalCredits = 0;

  semesters.forEach((semester) => {
    semester.subjects.forEach((subject) => {
      if (subject.credits > 0 && subject.grade) {
        const gradePoint = gradeMapping[subject.grade] ?? 0;
        totalPoints += subject.credits * gradePoint;
        totalCredits += subject.credits;
      }
    });
  });

  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
  return { gpa, totalCredits };
};

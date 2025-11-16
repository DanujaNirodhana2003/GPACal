export type GradeMapping = {
  [grade: string]: number;
};

export const DEFAULT_GRADE_MAPPING: GradeMapping = {
  "A+":4.0,
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D": 1.0,
  "F": 0.0,
};

export const getGradeMapping = (): GradeMapping => {
  const stored = localStorage.getItem("gpa-grade-mapping");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_GRADE_MAPPING;
    }
  }
  return DEFAULT_GRADE_MAPPING;
};

export const saveGradeMapping = (mapping: GradeMapping) => {
  localStorage.setItem("gpa-grade-mapping", JSON.stringify(mapping));
};

export const resetGradeMapping = () => {
  localStorage.removeItem("gpa-grade-mapping");
  return DEFAULT_GRADE_MAPPING;
};

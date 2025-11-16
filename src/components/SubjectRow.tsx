import { Subject } from "@/lib/gpaCalculations";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { getGradeMapping } from "@/lib/gradeMapping";

type SubjectRowProps = {
  subject: Subject;
  onUpdate: (subject: Subject) => void;
  onRemove: () => void;
};

export const SubjectRow = ({ subject, onUpdate, onRemove }: SubjectRowProps) => {
  const gradeMapping = getGradeMapping();
  const grades = Object.keys(gradeMapping);

  return (
    <div className="grid grid-cols-12 gap-3 items-center">
      <div className="col-span-5">
        <Input
          placeholder="Subject name"
          value={subject.name}
          onChange={(e) => onUpdate({ ...subject, name: e.target.value })}
          className="glass-input"
        />
      </div>
      <div className="col-span-3">
        <Input
          type="number"
          placeholder="Credits"
          min="0"
          step="0.5"
          value={subject.credits || ""}
          onChange={(e) =>
            onUpdate({ ...subject, credits: parseFloat(e.target.value) || 0 })
          }
          className="glass-input"
        />
      </div>
      <div className="col-span-3">
        <Select value={subject.grade} onValueChange={(grade) => onUpdate({ ...subject, grade })}>
          <SelectTrigger className="glass-input">
            <SelectValue placeholder="Grade" />
          </SelectTrigger>
          <SelectContent className="glass-card">
            {grades.map((grade) => (
              <SelectItem key={grade} value={grade}>
                {grade} ({gradeMapping[grade].toFixed(1)})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-1 flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

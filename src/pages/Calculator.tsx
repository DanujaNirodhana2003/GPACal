import { useState, useEffect } from "react";
import { Semester, calculateOverallGPA } from "@/lib/gpaCalculations";
import { getGradeMapping } from "@/lib/gradeMapping";
import { SemesterCard } from "@/components/SemesterCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

export default function Calculator() {
  const { toast } = useToast();
  const [semesters, setSemesters] = useState<Semester[]>(() => {
    const stored = localStorage.getItem("gpa-semesters");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [{ id: uuidv4(), name: "Semester 1", subjects: [] }];
      }
    }
    return [{ id: uuidv4(), name: "Semester 1", subjects: [] }];
  });

  const [activeSemester, setActiveSemester] = useState(semesters[0]?.id || "");

  useEffect(() => {
    localStorage.setItem("gpa-semesters", JSON.stringify(semesters));
  }, [semesters]);

  const gradeMapping = getGradeMapping();
  const { gpa: overallGPA, totalCredits: overallCredits } = calculateOverallGPA(
    semesters,
    gradeMapping
  );

  const addSemester = () => {
    const newSemester: Semester = {
      id: uuidv4(),
      name: `Semester ${semesters.length + 1}`,
      subjects: [],
    };
    setSemesters([...semesters, newSemester]);
    setActiveSemester(newSemester.id);
    toast({
      title: "Semester Added",
      description: `${newSemester.name} has been created.`,
    });
  };

  const updateSemester = (semester: Semester) => {
    setSemesters(semesters.map((s) => (s.id === semester.id ? semester : s)));
  };

  const removeSemester = (id: string) => {
    if (semesters.length === 1) {
      toast({
        title: "Cannot Remove",
        description: "You must have at least one semester.",
        variant: "destructive",
      });
      return;
    }
    setSemesters(semesters.filter((s) => s.id !== id));
    if (activeSemester === id) {
      setActiveSemester(semesters[0]?.id || "");
    }
    toast({
      title: "Semester Removed",
      description: "The semester has been deleted.",
    });
  };

  const resetAll = () => {
    if (confirm("Are you sure you want to reset all semesters? This cannot be undone.")) {
      setSemesters([{ id: uuidv4(), name: "Semester 1", subjects: [] }]);
      setActiveSemester(semesters[0]?.id || "");
      toast({
        title: "Reset Complete",
        description: "All data has been cleared.",
      });
    }
  };

  return (
    <div className="min-h-screen pr-24 p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 animate-fade-in">
        <h1 className="text-5xl font-bold gradient-text">GPA Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your semester and overall GPA with ease
        </p>
      </div>

      {/* Overall GPA Card */}
      <div className="glass-card p-6 max-w-4xl mx-auto animate-scale-in">
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Overall CGPA</p>
            <p className="text-5xl font-bold gradient-text">{overallGPA.toFixed(2)}</p>
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Credits</p>
            <p className="text-5xl font-bold gradient-text">{overallCredits.toFixed(1)}</p>
          </div>
        </div>
      </div>

      {/* Semester Tabs */}
      <div className="max-w-4xl mx-auto glass-card p-6 animate-fade-in">
        <Tabs value={activeSemester} onValueChange={setActiveSemester}>
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-secondary/50">
              {semesters.map((semester) => (
                <TabsTrigger
                  key={semester.id}
                  value={semester.id}
                  className="relative group"
                >
                  {semester.name}
                  {semesters.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSemester(semester.id);
                      }}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3 text-destructive" />
                    </button>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex gap-2">
              <Button onClick={addSemester} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Semester
              </Button>
              <Button onClick={resetAll} size="sm" variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset All
              </Button>
            </div>
          </div>

          {semesters.map((semester) => (
            <TabsContent key={semester.id} value={semester.id}>
              <SemesterCard semester={semester} onUpdate={updateSemester} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

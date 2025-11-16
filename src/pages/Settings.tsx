import { useState } from "react";
import { getGradeMapping, saveGradeMapping, resetGradeMapping, GradeMapping } from "@/lib/gradeMapping";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Save, RotateCcw } from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const [gradeMapping, setGradeMapping] = useState<GradeMapping>(getGradeMapping());

  const handleSave = () => {
    saveGradeMapping(gradeMapping);
    toast({
      title: "Settings Saved",
      description: "Your grade scale has been updated successfully.",
    });
  };

  const handleReset = () => {
    const defaultMapping = resetGradeMapping();
    setGradeMapping(defaultMapping);
    toast({
      title: "Reset to Default",
      description: "Grade scale has been reset to default values.",
    });
  };

  const updateGrade = (grade: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 4) {
      setGradeMapping({ ...gradeMapping, [grade]: numValue });
    }
  };

  return (
    <div className="min-h-screen pr-24 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-5xl font-bold gradient-text">Settings</h1>
          <p className="text-muted-foreground">
            Customize your grade scale to match your institution
          </p>
        </div>

        {/* Grade Mapping Card */}
        <div className="glass-card p-6 space-y-6 animate-scale-in">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Grade Point Scale</h2>
            <p className="text-sm text-muted-foreground">
              Adjust the point values for each grade to match your university's system
            </p>
          </div>

          {/* Grade Grid */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(gradeMapping).map(([grade, point]) => (
              <div key={grade} className="flex items-center gap-3">
                <div className="w-16 h-12 glass-card flex items-center justify-center font-bold text-lg">
                  {grade}
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    min="0"
                    max="4"
                    step="0.1"
                    value={point}
                    onChange={(e) => updateGrade(grade, e.target.value)}
                    className="glass-input text-lg font-semibold"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1 gap-2">
              <Save className="w-4 h-4" />
              Save Settings
            </Button>
            <Button onClick={handleReset} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </Button>
          </div>
        </div>

        {/* Info Card */}
        <div className="glass-card p-6 space-y-3 text-sm animate-fade-in">
          <h3 className="font-semibold text-lg">Tips</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Grade points must be between 0.0 and 4.0</li>
            <li>• Changes will apply to all current and future calculations</li>
            <li>• Your custom scale is saved automatically to your browser</li>
            <li>• Use "Reset to Default" to restore the standard 4.0 scale</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

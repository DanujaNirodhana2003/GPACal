import { GraduationCap, Calculator, Settings, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pr-24 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-5xl font-bold gradient-text">About GPA Cal</h1>
          <p className="text-muted-foreground">
            Your smart companion for academic success
          </p>
        </div>

        {/* What is GPA */}
        <div className="glass-card p-6 space-y-4 animate-scale-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-semibold">What is GPA?</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            GPA (Grade Point Average) is a standardized way of measuring academic achievement. 
            It converts letter grades into numerical values and calculates a weighted average based 
            on course credits. CGPA (Cumulative GPA) represents your overall performance across 
            multiple semesters.
          </p>
        </div>

        {/* Features */}
        <div className="glass-card p-6 space-y-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-semibold">Features</h2>
          </div>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Calculate semester GPA and overall CGPA with precision</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Manage multiple semesters and track your academic progress</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Add unlimited subjects with custom credits and grades</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Real-time GPA updates as you input your data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Beautiful dark and light themes for comfortable viewing</span>
            </li>
          </ul>
        </div>

        {/* Customization */}
        <div className="glass-card p-6 space-y-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-semibold">Customization</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Every university has its own grading system. GPA Cal allows you to customize the 
            grade-to-point mapping in Settings to match your institution's specific scale. 
            Whether your school uses a different scale for A-, B+, or any other grade, you can 
            adjust it to get accurate calculations.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="glass-card p-6 space-y-4 animate-fade-in border-2 border-accent/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent-foreground" />
            </div>
            <h2 className="text-2xl font-semibold">Important Note</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            GPA Cal is a helpful tool for estimating your academic performance, but it should 
            not replace official transcripts or calculations from your institution. Always verify 
            your GPA with your university's registrar or academic office for official purposes 
            like scholarships, applications, or graduation requirements.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground pt-8">
          <p>Made with ❤️ for students everywhere</p>
          <p>Special thanks to <a href="https://lovable.dev" target="_blank" ><strong>Lovable</strong></a> and <a href="https://openai.com" target="_blank"><strong>OpenAI</strong></a> for making AI-assisted app development simple and accessible.</p>
          <p>If you have any adjustments, ideas, or suggestions to improve this app, please feel free to contact me at <a href="mailto:chandrasenadn@gmail.com"><strong>chandrasenadn@gmail.com</strong></a>. I greatly appreciate your feedback and contributions!</p>
          <p className="mt-2">© 2025 GPA Cal. All data stored locally in your browser.</p>
        </div>
      </div>
    </div>
  );
}


"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Send, Play, Lightbulb, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { personalizedCodeFeedback, type PersonalizedCodeFeedbackOutput } from "@/ai/flows/personalized-code-feedback";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface ExercisePageProps {
  params: Promise<{ id: string }>;
}

export default function ExercisePage({ params }: ExercisePageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<PersonalizedCodeFeedbackOutput | null>(null);

  const exercises: Record<string, any> = {
    "functions": {
      title: "Function Basics",
      description: "Create a function named `greet` that takes a `name` parameter and returns 'Hello, [name]!'.",
      language: "JavaScript",
      starterCode: "function greet(name) {\n  // Your code here\n}"
    }
  };

  const currentExercise = exercises[id] || exercises["functions"];

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast({ title: "Write some code first!", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const result = await personalizedCodeFeedback({
        userCode: code,
        exerciseDescription: currentExercise.description,
        language: currentExercise.language
      });
      setFeedback(result);
      if (result.isCorrect) {
        toast({ title: "Great job! Challenge complete." });
      }
    } catch (error) {
      toast({ title: "Failed to get feedback.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      {/* Exercise Header */}
      <header className="p-4 flex items-center gap-4 border-b border-border bg-card">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Progress</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Level 4</span>
          </div>
          <Progress value={60} className="h-1.5" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">
        <section>
          <h2 className="font-headline text-2xl font-bold mb-2">{currentExercise.title}</h2>
          <div className="bg-secondary/50 rounded-xl p-4 border border-border">
            <p className="text-sm leading-relaxed">{currentExercise.description}</p>
          </div>
        </section>

        {/* Editor Area */}
        <section className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-code text-muted-foreground">{currentExercise.language} Editor</span>
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setCode(currentExercise.starterCode)}>
              Reset
            </Button>
          </div>
          <div className="relative group">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Write your solution here..."
              className="font-code min-h-[250px] bg-card border-2 border-border focus:border-primary transition-all resize-none text-sm p-4 glow-blue"
            />
          </div>
        </section>

        {/* AI Feedback Display */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl border-2 ${feedback.isCorrect ? 'border-accent/40 bg-accent/5' : 'border-destructive/40 bg-destructive/5'}`}
            >
              <div className="flex items-start gap-3 mb-4">
                {feedback.isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-destructive shrink-0" />
                )}
                <div>
                  <h4 className={`font-headline font-bold ${feedback.isCorrect ? 'text-accent' : 'text-destructive'}`}>
                    {feedback.isCorrect ? "MISSION SUCCESSFUL" : "CORRECTION NEEDED"}
                  </h4>
                  <p className="text-sm mt-1">{feedback.feedbackSummary}</p>
                </div>
              </div>

              {feedback.errorsFound.length > 0 && (
                <div className="space-y-3 mb-4">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Errors Found</h5>
                  {feedback.errorsFound.map((err, i) => (
                    <div key={i} className="bg-background/50 p-3 rounded-lg border border-border text-xs">
                      <p className="font-bold text-destructive mb-1">Line {err.line}: {err.message}</p>
                      <p className="text-muted-foreground italic">{err.explanation}</p>
                    </div>
                  ))}
                </div>
              )}

              {feedback.suggestions.length > 0 && (
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Expert Suggestions</h5>
                  {feedback.suggestions.map((sug, i) => (
                    <div key={i} className="bg-background/50 p-3 rounded-lg border border-border text-xs">
                      <div className="flex justify-between mb-1">
                        <span className="font-bold text-primary uppercase text-[10px] tracking-tighter">{sug.type}</span>
                      </div>
                      <p className="font-bold mb-1">{sug.message}</p>
                      <p className="text-muted-foreground mb-2">{sug.explanation}</p>
                      {sug.codeSnippet && (
                        <pre className="p-2 bg-secondary rounded mt-2 font-code text-[10px] overflow-x-auto border border-border">
                          {sug.codeSnippet}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {feedback.isCorrect && (
                <Button 
                  className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90 glow-green font-bold uppercase tracking-widest"
                  onClick={() => router.push("/")}
                >
                  Continue Journey
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-4 bg-card border-t border-border flex gap-3">
        <Button 
          variant="secondary" 
          className="flex-1 gap-2 font-bold uppercase text-xs tracking-widest"
        >
          <Lightbulb className="w-4 h-4 text-accent" />
          Get Hint
        </Button>
        <Button 
          className="flex-[2] gap-2 glow-blue font-bold uppercase text-xs tracking-widest"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Zap className="w-4 h-4" />
            </motion.div>
          ) : (
            <Send className="w-4 h-4" />
          )}
          {isSubmitting ? "ANALYZING..." : "SUBMIT CODE"}
        </Button>
      </footer>
    </div>
  );
}

import { Zap } from "lucide-react";

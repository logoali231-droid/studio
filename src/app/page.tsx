
"use client";

import { SkillNode } from "@/components/SkillNode";
import { BottomNav } from "@/components/BottomNav";
import { Rocket, Zap, Crown } from "lucide-react";
import { motion } from "framer-motion";

const SKILLS = [
  { id: "js-basics", title: "JS Basics", status: "completed", type: "core" },
  { id: "loops", title: "Control Flow", status: "completed", type: "core" },
  { id: "functions", title: "Functions", status: "available", type: "core" },
  { id: "objects", title: "Objects", status: "locked", type: "core" },
  { id: "async", title: "Async Ops", status: "locked", type: "checkpoint" },
  { id: "dom", title: "DOM Magic", status: "locked", type: "core" },
  { id: "api", title: "API Power", status: "locked", type: "core" },
];

export default function Home() {
  return (
    <div className="pb-24 min-h-screen">
      {/* Header */}
      <header className="p-6 sticky top-0 z-40 bg-background/80 backdrop-blur-md flex justify-between items-center border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center glow-blue">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-headline font-bold text-lg leading-tight tracking-tight">CODE ASCENT</h1>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-accent fill-accent" />
              <span className="text-[10px] text-accent font-bold uppercase tracking-tighter">Streak: 12 Days</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-full border border-border">
            <Crown className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-bold">1.2k</span>
          </div>
        </div>
      </header>

      {/* Mastery Tree */}
      <main className="px-6 pt-12">
        <div className="flex flex-col items-center gap-16 relative">
          {/* Path Line */}
          <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-muted z-0 rounded-full" />
          
          {SKILLS.map((skill, index) => (
            <div 
              key={skill.id} 
              className="z-10"
              style={{
                marginLeft: index % 2 === 0 ? '40px' : '-40px'
              }}
            >
              <SkillNode
                index={index}
                id={skill.id}
                title={skill.title}
                status={skill.status as any}
                type={skill.type as any}
              />
            </div>
          ))}
        </div>
        
        {/* Motivational Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 bg-card border-2 border-primary/20 rounded-2xl p-6 glow-blue relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BrainCircuit size={80} />
          </div>
          <h3 className="font-headline font-bold text-xl mb-2">Next Challenge</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You're close to mastering <span className="text-primary font-bold">Functions</span>. Complete 2 more exercises to unlock the next tier.
          </p>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[65%] glow-blue transition-all duration-1000" />
          </div>
          <div className="mt-2 text-[10px] text-muted-foreground text-right font-bold uppercase tracking-widest">
            65% Complete
          </div>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}

import { BrainCircuit } from "lucide-react";

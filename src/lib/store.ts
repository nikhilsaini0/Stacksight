"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ToolInput } from "./audit-engine";

interface AuditState {
  tools: ToolInput[];
  teamSize: number;
  useCase: string;
  currentStep: number;
  isSubmitting: boolean;
  addTool: (tool: ToolInput) => void;
  removeTool: (index: number) => void;
  updateTool: (index: number, tool: ToolInput) => void;
  setTools: (tools: ToolInput[]) => void;
  setTeamSize: (size: number) => void;
  setUseCase: (useCase: string) => void;
  setCurrentStep: (step: number) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  reset: () => void;
}

const initialState = {
  tools: [{ tool: "chatgpt", plan: "team", seats: 1, monthlySpend: 30 }],
  teamSize: 5,
  useCase: "coding",
  currentStep: 0,
  isSubmitting: false,
};

export const useAuditStore = create<AuditState>()(
  persist(
    (set) => ({
      ...initialState,
      addTool: (tool) => set((s) => ({ tools: [...s.tools, tool] })),
      removeTool: (index) =>
        set((s) => ({ tools: s.tools.filter((_, i) => i !== index) })),
      updateTool: (index, tool) =>
        set((s) => ({
          tools: s.tools.map((t, i) => (i === index ? tool : t)),
        })),
      setTools: (tools) => set({ tools }),
      setTeamSize: (teamSize) => set({ teamSize }),
      setUseCase: (useCase) => set({ useCase }),
      setCurrentStep: (currentStep) => set({ currentStep }),
      setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
      reset: () => set(initialState),
    }),
    { name: "audit-storage" }
  )
);

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flag,
  ArrowLeft,
  ArrowRight,
  Send,
  HelpCircle,
  Sparkles,
  BarChart3,
  BookOpen,
  RotateCcw,
  ShieldCheck,
  Strikethrough,
  Check,
  X,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

interface ExamQuestion {
  id: string;
  domain: string;
  questionText: string;
  scenarioText?: string;
  options: string; // JSON array of options
  correctOptionIndex: number;
  explanation: string;
  guidelineRef?: string;
}

export default function MockExamEnginePage() {
  const [exam, setExam] = useState<any>(null);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  // Exam Progress State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<string, boolean>>({});

  // Timer State (seconds)
  const [timeLeft, setTimeLeft] = useState<number>(30 * 60);
  const [timerActive, setTimerActive] = useState<boolean>(true);
  const [timeSpent, setTimeSpent] = useState<number>(0);

  // Submission State
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [scoreReport, setScoreReport] = useState<any>(null);
  const [examError, setExamError] = useState<string | null>(null);

  const fetchExam = async () => {
    try {
      setLoading(true);
      setExamError(null);
      const res = await fetch("/api/mock-exams?slug=cpc-diagnostic-sprint-2026");
      if (!res.ok) {
        throw new Error(`Failed to load mock exam: HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data.success && data.exam) {
        setExam(data.exam);
        const qList = data.exam.questions || [];
        setQuestions(qList);
        setTimeLeft((data.exam.durationMinutes || 30) * 60);
        if (qList.length === 0) {
          setExamError("No questions are currently published for this diagnostic sprint.");
        }
      } else {
        throw new Error(data.error || "Unable to retrieve exam questions.");
      }
    } catch (err: any) {
      console.error("Error loading exam:", err);
      setExamError(err.message || "Failed to load diagnostic exam. Please check your network and retry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExam();
  }, []);

  // Ticker for Timer
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeLeft > 0 && !scoreReport) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, scoreReport]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (scoreReport) return;
    setUserAnswers({ ...userAnswers, [questionId]: optionIdx });
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions({
      ...flaggedQuestions,
      [questionId]: !flaggedQuestions[questionId],
    });
  };

  const toggleEliminate = (questionId: string, optionIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const key = `${questionId}-${optionIdx}`;
    setEliminatedOptions({
      ...eliminatedOptions,
      [key]: !eliminatedOptions[key],
    });
  };

  const handleAutoSubmit = () => {
    alert("Time has expired! Submitting your examination answers now.");
    submitExam();
  };

  const submitExam = async () => {
    try {
      setSubmitting(true);
      setShowSubmitModal(false);

      const payload = {
        examId: exam.id,
        answers: userAnswers,
        timeSpentSeconds: timeSpent,
      };

      const res = await fetch("/api/mock-exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setScoreReport(data);
        setTimerActive(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert(data.error || "Failed to submit exam");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to submit exam");
    } finally {
      setSubmitting(false);
    }
  };

  const currentQ = questions[currentIndex];
  let parsedOptions: string[] = [];
  if (currentQ) {
    try {
      parsedOptions = JSON.parse(currentQ.options);
    } catch {
      parsedOptions = [];
    }
  }

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = questions.length - answeredCount;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-inter">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-mcoa-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-mcoa-midnight">Loading AAPC CPC® Mock Exam Engine...</p>
        </div>
      </div>
    );
  }

  if (examError || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] py-16 px-4 flex items-center justify-center font-inter">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-royal max-w-md w-full text-center space-y-4">
          <div className="w-12 h-12 bg-amber-50 text-mcoa-gold rounded-full flex items-center justify-center mx-auto border border-mcoa-gold/40">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold font-montserrat text-mcoa-midnight">
            Mock Exam Content Unavailable
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            {examError || "The diagnostic test questions could not be loaded at this time. Please retry or contact academic support."}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              onClick={fetchExam}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition font-montserrat"
            >
              Retry Loading Exam
            </button>
            <Link
              href="/practice"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Return to Practice Tools
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FC] min-h-screen py-8 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <Link
            href="/practice"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-mcoa-amethyst hover:text-mcoa-midnight transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit to Practice Simulator</span>
          </Link>

          <span className="text-[10px] uppercase font-bold text-gray-400 font-mono">
            AAPC CPC® & AHIMA CCS® DIAGNOSTIC SIMULATION
          </span>
        </div>

        {/* AAPC / AHIMA Credentialing & Original Content Disclaimer */}
        <div className="p-3.5 rounded-2xl bg-white border border-mcoa-amethyst/30 shadow-xs flex items-center space-x-3 text-xs text-gray-600">
          <ShieldCheck className="w-5 h-5 text-mcoa-gold shrink-0" />
          <p className="text-[11px] leading-tight">
            <strong>Official Certification Notice:</strong> AAPC® (CPC®) and AHIMA® (CCS®) are registered trademarks of their respective organizations. MCOA provides independent preparatory diagnostic simulations. Professional certifications are issued exclusively by AAPC or AHIMA to candidates who pass official examinations. All questions are original synthetic educational materials.
          </p>
        </div>

        {/* Diagnostic Score Report (Displayed if exam is submitted) */}
        {scoreReport ? (
          <div className="space-y-8 animate-fadeIn">
            {/* Executive Result Banner */}
            <div
              className={`rounded-3xl p-8 text-white shadow-royal ${
                scoreReport.passed
                  ? "bg-gradient-to-br from-emerald-900 via-teal-900 to-mcoa-midnight"
                  : "bg-gradient-to-br from-mcoa-midnight via-mcoa-amethyst to-purple-950"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-mcoa-gold">
                    <Award className="w-3.5 h-3.5" />
                    <span>AAPC CPC® Official Diagnostic Sprint Report</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-montserrat">
                    {scoreReport.passed
                      ? "Congratulations! You Met AAPC Passing Standard"
                      : "Diagnostic Assessment Completed — Review Remediation Plan"}
                  </h1>
                  <p className="text-xs text-white/80 max-w-xl">
                    Passing standard: 70% accuracy (AAPC CPC® standard). Your performance breakdown identifies exact high-yield coding domains to review before your credential exam.
                  </p>
                </div>

                {/* Score Dial */}
                <div className="bg-white/10 backdrop-blur-md px-8 py-5 rounded-3xl border border-white/20 text-center shrink-0">
                  <div className="text-[10px] text-white/70 uppercase font-bold font-montserrat tracking-wider">
                    Overall Accuracy
                  </div>
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-mcoa-gold my-1">
                    {scoreReport.percentage}%
                  </div>
                  <div className="text-xs font-semibold text-white/90">
                    {scoreReport.score} of {scoreReport.total} Correct
                  </div>
                  <div className="mt-2">
                    <span
                      className={`text-[11px] font-bold px-3 py-0.5 rounded-full ${
                        scoreReport.passed
                          ? "bg-emerald-500 text-white"
                          : "bg-amber-500 text-white"
                      }`}
                    >
                      {scoreReport.passed ? "PASSED (READY)" : "NEEDS REMEDIATION"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Time Spent & Meta */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-white/80 font-mono">
                <div>Time Taken: {formatTime(timeSpent)}</div>
                <div>Questions Evaluated: {scoreReport.total}</div>
                <div>Passing Threshold: 70%</div>
              </div>
            </div>

            {/* Domain-Level Weak Area Radar / Breakdown */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-mcoa-amethyst uppercase tracking-wider font-montserrat">
                    Diagnostic Competency Mapping
                  </span>
                  <h2 className="font-montserrat font-bold text-lg text-mcoa-midnight">
                    AAPC Exam Domain Breakdown & Weak-Area Analysis
                  </h2>
                </div>
                <BarChart3 className="w-5 h-5 text-mcoa-gold" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(scoreReport.domainScores || {}).map(([domain, stats]: [string, any]) => (
                  <div
                    key={domain}
                    className="p-5 rounded-2xl border border-gray-200/80 bg-gray-50/50 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-montserrat font-bold text-xs text-mcoa-midnight">
                        {domain}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          stats.percent >= 70
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {stats.percent}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          stats.percent >= 70 ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                        style={{ width: `${stats.percent}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono">
                      <span>
                        {stats.correct} / {stats.total} Correct
                      </span>
                      <span>
                        {stats.percent >= 70 ? "Competency Met" : "Remediation Needed"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Question-by-Question Detailed Rationale Review */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <span className="text-[10px] font-bold text-mcoa-amethyst uppercase tracking-wider font-montserrat">
                  Audit & Educational Review
                </span>
                <h2 className="font-montserrat font-bold text-lg text-mcoa-midnight">
                  Question-by-Question Clinical Solutions & Guideline Citations
                </h2>
              </div>

              <div className="space-y-6">
                {scoreReport.questionReview?.map((q: any, idx: number) => (
                  <div
                    key={q.id}
                    className={`p-6 rounded-2xl border transition ${
                      q.isCorrect
                        ? "border-emerald-200 bg-emerald-50/20"
                        : "border-rose-200 bg-rose-50/20"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-gray-200/50 pb-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-montserrat font-bold text-xs px-2.5 py-1 rounded-lg bg-mcoa-midnight text-white">
                          Q{idx + 1}
                        </span>
                        <span className="text-xs font-semibold text-mcoa-amethyst">
                          {q.domain}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {q.isCorrect ? (
                          <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                            <Check className="w-3.5 h-3.5" />
                            <span>Correct (+1)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                            <X className="w-3.5 h-3.5" />
                            <span>Incorrect (0)</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Scenario if present */}
                    {q.scenarioText && (
                      <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 text-xs text-gray-700 font-mono mb-3 leading-relaxed">
                        <span className="font-bold text-gray-500 block mb-0.5">Clinical Note / Context:</span>
                        {q.scenarioText}
                      </div>
                    )}

                    <p className="text-xs font-bold text-mcoa-midnight mb-4 leading-relaxed font-sans">
                      {q.questionText}
                    </p>

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-4">
                      {q.options?.map((opt: string, optIdx: number) => {
                        const isChosen = q.userSelected === optIdx;
                        const isRight = q.correctOptionIndex === optIdx;
                        let optStyle = "border-gray-200 bg-white text-gray-700";
                        if (isRight) {
                          optStyle = "border-emerald-500 bg-emerald-100/70 text-emerald-950 font-bold";
                        } else if (isChosen && !isRight) {
                          optStyle = "border-rose-500 bg-rose-100/70 text-rose-950 font-bold";
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {isRight && (
                              <span className="text-[10px] uppercase font-bold text-emerald-700 bg-white px-2 py-0.5 rounded shadow-xs">
                                Correct Answer
                              </span>
                            )}
                            {isChosen && !isRight && (
                              <span className="text-[10px] uppercase font-bold text-rose-700 bg-white px-2 py-0.5 rounded shadow-xs">
                                Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Step-by-Step Rationale */}
                    <div className="bg-white rounded-xl p-4 border border-gray-200/80 space-y-1.5 text-xs">
                      <div className="flex items-center space-x-1.5 font-bold text-mcoa-midnight font-montserrat">
                        <Sparkles className="w-3.5 h-3.5 text-mcoa-gold" />
                        <span>Faculty Clinical Coding Rationale:</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed font-sans">
                        {q.explanation}
                      </p>
                      {q.guidelineRef && (
                        <div className="text-[11px] text-mcoa-amethyst pt-1 font-mono italic">
                          Reference: {q.guidelineRef}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center space-x-4 pt-4">
              <button
                onClick={() => {
                  setScoreReport(null);
                  setUserAnswers({});
                  setFlaggedQuestions({});
                  setCurrentIndex(0);
                  setTimeLeft((exam?.durationMinutes || 30) * 60);
                  setTimerActive(true);
                  setTimeSpent(0);
                }}
                className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white border border-gray-300 text-mcoa-midnight hover:bg-gray-50 flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Mock Exam</span>
              </button>

              <Link
                href="/practice"
                className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold flex items-center space-x-2"
              >
                <span>Practice Weak Domains in Simulator →</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Live Exam Taking Environment */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Current Question Workspace (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
              {/* Question Header & Timer Strip */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center space-x-3">
                  <span className="font-montserrat font-extrabold text-sm px-3 py-1 bg-mcoa-midnight text-white rounded-xl">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="text-xs font-bold text-mcoa-amethyst uppercase tracking-wider">
                    {currentQ?.domain}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Flag for Review */}
                  <button
                    onClick={() => toggleFlag(currentQ?.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
                      flaggedQuestions[currentQ?.id]
                        ? "bg-amber-100 text-amber-900 border border-amber-300 font-bold"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQ?.id] ? "fill-amber-600 text-amber-600" : ""}`} />
                    <span>{flaggedQuestions[currentQ?.id] ? "Flagged" : "Flag for Review"}</span>
                  </button>

                  {/* Timer */}
                  <div
                    className={`px-3.5 py-1.5 rounded-xl border flex items-center space-x-1.5 font-mono text-xs font-bold ${
                      timeLeft < 300
                        ? "bg-red-50 text-red-600 border-red-200 animate-pulse"
                        : "bg-gray-50 text-mcoa-midnight border-gray-200"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-mcoa-gold" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                </div>
              </div>

              {/* Scenario Context (if present) */}
              {currentQ?.scenarioText && (
                <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-200 text-xs text-gray-800 font-mono leading-relaxed">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 font-sans">
                    Clinical Encounter Scenario:
                  </div>
                  {currentQ.scenarioText}
                </div>
              )}

              {/* Question Stem */}
              <div className="text-sm font-semibold text-mcoa-midnight leading-relaxed font-sans">
                {currentQ?.questionText}
              </div>

              {/* Process-of-Elimination Helper Tip */}
              <div className="flex items-center space-x-1.5 text-[11px] text-gray-400">
                <Strikethrough className="w-3.5 h-3.5 text-mcoa-amethyst" />
                <span>Tip: Click the strikethrough icon next to any option to cross out eliminated answers.</span>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-3">
                {parsedOptions.map((optText, optIdx) => {
                  const isSelected = userAnswers[currentQ?.id] === optIdx;
                  const elimKey = `${currentQ?.id}-${optIdx}`;
                  const isEliminated = !!eliminatedOptions[elimKey];

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQ?.id, optIdx)}
                      className={`p-4 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between group ${
                        isSelected
                          ? "border-mcoa-midnight bg-mcoa-pearl/50 shadow-sm"
                          : isEliminated
                          ? "border-gray-200 bg-gray-100/60 opacity-60"
                          : "border-gray-200 hover:border-mcoa-amethyst/50 bg-white"
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold transition ${
                            isSelected
                              ? "border-mcoa-midnight bg-mcoa-midnight text-white"
                              : "border-gray-300 text-gray-500 group-hover:border-mcoa-amethyst"
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <span
                          className={`text-xs font-mono font-medium ${
                            isEliminated ? "line-through text-gray-400" : "text-gray-800"
                          }`}
                        >
                          {optText}
                        </span>
                      </div>

                      {/* Strike-through elimination button */}
                      <button
                        type="button"
                        onClick={(e) => toggleEliminate(currentQ?.id, optIdx, e)}
                        className={`p-1.5 rounded-lg border text-xs transition ${
                          isEliminated
                            ? "border-amber-300 bg-amber-50 text-amber-700"
                            : "border-gray-200 hover:bg-gray-100 text-gray-400"
                        }`}
                        title="Eliminate Answer Choice"
                      >
                        <Strikethrough className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Question Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 transition flex items-center space-x-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-midnight text-white hover:bg-mcoa-amethyst transition flex items-center space-x-1.5"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(true)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold flex items-center space-x-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Assessment</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Question Palette & Exam Progress (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-5">
                <div>
                  <h3 className="font-montserrat font-bold text-sm text-mcoa-midnight">
                    Question Navigation Palette
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Jump to any question. Monitor answered and flagged status.
                  </p>
                </div>

                {/* Progress Summary */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="text-[10px] text-emerald-800 font-bold uppercase">Answered</div>
                    <div className="font-mono text-lg font-bold text-emerald-700">
                      {answeredCount} / {questions.length}
                    </div>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="text-[10px] text-amber-800 font-bold uppercase">Unanswered</div>
                    <div className="font-mono text-lg font-bold text-amber-700">
                      {unansweredCount}
                    </div>
                  </div>
                </div>

                {/* Question Grid Buttons */}
                <div className="grid grid-cols-5 gap-2 pt-2">
                  {questions.map((q, idx) => {
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const isFlagged = flaggedQuestions[q.id];
                    const isCurrent = idx === currentIndex;

                    let btnStyle = "bg-white text-gray-700 border-gray-200";
                    if (isCurrent) {
                      btnStyle = "border-2 border-mcoa-gold bg-mcoa-pearl font-bold text-mcoa-midnight ring-2 ring-mcoa-gold/30";
                    } else if (isAnswered) {
                      btnStyle = "bg-mcoa-midnight text-white border-mcoa-midnight";
                    }

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-10 rounded-xl border text-xs font-mono font-bold relative transition flex items-center justify-center ${btnStyle}`}
                      >
                        <span>{idx + 1}</span>
                        {isFlagged && (
                          <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1 right-1"></span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Palette Legend */}
                <div className="border-t border-gray-100 pt-3 space-y-1.5 text-[11px] text-gray-500">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded bg-mcoa-midnight inline-block"></span>
                    <span>Answered Question</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded border border-gray-300 inline-block"></span>
                    <span>Unanswered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                    <span>Flagged for Review</span>
                  </div>
                </div>

                {/* Finish Exam Button */}
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>End & Score Exam</span>
                </button>
              </div>

              {/* Trademark & Legal Notice */}
              <div className="bg-gray-100/70 p-4 rounded-2xl text-[10px] text-gray-500 space-y-1 leading-relaxed">
                <span className="font-bold text-gray-700 block">AAPC® / AHIMA® Educational Disclaimer:</span>
                CPT® is a registered trademark of the AMA. AAPC®, CPC®, AHIMA®, and CCS® are registered trademarks of their respective credentialing bodies. This diagnostic simulator is an independent training assessment developed by MCOA for candidate exam readiness.
              </div>
            </div>
          </div>
        )}

        {/* Submit Confirmation Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl animate-scaleIn">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="font-montserrat font-bold text-lg text-mcoa-midnight">
                  Ready to Submit Your Exam?
                </h3>
                <p className="text-xs text-gray-500">
                  {unansweredCount > 0 ? (
                    <span className="text-amber-800 font-semibold">
                      You still have {unansweredCount} unanswered question{unansweredCount > 1 ? "s" : ""}. Unanswered questions are scored as 0.
                    </span>
                  ) : (
                    "You have answered all questions. Your responses will be evaluated against official AAPC guidelines."
                  )}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-300 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50"
                >
                  Return to Exam
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={submitExam}
                  className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold flex items-center justify-center space-x-1.5"
                >
                  {submitting ? (
                    <span>Evaluating...</span>
                  ) : (
                    <span>Confirm & Score</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

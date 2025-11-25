"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, BookOpen, Clock, User, Target, Download, FileText, MessageCircle, CheckCircle2 } from "lucide-react";
import { lessons } from "@/data/lessons";

export default function MapelDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const lesson = lessons[slug];
  const [activeStep, setActiveStep] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showComments, setShowComments] = useState(false);

  if (!lesson) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Materi Tidak Ditemukan</h1>
          <p className="text-gray-600">Silakan kembali dan pilih materi lainnya.</p>
        </div>
      </main>
    );
  }

  const currentStep = lesson.steps.find((s) => s.order === activeStep);
  const isStepCompleted = completedSteps.includes(activeStep);
  const progressPercent = (completedSteps.length / lesson.steps.length) * 100;

  const markStepComplete = () => {
    if (!completedSteps.includes(activeStep)) {
      setCompletedSteps([...completedSteps, activeStep]);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4 text-blue-100">
            <BookOpen className="w-5 h-5" />
            <span>Materi Pembelajaran</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>
          <p className="text-blue-100 max-w-3xl mb-6">{lesson.description}</p>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{lesson.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>Instruktur: {lesson.instructor}</span>
            </div>
            <div className="px-3 py-1 bg-blue-500 rounded-full text-xs font-semibold">{lesson.level}</div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-md border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              Tujuan Pembelajaran
            </h2>
            <ul className="space-y-3">
              {lesson.learningOutcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                    ✓
                  </div>
                  <span className="text-gray-700">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* STEPS SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-md space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Langkah Pembelajaran</h3>
              <div className="space-y-2">
                {lesson.steps.map((step) => (
                  <motion.button
                    key={step.order}
                    onClick={() => setActiveStep(step.order)}
                    whileHover={{ x: 4 }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeStep === step.order
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          activeStep === step.order ? "bg-blue-400" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {completedSteps.includes(step.order) ? "✓" : step.order}
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold leading-tight">{step.title}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="border-t pt-4">
                <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Unduh Materi
                </button>
              </div>
            </div>
          </aside>

          {/* CONTENT AREA */}
          <section className="lg:col-span-3 space-y-6">
            <AnimatePresence mode="wait">
              {currentStep && (
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-md"
                >
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-blue-600 mb-3">
                      <span className="text-sm font-semibold">Langkah {currentStep.order} dari {lesson.steps.length}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentStep.title}</h2>
                    <p className="text-gray-600">{currentStep.description}</p>
                  </div>

                  <div className="mb-8">
                    <div className="bg-gray-50 rounded-xl p-6 text-gray-800 whitespace-pre-wrap leading-relaxed text-sm">
                      {currentStep.content}
                    </div>
                  </div>

                  {/* RESOURCES */}
                  {currentStep.resources && currentStep.resources.length > 0 && (
                    <div className="border-t pt-6 mb-6">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Referensi &amp; Sumber Daya
                      </h3>
                      <ul className="space-y-2">
                        {currentStep.resources.map((res, idx) => (
                          <li key={idx}>
                            <a
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center gap-2"
                            >
                              <ChevronRight className="w-4 h-4" />
                              {res.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* MARK COMPLETE & QUIZ */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={markStepComplete}
                      disabled={isStepCompleted}
                      className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition ${
                        isStepCompleted
                          ? "bg-green-100 text-green-700 cursor-default"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      {isStepCompleted ? "Selesai" : "Tandai Selesai"}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowQuiz(!showQuiz)}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
                    >
                      📝 Kuis
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowComments(!showComments)}
                      className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold flex items-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Diskusi
                    </motion.button>
                  </div>

                  {/* NAVIGATION */}
                  <div className="flex gap-4 pt-6 border-t">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                      disabled={activeStep === 1}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
                    >
                      ← Sebelumnya
                    </motion.button>

                    <div className="flex-1" />

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveStep(Math.min(lesson.steps.length, activeStep + 1))}
                      disabled={activeStep === lesson.steps.length}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
                    >
                      Selanjutnya →
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* QUIZ SECTION */}
            <AnimatePresence>
              {showQuiz && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl p-8 shadow-md"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Kuis: {currentStep?.title}</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="font-semibold text-gray-800 mb-3">Pertanyaan 1: Apa yang sudah Anda pelajari dari materi ini?</p>
                      <textarea
                        placeholder="Tulis jawaban Anda di sini..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                    >
                      Kirim Jawaban
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* COMMENTS SECTION */}
            <AnimatePresence>
              {showComments && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl p-8 shadow-md"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Diskusi &amp; Komentar</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold text-gray-800 mb-2">Tulis Komentar Anda</label>
                      <textarea
                        placeholder="Bagikan pemikiran, pertanyaan, atau feedback Anda..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        rows={4}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
                    >
                      Posting Komentar
                    </motion.button>
                    <div className="mt-6 space-y-4 border-t pt-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-gray-800">Ahmad Dahlan</p>
                        <p className="text-sm text-gray-500 mb-2">2 hari lalu</p>
                        <p className="text-gray-700">Materi ini sangat membantu! Apakah ada contoh proyek yang bisa saya lihat?</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-gray-800">Instruktur</p>
                        <p className="text-sm text-gray-500 mb-2">1 hari lalu</p>
                        <p className="text-gray-700">Terima kasih atas pertanyaannya! Proyek contoh tersedia di repository GitHub kami.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* PROGRESS INDICATOR */}
        <section className="mt-12 bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Progress Pembelajaran</h3>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {completedSteps.length} dari {lesson.steps.length} langkah selesai ({Math.round(progressPercent)}%)
          </p>
        </section>
      </div>
    </main>
  );
}

'use client';

import {Randonapi} from "@/api/randomAPi";
import {RandomQuestion} from "@/types/random";
import QuestionCardR from "@/ui/randomCard/QuestionCardRandom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {AnimatePresence, motion} from 'framer-motion';
import {useState} from "react";

export default function RandomPage() {
  const queryClient = useQueryClient();
  const [currentScore, setCurrentScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function translateText(text: string) {
    try {
      const res = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          q: text,
          source: 'auto',
          target: 'ru',
          format: 'text'
        })
      });
      const json = await res.json();
      return json.translatedText ?? text;
    } catch {
      return text;
    }
  }

  const {
    data: questions = [],
    refetch,
    isLoading,
    isFetching
  } = useQuery<RandomQuestion[]>({
    queryKey: ['random'],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const original = await Randonapi();
      if (!original || !Array.isArray(original)) return [];

      const translated = await Promise.all(original.map(async (q: any) => {
        const tQuestion = await translateText(q.question || '');
        const tCorrect = await translateText(q.correct_answer || '');
        const tIncorrects = Array.isArray(q.incorrect_answers)
          ? await Promise.all(q.incorrect_answers.map((a: string) => translateText(a)))
          : [];

        return {
          ...q,
          question: tQuestion,
          correct_answer: tCorrect,
          incorrect_answers: tIncorrects
        };
      }));

      return translated;
    },
  });

  const goToNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      queryClient.invalidateQueries({queryKey: ['random']});
      setCurrentIndex(0);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setCurrentScore(prev => prev + 1);

    const delay = isCorrect ? 1500 : 1000;
    setTimeout(() => {
      goToNextQuestion();
    }, delay);
  };

  const handleRestart = () => {
    setCurrentScore(0);
    setCurrentIndex(0);
    refetch();
  };

  const currentQuestion = questions[currentIndex];

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-xl font-medium text-gray-700">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen p-6 gap-6"
    >
      <motion.h1
        className="text-4xl font-extrabold text-primary mr-110"
        initial={{opacity: 0, y: -30}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
      >
        Random Questions
      </motion.h1>

      <AnimatePresence mode="wait">
        {currentQuestion && (
          <motion.div
            key={currentIndex}
            initial={{opacity: 0, x: 30}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -30}}
            transition={{duration: 0.3}}
            className="w-full max-w-xl"
          >
            <QuestionCardR
              question={currentQuestion}
              index={currentIndex}
              onAnswered={handleAnswer}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

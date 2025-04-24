'use client';

import React, { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Dữ liệu mẫu - sau này có thể thay thế bằng API call
  const questions: Question[] = [
    {
      id: 1,
      question: "Câu hỏi mẫu 1?",
      options: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
      correctAnswer: 0
    },
    // Thêm các câu hỏi khác ở đây
  ];

  const handleAnswerClick = (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Bài kiểm tra trắc nghiệm</h1>
        
        {showScore ? (
          <div className="text-center">
            <h2 className="text-2xl mb-4">
              Bạn đã hoàn thành bài kiểm tra!
            </h2>
            <p className="text-xl mb-4">
              Điểm số của bạn: {score} / {questions.length}
            </p>
            <button
              onClick={resetQuiz}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Làm lại
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="mb-6">
              <span className="text-sm text-gray-500">
                Câu hỏi {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            
            <h2 className="text-xl mb-6 text-foreground">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage; 
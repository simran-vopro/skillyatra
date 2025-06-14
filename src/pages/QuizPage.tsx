import { useState } from "react";
import {  TimerReset } from "lucide-react";

const sampleQuestions = [
  {
    question: "What does NLP stand for in Data Science?",
    options: ["Neural Language Processing", "Natural Language Processing", "New Language Predictor", "None of the above"],
    answer: 1,
  },
  {
    question: "Which Python library is commonly used for NLP?",
    options: ["NumPy", "Pandas", "NLTK", "TensorFlow"],
    answer: 2,
  },
  {
    question: "Which model is widely used for language generation?",
    options: ["CNN", "RNN", "GPT", "KNN"],
    answer: 2,
  },
];

const QuizPage = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  const question = sampleQuestions[current];

  const handleNext = () => {
    if (selected === null) return;
    setAnswers([...answers, selected]);
    setSelected(null);
    setCurrent(current + 1);
  };

  const handlePrevious = () => {
    setCurrent(current - 1);
    setSelected(answers[current - 1] ?? null);
    setAnswers(answers.slice(0, -1));
  };

  const isLast = current === sampleQuestions.length - 1;
  const progress = ((current + 1) / sampleQuestions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
        ✍️ Module Quiz
      </h1>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className="bg-purple-600 h-2.5 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Question Section */}
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border border-gray-100">
        <div className="text-sm text-gray-500 flex justify-between items-center">
          <span>
            Question {current + 1} of {sampleQuestions.length}
          </span>
          <span className="flex items-center gap-1 text-blue-600">
            <TimerReset className="w-4 h-4" /> 2:30
          </span>
        </div>

        <h2 className="text-lg font-semibold text-gray-800">{question.question}</h2>

        <ul className="space-y-3">
          {question.options.map((option, index) => (
            <li key={index}>
              <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer transition hover:bg-purple-50">
                <input
                  type="radio"
                  name={`q-${current}`}
                  value={index}
                  checked={selected === index}
                  onChange={() => setSelected(index)}
                  className="accent-purple-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <button
            disabled={current === 0}
            onClick={handlePrevious}
            className="px-4 py-2 text-sm rounded-md border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>

          {!isLast ? (
            <button
              onClick={handleNext}
              disabled={selected === null}
              className="px-5 py-2 text-sm font-semibold bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => alert("Submit logic goes here")}
              disabled={selected === null}
              className="px-5 py-2 text-sm font-semibold bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>

      {/* Answer Summary (After Submit) — Optional */}
      {/* Add logic to show score and correct answers here */}
    </div>
  );
};

export default QuizPage;

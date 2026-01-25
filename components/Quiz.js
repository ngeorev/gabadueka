"use client";

import { useState, useEffect } from 'react';

// Component to render the three‑question DevOps quiz. Only one question
// shows at a time and each has a five minute countdown. When the user
// completes the quiz or time runs out on the last question, results
// are sent to the API and a completion message appears.
export default function Quiz() {
  // Define the quiz questions. Two multiple choice and one open text.
  const questions = [
    {
      id: 1,
      text: 'Двойка зелени очи наблюдава света, винаги забелязвайки онова, което другите пропускат. Коя черта традиционно се свързва със зеленооките хора?',
      type: 'mc',
      options: [
        { label: 'A) Интуиция', value: 'A' },
        { label: 'B) Ревност', value: 'B' },
        { label: 'C) Спокойствие', value: 'C' },
      ],
    },
    {
      id: 2,
      text: 'Майка и дъщеря вървят заедно през живота.Едната учи, другата се учи, но и двете израстват. Коя е най-силната връзка между тях?',
      type: 'mc',
      options: [
        { label: 'A) Споделени преживявания', value: 'A' },
        { label: 'B) Споделени емоции', value: 'B' },
        { label: 'C) Споделени мечти', value: 'C' },
      ],
    },
    {
      id: 3,
      text: 'Зелените очи виждат истории навсякъде. Как би описала себе си като човек с няколко думи?',
      type: 'text',
    },
  ];

  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [answers, setAnswers] = useState({ q1: null, q2: null, q3: '' });
  const [completed, setCompleted] = useState(false);

  // Reset the timer whenever the current question changes
  useEffect(() => {
    if (completed) return;
    setTimeLeft(300);
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          // If time runs out, automatically advance
          handleNext();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // Format time as MM:SS
  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function handleOptionSelect(questionId, value) {
    setAnswers((prev) => ({ ...prev, [`q${questionId}`]: value }));
  }

  function handleTextChange(e) {
    setAnswers((prev) => ({ ...prev, q3: e.target.value }));
  }

  function handleNext() {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    setCompleted(true);
    // Persist results by posting to our API route
    fetch('/api/saveQuiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    }).catch((err) => {
      console.warn('Could not save quiz results:', err);
    });
  }

  if (completed) {
    return (
      <div id="quiz-complete" className="quiz-complete" style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🎉 Поздравленияя! 💃</h1>
        <p style={{ fontSize: '1.3rem' }}>Успешно завърши въпросникът. Печелиш мистериозна нагарада.‍ Свържи се със собственика, за да си я получиш!</p>
      </div>
    );
  }

  const question = questions[current];
  return (
    <div id="quiz-container">
      <h3>Флирт в нюанс - зелено!</h3>
      <div
        key={question.id}
        className="question-block active"
        id={`question${question.id}`}
      >
        <h4>
          {question.id}. {question.text}
        </h4>
        {question.type === 'mc' && (
          <div className="options">
            {question.options.map((opt) => (
              <label key={opt.value}>
                <input
                  type="radio"
                  name={`q${question.id}`}
                  value={opt.value}
                  checked={answers[`q${question.id}`] === opt.value}
                  onChange={() => handleOptionSelect(question.id, opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        )}
        {question.type === 'text' && (
          <input type="text" name="q3" value={answers.q3} onChange={handleTextChange} />
        )}
        <div className="timer">{formatTime(timeLeft)}</div>
        <button
          className="btn btn-outline"
          onClick={handleNext}
        >
          {current < questions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
}

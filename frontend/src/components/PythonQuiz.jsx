import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import supabase from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';

const PythonQuiz = () => {
  const questions = [
    {
      question: "What is the output of the following code?\n\n```python\nprint([i for i in range(5)])\n```",
      options: ["[0, 1, 2, 3, 4]", "[1, 2, 3, 4, 5]", "[0, 1, 2, 3]", "[1, 2, 3, 4]"],
      answer: "[0, 1, 2, 3, 4]",
      category: "Python Basics"
    },
    {
      question: "Which of the following statements is true about Python?",
      options: [
        "Python is a low-level language.",
        "Python is a compiled language.",
        "Python is a high-level language.",
        "Python is a functional programming language."
      ],
      answer: "Python is a high-level language.",
      category: "Python Basics"
    },
    {
      question: "What is the result of the following expression?\n\n```python\n3 * 'abc'\n```",
      options: ["'abcabcabc'", "'abc abc abc'", "['abc', 'abc', 'abc']", "'aabbcc'"],
      answer: "'abcabcabc'",
      category: "Python Strings"
    },
    {
      question: "What will be the output of the following code?\n\n```python\na = [1, 2, 3]\nb = a\na[0] = 0\nprint(b)\n```",
      options: ["[1, 2, 3]", "[0, 2, 3]", "[0, 1, 2, 3]", "[0, 2, 3, 4]"],
      answer: "[0, 2, 3]",
      category: "Python Lists"
    },
    {
      question: "Which of the following is used to define a function in Python?",
      options: ["func()", "define func()", "def func()", "function func()"],
      answer: "def func()",
      category: "Python Functions"
    },
    {
      question: "What is the output of the following code?\n\n```python\nx = 5\ny = x\nx += 2\nprint(y)\n```",
      options: ["5", "7", "2", "None of the above"],
      answer: "5",
      category: "Python Variables"
    },
    {
      question: "What is the output of the following code?\n\n```python\nprint('Hello'[::-1])\n```",
      options: ["'Hello'", "'olleH'", "'H'", "'o'"],
      answer: "'olleH'",
      category: "Python Strings"
    },
    {
      question: "Which of the following is a correct way to open a file named 'example.txt' in read mode in Python?",
      options: ["file = open('example.txt', 'r')", "file = open('example.txt', 'read')", "file = open('example.txt', 'w')", "file = open('example.txt', 'rb')"],
      answer: "file = open('example.txt', 'r')",
      category: "Python File Handling"
    },
    {
      question: "What will be the output of the following code?\n\n```python\nnumbers = [1, 2, 3, 4]\nprint(sum(numbers))\n```",
      options: ["10", "24", "4", "None of the above"],
      answer: "10",
      category: "Python Lists"
    },
    {
      question: "Which of the following data structures is used to implement FIFO order?",
      options: ["Stack", "Queue", "Heap", "Array"],
      answer: "Queue",
      category: "Data Structures"
    }
  ];

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const jobId = searchParams.get('jobId');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [timer, setTimer] = useState(300);
  const navigate = useNavigate();

  const checkDate = async (jobId) => {
    try {
      const { data, error } = await supabase
        .from('test_end_date')
        .select('end_date')
        .eq('job_id', jobId)
        .single();
  
      if (error) {
        console.error('Error fetching test_end_date:', error.message);
        return;
      }
  
      if (data) {
        const today = new Date().toISOString().split('T')[0]; 
        const endDate = new Date(data.end_date).toISOString().split('T')[0]; 
  
        if (today === endDate) {
          alert('Test date ended');
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error fetching test_end_date:', error.message);
    }
  };

  useEffect(() => {
    checkDate(jobId);
  }, [jobId]);

  useEffect(() => {
    const checkAndSetAttempted = async () => {
      const { data, error } = await supabase
        .from('test_attempted')
        .select('attempted')
        .eq('user_id', id)
        .eq('job_id', jobId)
        .single();

      if (data && data.attempted) {
        alert('You have already attempted this quiz. You will be redirected to the login page.');
        navigate('/login');
      } else {
        const { error: insertError } = await supabase
          .from('test_attempted')
          .insert({ user_id: id, job_id: jobId, attempted: true });

        if (insertError) {
          console.error('Error inserting test_attempted:', insertError);
        }
      }
    };
    checkAndSetAttempted();
  }, [id, jobId, navigate]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 0) {
          clearInterval(countdown);
          alert('Time is up! You will be redirected to the login page.');
          navigate('/login');
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [navigate]);

  const handleOptionChange = (option) => {
    setUserAnswer(option);
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentIndex]: option
    }));
  };

  const handleSubmit = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer(userAnswers[currentIndex + 1] || '');
    } else {
      evaluateQuiz();
    }
  };

  const evaluateQuiz = async () => {
    const totalScore = questions.reduce((acc, question, index) => {
      return acc + (userAnswers[index] === question.answer ? 1 : 0);
    }, 0);
    setScore(totalScore);

    const { error } = await supabase
      .from('user_scores')
      .insert({ user_id: id, job_id: jobId, score: totalScore });

    if (error) {
      console.error('Error inserting user_score:', error);
    } else {
      alert('Quiz completed. Your score has been recorded.');
      navigate('/login');
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert('Test ended due to tab change.');
        navigate('/testended');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [navigate]);

  return (
    <div className="quiz-app bg-white border-4 border-gray-200 p-4 rounded-2xl max-w-3xl mx-auto mt-10 shadow-lg">
      <div className="quiz-info flex justify-between p-4 bg-gray-100 rounded-2xl mb-4">
        <div className="category">
          Category: <span>{questions[currentIndex]?.category}</span>
        </div>
        <div className="count">
          Questions Count: <span>{questions.length}</span>
        </div>
      </div>

      {questions.length > 0 && (
        <>
          <div className="quiz-area bg-white p-4 mb-4 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-4">{questions[currentIndex]?.question}</h2>
            <div className="options-area">
              {questions[currentIndex]?.options.map((option, index) => (
                <div key={index} className="option bg-gray-100 p-4 mb-2 rounded-lg">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${currentIndex}`}
                      value={option}
                      checked={userAnswer === option}
                      onChange={() => handleOptionChange(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="submit-button bg-purple-900 text-white px-4 py-2 rounded w-full"
          >
            Submit Answer
          </button>

          <div className="bullets flex justify-between items-center p-4 bg-gray-100 rounded-2xl mt-4">
            <div className="spans flex">
              {questions.map((_, index) => (
                <span
                  key={index}
                  className={`w-4 h-4 rounded-full mr-2 ${index <= currentIndex ? 'bg-purple-900' : 'bg-white border'}`}
                ></span>
              ))}
            </div>
            <div className="countdown font-bold text-lg">{`${Math.floor(timer / 60).toString().padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`}</div>
          </div>
        </>
      )}

    </div>
  );
};

export default PythonQuiz;
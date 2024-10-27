import React from 'react';
import { MathJax } from 'better-react-mathjax';

const Questionblockcomp = ({ item, marked, correct }) => {
  const options = [item?.option1, item?.option2, item?.option3, item?.option4];

  const renderIcon = (optionKey) => {
    const isCorrect = correct === optionKey; // Check if this option is correct
    const isMarked = marked === optionKey; // Check if this option is marked by the user

    if (isCorrect && isMarked) {
      return <TickIcon />;
    } else if (isMarked && !isCorrect) {
      return <CrossIcon />;
    } else if (isCorrect) {
      return <TickIcon />;
    }
    return null; // For all other cases
  };

  const determineBorderColor = (optionKey) => {
    const isCorrect = correct === optionKey; // Check if this option is correct
    const isMarked = marked === optionKey; // Check if this option is marked by the user

    if (isCorrect && isMarked) {
      return 'border-green-500'; // Correct and marked
    } else if (isMarked) {
      return 'border-red-500'; // Marked but wrong
    } else if (isCorrect) {
      return 'border-green-600'; // Correct but not marked
    }
    return 'border-slate-600'; // Default border for unmarked options
  };

  return (
    <div>
      {/* Question Block */}
      <div className="py-10 space-y-4 mx-4">
        <p className="p-2 ">
          <MathJax inline dynamic>
            <span
              dangerouslySetInnerHTML={{
                __html: `<p>${item?.question}</p> `.replace(/\n[\s]*/g, ""),
              }}
            />
          </MathJax>
        </p>

        {options.map((option, index) => {
          const optionKey = `op${index + 1}`; // 'op1', 'op2', etc.
          const borderColor = determineBorderColor(optionKey); // Get the border color for this option

          return (
            <div key={index} className={`border-2 rounded-2xl ${borderColor}`}>
              <label className="label cursor-pointer p-4 flex items-center">
                <span className="label-text">
                  <MathJax inline dynamic>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `<p>Option ${index + 1}: ${option}</p> `.replace(
                          /\n[\s]*/g,
                          ""
                        ),
                      }}
                    />
                  </MathJax>
                </span>
                {renderIcon(optionKey)} {/* Render the appropriate icon */}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// SVG Icons
const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6 ml-2" // Margin left for spacing
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const TickIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6 ml-2" // Margin left for spacing
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

export default Questionblockcomp;

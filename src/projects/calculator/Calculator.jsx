import React, { useState } from 'react';

const Calculator = () => {
  const [evaluate, setEvaluate] = useState('0');
  // const [formula, setFormula] = useState('');
  const [isEvaluated, setIsEvaluated] = useState(false);

  const handleNumClick = (e) => {
    if (/[0-9]{2,}/.test(evaluate)) {
      setEvaluate(evaluate + e.target.value);
    } else if (isEvaluated) {
      setIsEvaluated(false);
      setEvaluate(evaluate.slice(0, -1) + e.target.value);
    }
    if (evaluate === '0') {
      setEvaluate('' + e.target.value);
    } else {
      setEvaluate(evaluate + e.target.value);
    }
  };

  const handleOperatorsClick = (e) => {
    if (e.target.value === '-' && !/-$/.test(evaluate)) {
      setEvaluate(evaluate + e.target.value);
    } else if (/(-|\+|\/|\*){2}$/.test(evaluate)) {
      setEvaluate(evaluate.slice(0, -2) + e.target.value);
    } else if (/(-|\+|\/|\*)$/.test(evaluate)) {
      setEvaluate(evaluate.slice(0, -1) + e.target.value);
    } else if (/\.$/.test(evaluate)) {
      setEvaluate(evaluate + '');
    } else {
      setEvaluate(evaluate + e.target.value);
    }
  };

  const handleClearClick = () => {
    setEvaluate('0');
  };

  const handleEqualsClick = () => {
    const result = eval(evaluate);
    setEvaluate(
      result.toString().includes('.') ? result.toFixed(4).toString().replace(/0*$/g, '') : result,
    );
    setIsEvaluated(true);
  };

  const handleDecimalClick = () => {
    if (evaluate.includes('.') && /\.\d+(-|\+|\/|\*)/g.test(evaluate)) {
      setEvaluate(evaluate + '.');
    } else if (!evaluate.includes('.')) {
      setEvaluate(evaluate + '.');
    }
  };

  return (
    <div className="content">
      <div className="container">
        <div className="calc-board">
          <div className="calc-display">
            {/* <div className="formula">{formula}</div> */}
            <div className="screen" id="display">
              {evaluate}
            </div>
          </div>
          <div className="calc-numbers">
            <button onClick={handleNumClick} className="calc-btn" id="seven" value="7">
              7
            </button>
            <button onClick={handleNumClick} className="calc-btn" id="eight" value="8">
              8
            </button>
            <button onClick={handleNumClick} className="calc-btn" id="nine" value="9">
              9
            </button>
            <button
              onClick={handleOperatorsClick}
              className="calc-btn operation-btn"
              id="add"
              value="+">
              +
            </button>
            <button onClick={handleNumClick} className="calc-btn" id="four" value="4">
              4
            </button>
            <button onClick={handleNumClick} className="calc-btn" id="five" value="5">
              5
            </button>
            <button onClick={handleNumClick} className="calc-btn" id="six" value="6">
              6
            </button>
            <button
              onClick={handleOperatorsClick}
              className="calc-btn operation-btn"
              id="subtract"
              value="-">
              -
            </button>
            <button onClick={handleNumClick} className="calc-btn" id="one" value="1">
              1
            </button>
            <button onClick={handleNumClick} className="calc-btn" id="two" value="2">
              2
            </button>
            <button onClick={handleNumClick} className="calc-btn" id="three" value="3">
              3
            </button>

            <button
              onClick={handleOperatorsClick}
              className="calc-btn operation-btn"
              id="multiply"
              value="*">
              ×
            </button>
            <button onClick={handleDecimalClick} className="calc-btn" id="decimal">
              .
            </button>
            <button onClick={handleNumClick} className="calc-btn" id="zero" value="0">
              0
            </button>
            <button onClick={handleEqualsClick} className="calc-btn equals-btn" id="equals">
              =
            </button>
            <button
              onClick={handleOperatorsClick}
              className="calc-btn operation-btn"
              id="divide"
              value="/">
              /
            </button>
            <button onClick={handleClearClick} className="calc-btn calc-clear" id="clear">
              C
            </button>

            {/* {calcMarks.map((mark, index) => {
              return <CalcBtn mark={mark} key={`CalcMark${index}`} />;
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;

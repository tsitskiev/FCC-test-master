
//CaLCuLaToR

const isOperator = /[x/+‑]/,
  endsWithOperator = /[x+‑/]$/,
  endsWithNegativeSign = /\d[x/+‑]{1}‑$/,
  clearStyle = { background: '#ac3939' },
  operatorStyle = { background: '#666666' },
  equalsStyle = {
    background: '#004466',
    position: 'absolute',
    height: 130,
    bottom: 5
  };

// COMPONENTS:
class Calculators extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: '0',
      prevVal: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: ''
    };
    this.maxDigitWarning = this.maxDigitWarning.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.initialize = this.initialize.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
  }

  maxDigitWarning() {
    this.setState({
      currentVal: 'Digit Limit Met',
      prevVal: this.state.currentVal
    });
    setTimeout(() => this.setState({ currentVal: this.state.prevVal }), 1000);
  }

  handleEvaluate() {
    if (!this.state.currentVal.includes('Limit')) {
      let expression = this.state.formula;
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression
        .replace(/x/g, '*')
        .replace(/‑/g, '-')
        .replace('--', '+0+0+0+0+0+0+');
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      this.setState({
        currentVal: answer.toString(),
        formula:
          expression
            .replace(/\*/g, '⋅')
            .replace(/-/g, '‑')
            .replace('+0+0+0+0+0+0+', '‑-')
            .replace(/(x|\/|\+)‑/, '$1-')
            .replace(/^‑/, '-') +
          '=' +
          answer,
        prevVal: answer,
        evaluated: true
      });
    }
  }

  handleOperators(e) {
    if (!this.state.currentVal.includes('Limit')) {
      const value = e.target.value;
      const { formula, prevVal, evaluated } = this.state;
      this.setState({ currentVal: value, evaluated: false });
      if (evaluated) {
        this.setState({ formula: prevVal + value });
      } else if (!endsWithOperator.test(formula)) {
        this.setState({
          prevVal: formula,
          formula: formula + value
        });
      } else if (!endsWithNegativeSign.test(formula)) {
        this.setState({
          formula:
            (endsWithNegativeSign.test(formula + value) ? formula : prevVal) +
            value
        });
      } else if (value !== '‑') {
        this.setState({
          formula: prevVal + value
        });
      }
    }
  }

  handleNumbers(e) {
    if (!this.state.currentVal.includes('Limit')) {
      const { currentVal, formula, evaluated } = this.state;
      const value = e.target.value;
      this.setState({ evaluated: false });
      if (currentVal.length > 21) {
        this.maxDigitWarning();
      } else if (evaluated) {
        this.setState({
          currentVal: value,
          formula: value !== '0' ? value : ''
        });
      } else {
        this.setState({
          currentVal:
            currentVal === '0' || isOperator.test(currentVal)
              ? value
              : currentVal + value,
          formula:
            currentVal === '0' && value === '0'
              ? formula === '' ? value : formula : /([^.0-9]0|^0)$/.test(formula)
              ? formula.slice(0, -1) + value
              : formula + value
        });
      }
    }
  }

  handleDecimal() {
    if (this.state.evaluated === true) {
      this.setState({
        currentVal: '0.',
        formula: '0.',
        evaluated: false
      });
    } else if (
      !this.state.currentVal.includes('.') &&
      !this.state.currentVal.includes('Limit')
    ) {
      this.setState({ evaluated: false });
      if (this.state.currentVal.length > 21) {
        this.maxDigitWarning();
      } else if (
        endsWithOperator.test(this.state.formula) ||
        (this.state.currentVal === '0' && this.state.formula === '')
      ) {
        this.setState({
          currentVal: '0.',
          formula: this.state.formula + '0.'
        });
      } else {
        this.setState({
          currentVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
          formula: this.state.formula + '.'
        });
      }
    }
  }


  //ASDASDADASDASDASD
  import React, { useState } from 'react';

const Calculator = () => {
  const [evaluate, setEvaluate] = useState('0');
  const [formula, setFormula] = useState('');
  const [isEvaluated, setIsEvaluated] = useState(false);

  const isEndsWithOp = /(-|\+|\/|\*)$/;

  const handleNumClick = (e) => {
    // if (e.target.value === '0' && /0$/.test(evaluate)) {
    //   return null;
    // }
    if (isEndsWithOp.test(evaluate)) {
      console.log('pomogite');
      setEvaluate('' + e.target.value);
    } else if (/[0-9]{2,}/.test(evaluate)) {
      setEvaluate(evaluate + e.target.value);
    } else if (isEvaluated) {
      setIsEvaluated(false);
      setEvaluate(evaluate.slice(0, -1) + e.target.value);
    } else if (evaluate === '0') {
      setEvaluate('' + e.target.value);
    } else {
      setEvaluate(evaluate + e.target.value);
    }
  };

  const handleOperatorsClick = (e) => {
    if (isEndsWithOp.test(evaluate)) {
      setEvaluate(evaluate.slice(0, -1) + e.target.value);
    } else if (/\.$/.test(evaluate)) {
      return null;
    } else {
      setEvaluate(e.target.value);
      setFormula(formula + evaluate + e.target.value);
    }
  };

  const handleClearClick = () => {
    setEvaluate('0');
    setFormula('');
  };

  const handleEqualsClick = () => {
    const result = eval(isEndsWithOp.test(formula) ? formula.slice(0, -1) : formula);
    const finalRes = result.toString().includes('.')
      ? result.toFixed(4).toString().replace(/0*$/g, '')
      : result;
    setEvaluate(finalRes);
    setFormula(formula.slice(0, -1) + '=' + finalRes);
    setIsEvaluated(true);
  };

  const handleDecimalClick = () => {
    if (!evaluate.includes('.')) {
      setEvaluate(evaluate + '.');
    }
  };

  return (
    <div className="content">
      <div className="container">
        <div className="calc-board">
          <div className="calc-display">
            <div className="formula">{formula}</div>
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



const accurateInterval = function (fn, time) {
  var cancel, nextAt, timeout, wrapper;
  nextAt = new Date().getTime() + time;
  timeout = null;
  wrapper = function () {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  cancel = function () {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel
  };
};

// COMPONENTS:
class TimerLengthControl extends React.Component {
  render() {
    return (
      <div className="length-control">
        <div id={this.props.titleID}>{this.props.title}</div>
        <button
          className="btn-level"
          id={this.props.minID}
          onClick={this.props.onClick}
          value="-"
        >
          <i className="fa fa-arrow-down fa-2x" />
        </button>
        <div className="btn-level" id={this.props.lengthID}>
          {this.props.length}
        </div>
        <button
          className="btn-level"
          id={this.props.addID}
          onClick={this.props.onClick}
          value="+"
        >
          <i className="fa fa-arrow-up fa-2x" />
        </button>
      </div>
    );
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brkLength: 5,
      seshLength: 25,
      timerState: 'stopped',
      timerType: 'Session',
      timer: 1500,
      intervalID: '',
      alarmColor: { color: 'white' }
    };
    this.setBrkLength = this.setBrkLength.bind(this);
    this.setSeshLength = this.setSeshLength.bind(this);
    this.lengthControl = this.lengthControl.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.beginCountDown = this.beginCountDown.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.phaseControl = this.phaseControl.bind(this);
    this.warning = this.warning.bind(this);
    this.buzzer = this.buzzer.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.clockify = this.clockify.bind(this);
    this.reset = this.reset.bind(this);
  }
  setBrkLength(e) {
    this.lengthControl(
      'brkLength',
      e.currentTarget.value,
      this.state.brkLength,
      'Session'
    );
  }
  setSeshLength(e) {
    this.lengthControl(
      'seshLength',
      e.currentTarget.value,
      this.state.seshLength,
      'Break'
    );
  }
  lengthControl(stateToChange, sign, currentLength, timerType) {
    if (this.state.timerState === 'running') {
      return;
    }
    if (this.state.timerType === timerType) {
      if (sign === '-' && currentLength !== 1) {
        this.setState({ [stateToChange]: currentLength - 1 });
      } else if (sign === '+' && currentLength !== 60) {
        this.setState({ [stateToChange]: currentLength + 1 });
      }
    } else if (sign === '-' && currentLength !== 1) {
      this.setState({
        [stateToChange]: currentLength - 1,
        timer: currentLength * 60 - 60
      });
    } else if (sign === '+' && currentLength !== 60) {
      this.setState({
        [stateToChange]: currentLength + 1,
        timer: currentLength * 60 + 60
      });
    }
  }
  timerControl() {
    if (this.state.timerState === 'stopped') {
      this.beginCountDown();
      this.setState({ timerState: 'running' });
    } else {
      this.setState({ timerState: 'stopped' });
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
    }
  }
  beginCountDown() {
    this.setState({
      intervalID: accurateInterval(() => {
        this.decrementTimer();
        this.phaseControl();
      }, 1000)
    });
  }
  decrementTimer() {
    this.setState({ timer: this.state.timer - 1 });
  }
  phaseControl() {
    let timer = this.state.timer;
    this.warning(timer);
    this.buzzer(timer);
    if (timer < 0) {
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
      if (this.state.timerType === 'Session') {
        this.beginCountDown();
        this.switchTimer(this.state.brkLength * 60, 'Break');
      } else {
        this.beginCountDown();
        this.switchTimer(this.state.seshLength * 60, 'Session');
      }
    }
  }
  warning(_timer) {
    if (_timer < 61) {
      this.setState({ alarmColor: { color: '#a50d0d' } });
    } else {
      this.setState({ alarmColor: { color: 'white' } });
    }
  }
  buzzer(_timer) {
    if (_timer === 0) {
      this.audioBeep.play();
    }
  }
  switchTimer(num, str) {
    this.setState({
      timer: num,
      timerType: str,
      alarmColor: { color: 'white' }
    });
  }
  clockify() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }
  reset() {
    this.setState({
      brkLength: 5,
      seshLength: 25,
      timerState: 'stopped',
      timerType: 'Session',
      timer: 1500,
      intervalID: '',
      alarmColor: { color: 'white' }
    });
    if (this.state.intervalID) {
      this.state.intervalID.cancel();
    }
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }
  render() {
    return (
      <div>
        <div className="main-title">25 + 5 Clock</div>
        <TimerLengthControl
          addID="break-increment"
          length={this.state.brkLength}
          lengthID="break-length"
          minID="break-decrement"
          onClick={this.setBrkLength}
          title="Break Length"
          titleID="break-label"
        />
        <TimerLengthControl
          addID="session-increment"
          length={this.state.seshLength}
          lengthID="session-length"
          minID="session-decrement"
          onClick={this.setSeshLength}
          title="Session Length"
          titleID="session-label"
        />
        <div className="timer" style={this.state.alarmColor}>
          <div className="timer-wrapper">
            <div id="timer-label">{this.state.timerType}</div>
            <div id="time-left">{this.clockify()}</div>
          </div>
        </div>
        <div className="timer-control">
          <button id="start_stop" onClick={this.timerControl}>
            <i className="fa fa-play fa-2x" />
            <i className="fa fa-pause fa-2x" />
          </button>
          <button id="reset" onClick={this.reset}>
            <i className="fa fa-refresh fa-2x" />
          </button>
        </div>
        <div className="author">
          {' '}
          Designed and Coded by <br />
          <a href="https://goo.gl/6NNLMG" target="_blank">
            Peter Weinberg
          </a>
        </div>
        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    );
  }
}

ReactDOM.render(<Timer />, document.getElementById('app'));

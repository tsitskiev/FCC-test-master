import {
  DrumMachine,
  Calculator,
  RandomQuoteMachine,
  TwentyFiveClock,
  MarkdownPreviewer,
} from './projects';
import { Route, BrowserRouter } from 'react-router-dom';
import React, { useEffect } from 'react';
import NavBar from './components/NavBar';

const App = () => {
  //fcc test-loader
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  //Markdown-Parser
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/marked/2.0.0/marked.min.js';
    script.async = true;
    document.body.insertAdjacentElement('afterbegin', script);
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Route exact path="/MarkdownPreviewer" component={MarkdownPreviewer} />
        <Route exact path="/DrumMachine" component={DrumMachine} />
        <Route exact path="/Calculator" component={Calculator} />
        <Route exact path="/25plusclock" component={TwentyFiveClock} />
        <Route exact path="/RandomQuoteMachine" component={RandomQuoteMachine} />
      </BrowserRouter>
    </>
  );
};

export default App;

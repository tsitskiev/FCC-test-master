import React, { useRef, useState } from 'react';
const defaultText = `# Welcome to another React Markdown Previewer

  ## This one is a sub-header
  ### Feel free to use all the possibilities:
  
  Like to imbed some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // Inserted multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can make text **bold** or _italic_ or **_both!_** 
  And even go to ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.com), and
  > Block Quotes!
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbererd lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  ![React Logo w/ Text](http://webdevtest.ru/t/ShN9KhYSR)
  `;

const MarkdownPreviewer = () => {
  const [editorText, setEditorText] = useState(defaultText);

  const previewStyle = {
    width: '1000px',
    height: '600px',
    backgroundColor: '#92ded0',
    borderRadius: '5px',
    border: '2px solid black',
    boxShadow: '3px 3px 5px 0px rgba(50, 50, 50, 0.75)',
    padding: '10px',
  };

  const editorStyle = {
    width: '1000px',
    maxHeight: '420px',
    padding: '10px',
    borderRadius: '5px',
    resize: 'vertical',
    backgroundColor: '#46ab98',
    boxShadow: '3px 3px 5px 0px rgba(50, 50, 50, 0.75)',
  };

  const typeHandler = (e) => {
    setEditorText(e.target.value);
  };

  const markdownRef = useRef(null);

  return (
    <div className="content">
      <div className="container">
        <textarea
          value={editorText}
          onChange={typeHandler}
          id="editor"
          cols="30"
          rows="10"
          style={editorStyle}
        />
        <div
          id="preview"
          ref={markdownRef}
          style={previewStyle}
          dangerouslySetInnerHTML={{ __html: window.marked && window.marked(editorText) }}></div>
      </div>
    </div>
  );
};

export default MarkdownPreviewer;

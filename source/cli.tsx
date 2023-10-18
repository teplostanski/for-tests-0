#!/usr/bin/env node
// import React from 'react';
// import {render} from 'ink';
// import App from './app.js';

 // render(<App />);
// import child_process from 'child_process'
// const editor = 'nano';

// const child = child_process.spawn(editor, ['~/somefile.txt'], {
    // stdio: 'inherit'
// });

// child.on('exit', function () {
    // console.log("finished");
// });


//@ts-nocheck
import React, { useState } from 'react';
import { render, Box, Text } from 'ink';
import { Tabs, Tab } from 'ink-tab';
import t from "tty-events"

function TabExample(props) {
  const [activeTabName, setActiveTabName] = useState(null);
  const [x, setX] = useState('')
  // the handleTabChange method get two arguments:
  // - the tab name
  // - the React tab element
  function handleTabChange(name, activeTab) {
    // set the active tab name to do what you want with the content
    setActiveTabName(name);
  }

  const term = new t()

  term.enableMouse();

  React.useEffect(() => {
  	
 
  term.on("mousedown", (ev)=>{
  	setX("You clicked at (%i, %i) with the button no. %i.", ev.x, ev.y, ev.button);
  });
  }, [])

  return (
    <Box flexDirection="column">
      <Box>
        <Text>
          {activeTabName === 'foo' && 'Selected tab is "foo"'}
          {activeTabName === 'bar' && 'Selected tab is "bar"'}
          {activeTabName === 'baz' && 'Selected tab is "baz"'}
        </Text>
      </Box>
<Text>{x}</Text>
      <Tabs onChange={handleTabChange}>
        <Tab name="foo">Foo</Tab>
        <Tab name="bar">Bar</Tab>
        <Tab name="baz">Baz</Tab>
      </Tabs>
    </Box>
  );
}

render(<TabExample />);

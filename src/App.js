import React from 'react';
import './App.css';
import Header from './components/Header';
import Option from './components/Option';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <Header/>
      <Option/>
      <TaskList/>
    </div>
  );
}

export default App;

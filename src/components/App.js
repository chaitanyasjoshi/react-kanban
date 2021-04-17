import { useState, useEffect } from 'react';

import Column from './Column';

import initialData from '../initial-data';

function App() {
  const [state, setState] = useState(initialData);

  return state.columnOrder.map((columnId) => {
    const column = state.columns[columnId];
    const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

    return <Column id={column.id} column={column} tasks={tasks} />;
  });
}

export default App;

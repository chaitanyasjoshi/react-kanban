import { useState, PureComponent } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Column from './Column';

import initialData from '../initial-data';

class InnerList extends PureComponent {
  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
    return <Column column={column} tasks={tasks} index={index} />;
  }
}

function App() {
  const [state, setState] = useState(initialData);

  const onDragStart = (start) => {
    //Callback on drag start
  };

  const onDragUpdate = (update) => {
    //Callback on drag update
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      return;
    }

    const startColumn = state.columns[source.droppableId];
    const endColumn = state.columns[destination.droppableId];

    if (startColumn === endColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(endColumn.taskIds);
    endTaskIds.splice(destination.index, 0, draggableId);
    const newEndColumn = {
      ...endColumn,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartColumn.id]: newStartColumn,
        [newEndColumn.id]: newEndColumn,
      },
    };
    setState(newState);
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='flex'
          >
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns[columnId];

              return (
                <InnerList
                  key={column.id}
                  column={column}
                  taskMap={state.tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;

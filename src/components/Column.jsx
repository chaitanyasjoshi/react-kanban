import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useState, PureComponent } from 'react';

import Task from './Task';

class InnerList extends PureComponent {
  render() {
    return this.props.tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ));
  }
}

export default function Column(props) {
  const [isDraggingOver, setIsDraggingOver] = useState(null);

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className='m-2 border border-gray-200 rounded-sm w-56 flex flex-col bg-white'
        >
          <h3 {...provided.dragHandleProps} className='p-2'>
            {props.column.title}
          </h3>
          <Droppable droppableId={props.column.id} type='task'>
            {(provided, snapshot) => {
              setIsDraggingOver(snapshot.isDraggingOver);
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-2 flex-grow ${
                    isDraggingOver ? 'bg-blue-200' : 'bg-white'
                  } transition-colors`}
                  style={{ minHeight: '100px' }} //Make sure we have droppable area even when all the lists are empty
                >
                  <InnerList tasks={props.tasks} />
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useState, PureComponent } from 'react';
import firebase from 'firebase/app';

import Task from './Task';

import { ReactComponent as Pencil } from '../icons/pencil.svg';
import { ReactComponent as Check } from '../icons/check.svg';

class InnerList extends PureComponent {
  render() {
    return this.props.tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ));
  }
}

export default function Column(props) {
  const [isDraggingOver, setIsDraggingOver] = useState(null);
  const [editing, setEditing] = useState(false);
  const [columnName, setColumnName] = useState(props.column.title);

  const database = firebase.database();

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className='m-2 border border-gray-200 rounded-sm w-56 flex flex-col bg-white'
        >
          {!editing ? (
            <div className='flex justify-between'>
              <h3 {...provided.dragHandleProps} className='p-2'>
                {props.column.title}
              </h3>
              <Pencil
                className='w-8 p-2 cursor-pointer text-gray-600'
                onClick={() => setEditing(true)}
              />
            </div>
          ) : (
            <div className='p-2 flex'>
              <input
                type='text'
                value={columnName}
                onChange={(event) => setColumnName(event.target.value)}
                className='w-full border border-gray-400 rounded-sm'
              />
              <Check
                className='w-8 pl-2 cursor-pointer text-gray-600'
                onClick={() => {
                  setEditing(false);
                  database
                    .ref(`data/columns/${props.column.id}/title/`)
                    .set(columnName);
                }}
              />
            </div>
          )}

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

import { Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

export default function Task(props) {
  const [isDragging, setIsDragging] = useState(null);

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => {
        setIsDragging(snapshot.isDragging);
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`border border-gray-200 p-2 mb-2 rounded-sm ${
              isDragging ? 'bg-green-200' : 'bg-white'
            }`}
          >
            {props.task.content}
          </div>
        );
      }}
    </Draggable>
  );
}

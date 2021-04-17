import Task from './Task';

export default function Column(props) {
  return (
    <div className='m-2 border border-gray-200 rounded-sm'>
      <h3 className='p-2'>{props.column.title}</h3>
      <div className='p-2'>
        {props.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

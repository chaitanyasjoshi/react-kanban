export default function Task(props) {
  return (
    <div className='border border-gray-200 p-2 mb-2 rounded-sm'>
      {props.task.content}
    </div>
  );
}

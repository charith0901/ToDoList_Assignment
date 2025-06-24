import {Trash, CheckSquare} from 'lucide-react';

const TaskCard = ({ task, handleDeleteTask, handleUpdateTaskStatus }) => {
    return (
        <>
            <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">
                    {new Date(task.dueDate).toLocaleTimeString()}
                </span>
                <span className={`font-medium text-gray-800 group-hover:text-blue-700 ${task.isCompleted ? "line-through text-gray-400" : ""}`}>
                    {task.title}
                </span>
            </div>
            <div>
                <button
                    className="ml-2 text-blue-600 hover:text-blue-700"
                    onClick={() => handleUpdateTaskStatus(task._id)}
                >
                    <CheckSquare className={`w-5 h-5 ${task.isCompleted ? "text-blue-600" : "text-gray-400"}`} />
                </button>
                <button
                    className="ml-2 text-gray-600 hover:text-gray-700"
                    onClick={() => handleDeleteTask(task._id)}
                >
                    <Trash className="w-5 h-5 text-red-600" />
                </button>
            </div>
        </>

    );
}

export default TaskCard;
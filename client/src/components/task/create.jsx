import { useState } from "react";
import { createTask } from "../../services/taskService";

const CreateTask = ({ onClose }) => {
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        dueDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTask(taskData);
            onClose && onClose();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
            <div className="bg-white rounded-lg shadow-lg p-6 ">
                <h2 className="text-xl font-bold mb-4">Create New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block mb-1">
                            Title:
                            <input
                                type="text"
                                name="title"
                                value={taskData.title}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-2 py-1 mt-1"
                            />
                        </label>
                    </div>
                    <div className="mb-3">
                        <label className="block mb-1">
                            Description:
                            <textarea
                                name="description"
                                value={taskData.description}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-2 py-1 mt-1"
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">
                            Due Date:
                            <input
                                type="datetime-local"
                                name="dueDate"
                                value={taskData.dueDate}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-2 py-1 mt-1"
                            />
                        </label>
                    </div>
                    <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Create Task
                    </button>
                    <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={onClose}
                    >
                        Cancel
                    </button>
                    </div>
                </form>
            </div>
    );
};

export default CreateTask;
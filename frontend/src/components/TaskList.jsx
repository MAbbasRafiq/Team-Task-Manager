import React, { useState, useEffect } from "react";
import { getTasksByTeam, getTasksByUser, createTask, updateTask, deleteTask } from "../api/taskApi";
import TaskModal from "./TaskModal";

export default function TaskList({ selectedTeamId }) {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("team");

  useEffect(() => {
    fetchTasks();

  }, [selectedTeamId, filter]);

  const fetchTasks = async () => {
    if (filter === "team" && selectedTeamId) {
      const { data } = await getTasksByTeam(selectedTeamId);
      setTasks(data);
    } else if (filter === "mine") {
      const { data } = await getTasksByUser();
      setTasks(data);
    } else {
      setTasks([]);
    }
  };

  const handleCreate = async task => {
    await createTask({ ...task, team_id: selectedTeamId });
    setShowModal(false);
    fetchTasks();
  };

  const handleUpdate = async (taskId, updates) => {
    await updateTask(taskId, updates);
    setEditTask(null);
    fetchTasks();
  };

  const handleDelete = async taskId => {
    if (window.confirm("Delete this task?")) {
      await deleteTask(taskId);
      fetchTasks();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex-1 ml-4">
      <div className="flex items-center mb-3 gap-2">
        <h3 className="font-bold text-lg flex-1">Tasks</h3>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="team">Team Tasks</option>
          <option value="mine">My Tasks</option>
        </select>
        <button
          className="bg-green-600 text-white px-3 py-1 rounded"
          onClick={() => setShowModal(true)}
          disabled={!selectedTeamId}
        >
          + New Task
        </button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Assignee</th>
            <th className="p-2">Status</th>
            <th className="p-2">Due Date</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-3 text-gray-400">
                No tasks.
              </td>
            </tr>
          ) : (
            tasks.map(task => (
              <tr key={task.id} className="border-b hover:bg-gray-50">
                <td style={{ textAlign: 'center' }} className="p-2">{task.title}</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }} className="p-2">{task.assignee_id || "-"}</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }} className="p-2">{task.status}</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }} className="p-2">{task.due_date || "-"}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="text-blue-600 underline text-xs"
                    onClick={() => setEditTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 underline text-xs"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {showModal && (
        <TaskModal
          onClose={() => setShowModal(false)}
          onSave={handleCreate}
          teamId={selectedTeamId}
        />
      )}
      {editTask && (
        <TaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onSave={(t) => handleUpdate(editTask.id, t)}
          teamId={selectedTeamId}
        />
      )}
    </div>
  );
}

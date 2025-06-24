import React, { useState } from "react";

export default function TaskModal({ onClose, onSave, teamId, task }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [assigneeId, setAssigneeId] = useState(task?.assignee_id || "");
  const [dueDate, setDueDate] = useState(task?.due_date || "");

  const handleSubmit = e => {
    e.preventDefault();
    onSave({
      title,
      description,
      assignee_id: assigneeId || null,
      due_date: dueDate || null,
      team_id: teamId,
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-3">{task ? "Edit Task" : "Create Task"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full mb-2 p-2 border rounded"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full mb-2 p-2 border rounded"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            className="w-full mb-2 p-2 border rounded"
            placeholder="Assignee User ID"
            value={assigneeId}
            onChange={e => setAssigneeId(e.target.value)}
            type="number"
            min="1"
          />
          <input
            className="w-full mb-2 p-2 border rounded"
            placeholder="Due Date (YYYY-MM-DD)"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            type="date"
          />
          <div className="flex gap-2 mt-3">
            <button className="bg-blue-600 text-white px-3 py-1 rounded" type="submit">
              Save
            </button>
            <button
              className="bg-gray-400 text-white px-3 py-1 rounded"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

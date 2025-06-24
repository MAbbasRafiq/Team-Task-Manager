import React, { useState } from "react";
import TeamList from "./TeamList";
import TaskList from "./TaskList";
import { logout, getMe } from "../api/authApi";

export default function Dashboard({ onLogout }) {
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [user, setUser] = useState({});

  React.useEffect(() => {
    getMe().then(res => setUser(res.data)).catch(() => {});
  }, []);

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-700 text-white p-4 flex items-center justify-between">
        <h1 className="font-bold text-xl">Team Task Manager</h1>
        <div className="flex gap-3 items-center">
          <span className="text-sm">{user.username}</span>
          <button className="bg-white text-blue-700 px-3 py-1 rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <main className="flex flex-1 p-6 gap-6">
        <div className="w-1/3">
          <TeamList selectedTeamId={selectedTeamId} setSelectedTeamId={setSelectedTeamId} />
        </div>
        <TaskList selectedTeamId={selectedTeamId} />
      </main>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { getTeams, createTeam, addMemberToTeam, getTeamMembers } from "../api/teamApi";

export default function TeamList({ selectedTeamId, setSelectedTeamId }) {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [adding, setAdding] = useState(false);
  const [addMemberUsername, setAddMemberUsername] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const { data } = await getTeams();
    setTeams(data);
  };

  const handleCreateTeam = async e => {
    e.preventDefault();
    if (!teamName.trim()) return;
    await createTeam(teamName);
    setTeamName("");
    setAdding(false);
    fetchTeams();
  };


  const handleAddMember = async teamId => {
    if (!addMemberUsername.trim()) {
      alert("Member must be Registered")
      return;
    }
    
    await addMemberToTeam(teamId, addMemberUsername);
    setAddMemberUsername("");
    fetchMembers(teamId);
    alert("New Member has been added to the team successfully")
  };

  const fetchMembers = async teamId => {
    const { data } = await getTeamMembers(teamId);
    setTeamMembers(data);
    setShowMembers(teamId);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="font-bold text-lg mb-2">Teams</h3>
      <ul>
        {teams.map(team => (
          <li
            key={team.id}
            className={`p-2 mb-2 rounded cursor-pointer ${
              selectedTeamId === team.id ? "bg-blue-100" : ""
            }`}
            onClick={() => setSelectedTeamId(team.id)}
          >
            <div className="flex items-center justify-between">
              <span>{team.name}</span>
              <button
                className="text-xs text-blue-600 underline"
                onClick={e => {
                  e.stopPropagation();
                  fetchMembers(team.id);
                }}
              >
                Members
              </button>
            </div>
            {showMembers === team.id && (
              <div className="bg-gray-50 border mt-2 p-2 rounded">
                <div className="text-xs font-bold mb-1">Team Members:</div>
                <ul className="mb-2">
                  {teamMembers.map(m => (
                    <li key={m.id} className="text-xs">
                      {m.username}
                    </li>
                  ))}
                </ul>
                <form
                  className="flex items-center gap-1"
                  onSubmit={e => {
                    e.preventDefault();
                    handleAddMember(team.id);
                  }}
                >
                  <input style={{ fontSize: '0.9rem', fontWeight: 450, width: '12rem', height: '2rem' }}
                    className="border px-1 rounded text-xs"
                    placeholder="Member must be Registered"
                    value={addMemberUsername}
                    onChange={e => setAddMemberUsername(e.target.value)}
                  />
                  <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded" type="submit">
                    Add
                  </button>
                </form>
              </div>
            )}
          </li>
        ))}
      </ul>
      {adding ? (
        <form onSubmit={handleCreateTeam} className="mt-3 flex">
          <input
            className="border flex-1 px-2 py-1 rounded"
            placeholder="Team name"
            value={teamName}
            onChange={e => setTeamName(e.target.value)}
            required
          />
          <button className="ml-2 px-3 py-1 bg-green-600 text-white rounded" type="submit">
            Create
          </button>
        </form>
      ) : (
        <button
          className="mt-3 px-3 py-1 bg-blue-600 text-white rounded w-full"
          onClick={() => setAdding(true)}
        >
          + New Team
        </button>
      )}
    </div>
  );
}

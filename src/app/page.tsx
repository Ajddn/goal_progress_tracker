'use client';
import React, { useState } from 'react';
import { PlusCircle, XCircle } from 'react-feather';

interface Goal {
  id: number;
  name: string;
  title: string;
  category: string;
  progress: number;
  milestones: { title: string; completed: boolean }[];
  comments: string[];
  description: string;
  goalType: string;
  feedback: string;
}

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('development');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [newGoalType, setNewGoalType] = useState('individual');
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      name: 'Project Goal',
      title: 'Finish project',
      category: 'development',
      progress: 60,
      milestones: [{ title: 'Complete backend', completed: false }],
      comments: ['Great progress!', 'Need to fix bugs in the backend.'],
      description: 'Complete the backend for the project.',
      goalType: 'individual',
      feedback: '',
    },
  ]);

  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [newFeedback, setNewFeedback] = useState<{ [key: number]: string }>({});

  const addGoal = () => {
    const randomProgress = Math.floor(Math.random() * 101);
    const newGoal: Goal = {
      id: goals.length + 1,
      name: newGoalName,
      title: newGoalName,
      category: newGoalCategory,
      progress: randomProgress,
      milestones: [],
      comments: [],
      description: newGoalDescription,
      goalType: newGoalType,
      feedback: '',
    };
    setGoals([...goals, newGoal]);
    setShowAddGoal(false);
    setNewGoalName('');
    setNewGoalCategory('development');
    setNewGoalDescription('');
    setNewGoalType('individual');
  };

  const addComment = (goalId: number) => {
    if (newComment[goalId]) {
      setGoals(goals.map(goal =>
        goal.id === goalId
          ? { ...goal, comments: [...goal.comments, newComment[goalId]] }
          : goal
      ));
      setNewComment({ ...newComment, [goalId]: '' });
    }
  };

  const deleteComment = (goalId: number, commentIndex: number) => {
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? { ...goal, comments: goal.comments.filter((_, index) => index !== commentIndex) }
        : goal
    ));
  };

  const addFeedback = (goalId: number) => {
    if (newFeedback[goalId]) {
      setGoals(goals.map(goal =>
        goal.id === goalId
          ? { ...goal, feedback: newFeedback[goalId] }
          : goal
      ));
      setNewFeedback({ ...newFeedback, [goalId]: '' });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Goal Tracker</h1>
          <nav className="space-x-6">
            <a href="#dashboard" className="hover:text-indigo-200">Dashboard</a>
            <a href="#goals" className="hover:text-indigo-200">Goals</a>
            <a href="#settings" className="hover:text-indigo-200">Settings</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Goal Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-indigo-600 pb-2">Goals</h2>
          <button
            onClick={() => setShowAddGoal(true)}
            className="bg-indigo-600 text-white rounded-full px-4 py-2 flex items-center hover:bg-indigo-700 transition duration-150"
          >
            <PlusCircle className="h-5 w-5 mr-2" /> Add Goal
          </button>
        </div>

        {/* Goal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
              <h2 className="text-2xl font-bold text-indigo-700 mb-1">{goal.name}</h2>
              <p className="text-sm font-medium text-indigo-500 uppercase tracking-wide">{goal.category}</p>
              <p className="mt-2 text-gray-700 text-sm">{goal.description}</p>
              <p className="mt-1 text-xs text-gray-500 italic">{goal.goalType === 'team' ? 'Team Goal' : 'Individual Goal'}</p>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1 font-medium">{goal.progress}% Progress</p>
              </div>

              {/* Comments Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">Comments</h3>
                <div className="space-y-3 mt-3">
                  {goal.comments.map((comment, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-start border">
                      <p className="text-sm text-gray-700">{comment}</p>
                      <button
                        onClick={() => deleteComment(goal.id, index)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <textarea
                  className="w-full mt-4 border border-gray-300 rounded-md p-3 text-sm text-gray-800 focus:ring-2 focus:ring-indigo-400"
                  placeholder="Add a comment"
                  value={newComment[goal.id] || ''}
                  onChange={(e) => setNewComment({ ...newComment, [goal.id]: e.target.value })}
                />
                <button
                  onClick={() => addComment(goal.id)}
                  className="mt-2 bg-indigo-600 text-white rounded-md px-4 py-2 text-sm hover:bg-indigo-700 transition"
                >
                  Add Comment
                </button>
              </div>

              {/* Feedback Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">Feedback</h3>

                {goal.feedback && (
                  <div className="p-3 mt-3 bg-indigo-50 border border-indigo-200 text-sm text-indigo-700 rounded-md">
                    <p><strong>Previous Feedback:</strong> {goal.feedback}</p>
                  </div>
                )}

                <textarea
                  className="w-full mt-4 border border-gray-300 rounded-md p-3 text-sm text-gray-800 focus:ring-2 focus:ring-indigo-400"
                  placeholder="Add feedback"
                  value={newFeedback[goal.id] || ''}
                  onChange={(e) => setNewFeedback({ ...newFeedback, [goal.id]: e.target.value })}
                />
                <button
                  onClick={() => addFeedback(goal.id)}
                  className="mt-2 bg-green-600 text-white rounded-md px-4 py-2 text-sm hover:bg-green-700 transition"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Goal Modal */}
        {showAddGoal && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Add a New Goal</h2>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 mb-4 text-black"
                placeholder="Goal name"
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
              />
              <textarea
                className="w-full border border-gray-300 rounded-md p-3 mb-4 text-black"
                placeholder="Goal description"
                value={newGoalDescription}
                onChange={(e) => setNewGoalDescription(e.target.value)}
              />
              <select
                className="w-full border border-gray-300 rounded-md p-3 mb-4 bg-white text-black focus:outline-none"
                value={newGoalCategory}
                onChange={(e) => setNewGoalCategory(e.target.value)}
              >
                <option value="development">Development</option>
                <option value="marketing">Marketing</option>
                <option value="hr">HR</option>
                <option value="other">Other</option>
              </select>
              <select
                className="w-full border border-gray-300 rounded-md p-3 mb-4 bg-white text-black focus:outline-none"
                value={newGoalType}
                onChange={(e) => setNewGoalType(e.target.value)}
              >
                <option value="individual">Individual Goal</option>
                <option value="team">Team Goal</option>
              </select>
              <div className="flex space-x-4">
                <button
                  onClick={addGoal}
                  className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700"
                >
                  Add Goal
                </button>
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="bg-gray-300 text-gray-800 rounded-md px-4 py-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 Goal Tracker, All Rights Reserved.</p>
          <div className="space-x-4 mt-4">
            <a href="#privacy" className="hover:text-indigo-200">Privacy Policy</a>
            <a href="#terms" className="hover:text-indigo-200">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;

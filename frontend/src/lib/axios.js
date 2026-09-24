import axios from "axios";

export const isGuestDemo = import.meta.env.VITE_DEMO_MODE === "true";
const storageKey = "mindboard-guest-notes-v1";

function readNotes() {
  const saved = window.localStorage.getItem(storageKey);
  if (!saved) return [];
  const parsed = JSON.parse(saved);
  return Array.isArray(parsed) ? parsed : [];
}

function saveNotes(notes) {
  window.localStorage.setItem(storageKey, JSON.stringify(notes));
}

function noteId(path) {
  return path.replace(/^\/notes\/?/, "");
}

function notFound() {
  const error = new Error("Note not found");
  error.response = { status: 404 };
  throw error;
}

const guestApi = {
  async get(path) {
    const notes = readNotes();
    if (path === "/notes") {
      return { data: notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) };
    }
    const note = notes.find(item => item._id === noteId(path));
    if (!note) notFound();
    return { data: note };
  },
  async post(path, value) {
    if (path !== "/notes") notFound();
    const now = new Date().toISOString();
    const note = {
      _id: crypto.randomUUID(),
      title: value.title.trim(),
      content: value.content.trim(),
      createdAt: now,
      updatedAt: now,
    };
    saveNotes([note, ...readNotes()]);
    return { data: note };
  },
  async put(path, value) {
    const notes = readNotes();
    const index = notes.findIndex(item => item._id === noteId(path));
    if (index < 0) notFound();
    notes[index] = { ...notes[index], title: value.title.trim(), content: value.content.trim(), updatedAt: new Date().toISOString() };
    saveNotes(notes);
    return { data: notes[index] };
  },
  async delete(path) {
    const notes = readNotes();
    const remaining = notes.filter(item => item._id !== noteId(path));
    if (remaining.length === notes.length) notFound();
    saveNotes(remaining);
    return { data: { message: "Note deleted" } };
  },
};

const serverApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
});

export default isGuestDemo ? guestApi : serverApi;

import { CreateNoteData, Note } from "@/interfaces/notes.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTES_KEY = "technician_notes";
const SEED_KEY = "notes_seeded";

const seedNotes: Note[] = [
  {
    id: "1",
    title: "Welcome to Technician Notes",
    description:
      "This is your first sample note. You can edit, delete, or create new ones!",
    status: "Open",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Sample In Progress Task",
    description: "This note shows how an in-progress task looks in the app.",
    status: "In Progress",
    updatedAt: new Date().toISOString(),
  },
];

export const notesStorage = {
  async initialize(): Promise<void> {
    const isSeeded = await AsyncStorage.getItem(SEED_KEY);
    if (!isSeeded) {
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(seedNotes));
      await AsyncStorage.setItem(SEED_KEY, "true");
    }
  },

  async getNotes(): Promise<Note[]> {
    const notesJson = await AsyncStorage.getItem(NOTES_KEY);
    return notesJson ? JSON.parse(notesJson) : [];
  },

  async getNote(id: string): Promise<Note | null> {
    const notes = await this.getNotes();
    return notes.find((note) => note.id) || null;
  },

  async createNote(data: CreateNoteData): Promise<Note> {
    const newNote: Note = {
      ...data,
      id: Date.now().toString(),
      updatedAt: new Date().toISOString(),
    };

    const notes = await this.getNotes();
    const updatedNotes = [...notes, newNote];
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));

    return newNote;
  },

  async updateNote(
    id: string,
    data: Partial<CreateNoteData>
  ): Promise<Note | null> {
    const notes = await this.getNotes();
    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex === -1) return null;

    const updatedNote: Note = {
      ...notes[noteIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    notes[noteIndex] = updatedNote;
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));

    return updatedNote;
  },

  async deleteNote(id: string): Promise<boolean> {
    const notes = await this.getNotes();
    const filteredNotes = notes.filter((note) => note.id !== id);

    if (filteredNotes.length === notes.length) return false;

    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(filteredNotes));
    return true;
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.removeItem(NOTES_KEY);
    await AsyncStorage.removeItem(SEED_KEY);
  },
};

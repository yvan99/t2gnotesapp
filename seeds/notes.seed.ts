import { Note } from "@/interfaces/notes.interface";

export const seedNotes: Note[] = [
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

export type NoteStatus = "Open" | "In Progress" | "Done";

export interface Note {
  id: string;
  title: string;
  description: string;
  status: NoteStatus;
  photoUri?: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title: string;
  description: string;
  status: NoteStatus;
  photoUri?: string;
}

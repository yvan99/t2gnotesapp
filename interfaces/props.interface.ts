import { Note } from "./notes.interface";

export interface NoteCardProps {
  note: Note;
  onPress: (noteId: Note) => void;
}

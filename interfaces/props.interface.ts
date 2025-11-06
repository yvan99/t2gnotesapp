import { CreateNoteData, Note } from "./notes.interface";

export interface NoteCardProps {
  note: Note;
  onPress: (noteId: Note) => void;
}


export interface NoteFormProps {
  initialData?: Partial<CreateNoteData>;
  onSubmit: (data: CreateNoteData) => void;
  submitLabel: string;
  onCancel?: () => void;
}

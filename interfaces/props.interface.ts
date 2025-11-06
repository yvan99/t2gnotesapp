import { CreateNoteData, Note, NoteStatus } from "./notes.interface";

export interface NoteFormProps {
  initialData?: Partial<CreateNoteData>;
  onSubmit: (data: CreateNoteData) => void;
  submitLabel: string;
  onCancel?: () => void;
}

export interface StatusBadgeProps {
  status: NoteStatus;
}

export interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}

export interface NoteCardProps {
  note: Note;
}

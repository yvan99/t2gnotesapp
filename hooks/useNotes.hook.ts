import { CreateNoteData, Note } from "@/interfaces/notes.interface";
import { notesStorage } from "@/storage/notes.storage";
import { useState, useEffect, useCallback } from "react";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      const loadedNotes = await notesStorage.getNotes();

      const sortedNotes = loadedNotes.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setNotes(sortedNotes);
    } catch (error) {
      console.error("Failed to load notes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNote = useCallback(
    async (data: CreateNoteData): Promise<boolean> => {
      try {
        await notesStorage.createNote(data);
        await loadNotes();
        return true;
      } catch (error) {
        console.error("Failed to create note:", error);
        return false;
      }
    },
    [loadNotes]
  );

  const updateNote = useCallback(
    async (id: string, data: Partial<CreateNoteData>): Promise<boolean> => {
      try {
        const success = await notesStorage.updateNote(id, data);
        if (success) {
          await loadNotes();
          return true;
        }
        return false;
      } catch (error) {
        console.error("Failed to update note:", error);
        return false;
      }
    },
    [loadNotes]
  );

  const deleteNote = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const success = await notesStorage.deleteNote(id);
        if (success) {
          await loadNotes();
          return true;
        }
        return false;
      } catch (error) {
        console.error("Failed to delete note:", error);
        return false;
      }
    },
    [loadNotes]
  );

  return {
    notes,
    loading,
    createNote,
    updateNote,
    deleteNote,
    refreshNotes: loadNotes,
  };
};

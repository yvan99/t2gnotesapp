import AsyncStorage from "@react-native-async-storage/async-storage";
import { notesStorage } from "@/storage/notes.storage";
import { CreateNoteData, Note } from "@/interfaces/notes.interface";

describe("notesStorage", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  describe("initialize", () => {
    it("should seed notes on first initialization", async () => {
      await notesStorage.initialize();

      const notes = await notesStorage.getNotes();
      expect(notes).toHaveLength(2);
      expect(notes[0].title).toBe("Welcome to Technician Notes");
    });

    it("should not seed notes if already seeded", async () => {
      await notesStorage.initialize();
      const firstNotes = await notesStorage.getNotes();

      await notesStorage.initialize();
      const secondNotes = await notesStorage.getNotes();

      expect(firstNotes).toEqual(secondNotes);
    });
  });

  describe("getNotes", () => {
    it("should return empty array when no notes exist", async () => {
      const notes = await notesStorage.getNotes();
      expect(notes).toEqual([]);
    });

    it("should return all notes", async () => {
      await notesStorage.initialize();
      const notes = await notesStorage.getNotes();

      expect(notes.length).toBeGreaterThan(0);
      expect(notes[0]).toHaveProperty("id");
      expect(notes[0]).toHaveProperty("title");
      expect(notes[0]).toHaveProperty("status");
    });
  });

  describe("createNote", () => {
    it("should create a new note", async () => {
      const newNoteData: CreateNoteData = {
        title: "Test Note",
        description: "Test Description",
        status: "Open",
      };

      const createdNote = await notesStorage.createNote(newNoteData);

      expect(createdNote.id).toBeDefined();
      expect(createdNote.title).toBe("Test Note");
      expect(createdNote.description).toBe("Test Description");
      expect(createdNote.status).toBe("Open");
      expect(createdNote.updatedAt).toBeDefined();
    });

    it("should add note to storage", async () => {
      const newNoteData: CreateNoteData = {
        title: "Test Note",
        description: "Test Description",
        status: "Open",
      };

      await notesStorage.createNote(newNoteData);
      const notes = await notesStorage.getNotes();

      expect(notes).toHaveLength(1);
      expect(notes[0].title).toBe("Test Note");
    });
  });

  describe("updateNote", () => {
    it("should update an existing note", async () => {
      const note = await notesStorage.createNote({
        title: "Original Title",
        description: "Original Description",
        status: "Open",
      });

      const updatedNote = await notesStorage.updateNote(note.id, {
        title: "Updated Title",
        status: "Done",
      });

      expect(updatedNote?.title).toBe("Updated Title");
      expect(updatedNote?.status).toBe("Done");
      expect(updatedNote?.description).toBe("Original Description");
    });

    it("should return null for non-existent note", async () => {
      const result = await notesStorage.updateNote("non-existent-id", {
        title: "Test",
      });

      expect(result).toBeNull();
    });
  });

  describe("deleteNote", () => {
    it("should delete an existing note", async () => {
      const note = await notesStorage.createNote({
        title: "To Delete",
        description: "Test",
        status: "Open",
      });

      const success = await notesStorage.deleteNote(note.id);
      const notes = await notesStorage.getNotes();

      expect(success).toBe(true);
      expect(notes).toHaveLength(0);
    });

    it("should return false for non-existent note", async () => {
      const success = await notesStorage.deleteNote("non-existent-id");
      expect(success).toBe(false);
    });
  });

  describe("getNote", () => {
    it("should get a specific note by id", async () => {
      const createdNote = await notesStorage.createNote({
        title: "Specific Note",
        description: "Test",
        status: "Open",
      });

      const fetchedNote = await notesStorage.getNote(createdNote.id);

      expect(fetchedNote).not.toBeNull();
      expect(fetchedNote?.id).toBe(createdNote.id);
      expect(fetchedNote?.title).toBe("Specific Note");
    });

    it("should return null for non-existent note", async () => {
      const note = await notesStorage.getNote("non-existent-id");
      expect(note).toBeNull();
    });
  });

  describe("clearAll", () => {
    it("should clear all notes and seed flag", async () => {
      await notesStorage.initialize();
      await notesStorage.clearAll();

      const notes = await notesStorage.getNotes();
      expect(notes).toEqual([]);
    });
  });
});

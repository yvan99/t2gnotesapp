import { renderHook, waitFor, act } from "@testing-library/react-native";
import { useNotes } from "@/hooks/useNotes.hook";
import { notesStorage } from "@/storage/notes.storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("Notes Flow Integration", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    await notesStorage.initialize();
  });

  it("should complete full CRUD cycle", async () => {
    const { result } = renderHook(() => useNotes());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const initialCount = result.current.notes.length;

    let createSuccess = false;
    await act(async () => {
      createSuccess = await result.current.createNote({
        title: "Integration Test Note",
        description: "This is a test",
        status: "Open",
      });
    });

    expect(createSuccess).toBe(true);
    expect(result.current.notes.length).toBe(initialCount + 1);

    const createdNote = result.current.notes.find(
      (n) => n.title === "Integration Test Note"
    );
    expect(createdNote).toBeDefined();

    if (createdNote) {
      let updateSuccess = false;
      await act(async () => {
        updateSuccess = await result.current.updateNote(createdNote.id, {
          status: "Done",
        });
      });

      expect(updateSuccess).toBe(true);
      const updatedNote = result.current.notes.find(
        (n) => n.id === createdNote.id
      );
      expect(updatedNote?.status).toBe("Done");

      let deleteSuccess = false;
      await act(async () => {
        deleteSuccess = await result.current.deleteNote(createdNote.id);
      });

      expect(deleteSuccess).toBe(true);
      expect(result.current.notes.length).toBe(initialCount);
    }
  });

  it("should persist notes across app restarts", async () => {
    await notesStorage.createNote({
      title: "Persistent Note",
      description: "Should survive restart",
      status: "Open",
    });

    const { result } = renderHook(() => useNotes());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const persistedNote = result.current.notes.find(
      (n) => n.title === "Persistent Note"
    );
    expect(persistedNote).toBeDefined();
  });
});

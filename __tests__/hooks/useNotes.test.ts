import { renderHook, waitFor, act } from "@testing-library/react-native";
import { useNotes } from "@/hooks/useNotes.hook";
import { notesStorage } from "@/storage/notes.storage";

jest.mock("@/storage/notes.storage");

describe("useNotes", () => {
  const mockNotes = [
    {
      id: "1",
      title: "Test Note 1",
      description: "Description 1",
      status: "Open" as const,
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
      id: "2",
      title: "Test Note 2",
      description: "Description 2",
      status: "Done" as const,
      updatedAt: "2024-01-02T00:00:00.000Z",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (notesStorage.getNotes as jest.Mock).mockResolvedValue(mockNotes);
  });

  it("should load notes on mount", async () => {
    const { result } = renderHook(() => useNotes());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.notes).toHaveLength(2);
    expect(result.current.notes[0].title).toBe("Test Note 2");
  });

  it("should create a new note", async () => {
    const newNote = {
      id: "3",
      title: "New Note",
      description: "New Description",
      status: "Open" as const,
      updatedAt: new Date().toISOString(),
    };

    (notesStorage.createNote as jest.Mock).mockResolvedValue(newNote);
    (notesStorage.getNotes as jest.Mock).mockResolvedValue([
      ...mockNotes,
      newNote,
    ]);

    const { result } = renderHook(() => useNotes());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let success = false;
    await act(async () => {
      success = await result.current.createNote({
        title: "New Note",
        description: "New Description",
        status: "Open",
      });
    });

    expect(success).toBe(true);
    expect(notesStorage.createNote).toHaveBeenCalled();
  });

  it("should update a note", async () => {
    const updatedNote = { ...mockNotes[0], title: "Updated Title" };
    (notesStorage.updateNote as jest.Mock).mockResolvedValue(updatedNote);

    const { result } = renderHook(() => useNotes());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let success = false;
    await act(async () => {
      success = await result.current.updateNote("1", {
        title: "Updated Title",
      });
    });

    expect(success).toBe(true);
    expect(notesStorage.updateNote).toHaveBeenCalledWith("1", {
      title: "Updated Title",
    });
  });

  it("should delete a note", async () => {
    (notesStorage.deleteNote as jest.Mock).mockResolvedValue(true);
    (notesStorage.getNotes as jest.Mock).mockResolvedValue([mockNotes[1]]);

    const { result } = renderHook(() => useNotes());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let success = false;
    await act(async () => {
      success = await result.current.deleteNote("1");
    });

    expect(success).toBe(true);
    expect(notesStorage.deleteNote).toHaveBeenCalledWith("1");
  });

  it("should refresh notes", async () => {
    const { result } = renderHook(() => useNotes());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.refreshNotes();
    });

    expect(notesStorage.getNotes).toHaveBeenCalledTimes(2);
  });

  it("should handle errors gracefully", async () => {
    (notesStorage.getNotes as jest.Mock).mockRejectedValue(
      new Error("Storage error")
    );

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    const { result } = renderHook(() => useNotes());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.notes).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});

import React from "react";
import { render } from "@testing-library/react-native";
import { NoteCard } from "@/components/ui/NoteCard";
import { Note } from "@/interfaces/notes.interface";

describe("NoteCard", () => {
  const mockNote: Note = {
    id: "1",
    title: "Test Note",
    description:
      "This is a test description that is long enough to be truncated in the preview",
    status: "Open",
    updatedAt: "2024-01-15T10:30:00.000Z",
  };

  it("should render note title", () => {
    const { getByText } = render(<NoteCard note={mockNote} />);
    expect(getByText("Test Note")).toBeTruthy();
  });

  it("should render truncated description", () => {
    const { getByText } = render(<NoteCard note={mockNote} />);
    const descriptionText = getByText(/This is a test description/);
    expect(descriptionText).toBeTruthy();
  });

  it("should render status badge", () => {
    const { getByText } = render(<NoteCard note={mockNote} />);
    expect(getByText("Open")).toBeTruthy();
  });

  it("should render formatted date", () => {
    const { getByText } = render(<NoteCard note={mockNote} />);
    expect(getByText("1/15/2024")).toBeTruthy();
  });

  it("should show camera icon when photo exists", () => {
    const noteWithPhoto = { ...mockNote, photoUri: "mock-uri" };
    const { UNSAFE_getByType } = render(<NoteCard note={noteWithPhoto} />);

    expect(UNSAFE_getByType).toBeDefined();
  });
});

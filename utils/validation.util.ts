export function validateNoteTitle(title: string): string {
  const trimmed = title.trim();
  
  if (!trimmed) {
    return 'Title is required';
  }
  
  if (trimmed.length < 2) {
    return 'Title must be at least 2 characters';
  }
  
  if (trimmed.length > 80) {
    return 'Title must not exceed 80 characters';
  }
  
  return '';
}
import { validateNoteTitle } from '@/utils/validation.util';

describe('validateNoteTitle', () => {
  it('should return error for empty title', () => {
    expect(validateNoteTitle('')).toBe('Title is required');
    expect(validateNoteTitle('   ')).toBe('Title is required');
  });

  it('should return error for title less than 2 characters', () => {
    expect(validateNoteTitle('A')).toBe('Title must be at least 2 characters');
  });

  it('should return error for title more than 80 characters', () => {
    const longTitle = 'A'.repeat(81);
    expect(validateNoteTitle(longTitle)).toBe('Title must not exceed 80 characters');
  });

  it('should return empty string for valid title', () => {
    expect(validateNoteTitle('Valid Title')).toBe('');
    expect(validateNoteTitle('AB')).toBe('');
    expect(validateNoteTitle('A'.repeat(80))).toBe('');
  });
});
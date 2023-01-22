import type { TestingLibraryMatchers } from '@types/testing-library__jest-dom/matchers'

declare module '@jest/expect' {
  export type Matchers<R = void> = TestingLibraryMatchers<typeof expect.stringContaining, R>
}

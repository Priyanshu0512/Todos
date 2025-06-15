# 🧪 Project Setup & Testing Guide

## 📘 Overview

This Todo Application is a lightweight, customizable task manager built with modern web technologies. Key features include:

- Task creation, editing, completion
- Priority and category tagging
- Theme switching (dark/light)
- Import/export functionality
- Progress and stats tracking

**Tech Stack**  
React 18 (Vite) + TypeScript  
Tailwind CSS for styling  
Hooks: `useTodos`, `useTheme`  
Testing: Vitest, React Testing Library, Playwright/Cypress

---

## 🛠️ Project Setup and Execution

### Prerequisites

- Node.js (v18+ recommended)
- Package Manager: npm or yarn

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/your-username/todo-app.git
cd todo-app

# Install dependencies
npm install
# or
yarn install

# Run the application
npm run dev
# or
yarn dev

# Run tests
npm run test
# or
yarn test

```

---

## 🧱 Testing Strategy

We follow a **Testing Pyramid** approach:

| Layer       | Description                         | Tools                         |
| ----------- | ----------------------------------- | ----------------------------- |
| Unit Tests  | Validate individual components      | Vitest, React Testing Library |
| Integration | Component interaction and data flow | React Testing Library         |
| E2E Tests   | Simulate real user interactions     | Playwright or Cypress         |

Each test ensures:

- Functional correctness
- UI responsiveness and accessibility
- Performance under load
- Mobile behavior

---

## 🧩 Component-Level Testing

### 1. `<TodoApp />`

**Test**: On initial load

- App renders without tasks
- Theme selector and form are present
- Todos are retrieved from `localStorage` (if present)

### 2. `<AddTodoForm />`

**Test**: Task creation logic

- Submit a valid todo → adds to list
- Submitting empty input → shows error
- Input clears after submission

### 3. `<TodoItem />`

**Test**: Interactions

- Checkbox toggles completion
- Task text updates correctly on edit
- Delete button removes the task

### 4. `<ProgressBar />` & `<TodoStats />`

- Progress reflects completed todos in real time
- Count of total vs completed todos updates dynamically

---

## 🔗 Integration Testing

### Todo Workflow Scenario

**Test**:

- Add five tasks
- Mark three as complete
- Use "Clear Completed" → Two remaining
- Stats and progress update correctly

### Theme Persistence

**Test**:

- Switch to dark mode
- Reload page → Theme remains dark
- Check applied classes (`dark`, `light`)

---

## ♿ Accessibility (a11y)

Compliant with **WCAG 2.1 AA** standards.

| Feature               | Status |
| --------------------- | ------ |
| Keyboard navigation   | ✅     |
| ARIA roles/labels     | ✅     |
| Screen reader support | ✅     |
| Contrast ratios       | ✅     |
| Focus indicators      | ✅     |

**Manual Test**:

- Use `Tab`, `Enter`, and `Esc` to navigate
- Use screen reader (e.g., VoiceOver/NVDA) to announce task actions

---

## 🧪 Automated Test Snippets

### Unit Test: `<TodoItem />`

```tsx
it("toggles completion state", () => {
  const todo = { id: 1, text: "Test", completed: false };
  render(<TodoItem todo={todo} />);
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);
});
```

---

### Integration Test: Add and Display Todos

```tsx
test("adds a todo and updates stats", () => {
  render(<TodoApp />);
  fireEvent.change(screen.getByPlaceholderText(/add a task/i), {
    target: { value: "New Todo" },
  });
  fireEvent.click(screen.getByText(/add/i));
  expect(screen.getByText(/New Todo/)).toBeInTheDocument();
});
```

---

### E2E Test (Playwright)

```ts
test("User adds and completes a task", async ({ page }) => {
  await page.goto("/");
  await page.fill('[data-testid="todo-input"]', "Write tests");
  await page.click('[data-testid="add-button"]');
  await page.check('[data-testid="todo-checkbox"]');
  await expect(page.locator('[data-testid="progress"]')).toContainText("100%");
});
```

---

## 🧩 Summary

This guide outlines a robust approach to testing all aspects of the Todo application. Each new feature should be accompanied by tests at the relevant levels and regularly validated via CI.

- Use unit tests for isolated logic and rendering
- Use integration tests to check cross-component workflows
- Use E2E tests for realistic scenarios
- Keep the testing matrix updated as the app evolves

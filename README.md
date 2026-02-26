# Take-Home Test: Vehicle Inspection System

A full-stack vehicle inspection management system using React + TypeScript (frontend) and Express + TypeScript (backend).

**Recommended Time: around 2 hours** — You may take as long as you need, but please don't overthink it.

---

## Backend Tasks (`/backend`)

### Task 1: Implement `createCheck` controller

The `POST /checks` endpoint controller is not implemented. You need to:

1. Validate request body using `validateCheckRequest(req.body)`
2. Return 400 with `ErrorResponse` format if validation fails
3. Call `checkService.createCheck()` if validation passes
4. Return 201 with the created check

**Verify:** Remove `.skip` from the test `"should create check and return 201"` in `api.test.ts`

### Task 2: Fix the bug in service function `createCheck`

The `hasIssue` flag is not correctly identifying if an inspection record has an issue. Find and fix the bug.

**Verify:** Remove `.skip` from the test `"should set hasIssue to true when any item fails"` in `api.test.ts`

Run `npm test` — all tests should pass.

### Task 3: Complete `deleteCheck` controller

The `DELETE /checks/:id` endpoint is not completed. It will not process the deletion and will return `501` regardless of the success or failure of the deletion. Complete this controller and related service function if applicable.

---

## Frontend Tasks (`/frontend`)

### Task 1: Fix Form Input

Check the form (of Submit Vehicle Inspection Result) to make sure the fields are accepting valid input and address any other bugs.

### Task 2: Change dropdown selection for checklist items

In the form, instead of a dropdown to select the result for checklist items, change them to checkboxes, radio buttons, or any other input type that you think is suitable.

### Task 3: Add Notes Field

In the form, add a textarea for optional notes:

- Maximum 300 characters
- (Optional) Display character counter (e.g., "45/300")
- Include in API request and reset after submission

### Task 4: Implement Toast Notifications

**File:** `src/CheckForm.tsx`

Show visual feedback using the provided `Toast.tsx` and `useToast.ts`:

- Success toast on successful submission
- Error toast on failure
- (Optional) Show a good error message in toast on failure

### Task 5: (Optional) Implement a way to delete an inspection record

Note that this task is **completely optional** and we do not expect you to finish this. However, if you wish, you can implement a way to delete an inspection record, provided that you have completed the `deleteCheck` controller. We will provide feedback if you choose to complete this task.

---

## Questions

Please answer these briefly:

1. **Authentication:** If we need to add authentication to this system, how would you approach it?
   I wouldn’t try to handle the full authentication/authorization stack myself. I’d use Auth0.
   On the frontend, we could either build our own login UI or use Auth0 Universal Login. After a successful login, we’d obtain an access token and a refresh token. When the client calls our backend, it would include `Authorization: Bearer <token>`.
   On the backend, I’d validate the JWT and enforce route protection via middleware. Auth0 provides a solid Express integration, like express-oauth2-jwt-bearer to make this straightforward and secure.
   I’d also sync user identity and profile into our own database on first login so we can attach app-specific data and roles without relying on Auth0 for everything.

2. **Improvements:** What other improvements would you implement if this were going to production or if you have more time?
   Improvements would depend on the product demands, but if this were going to production (or if I had more time), I’d focus on:
   (1)Add a proper database. A SQL-based database would be a good fit because the data is clearly structured.
   (2)Introduce authorization. I’d enforce access control so each user can only view and manage their own vehicle inspection history.
   (3)UI/UX improvements. I’d separate the Form and the Vehicle Inspection History into two dedicated pages since they serve distinct purposes. Longer term, I’d add search and filtering in the history view and implement pagination so we don’t load all records at once and performance stays consistent as data grows. For the form, I’d adopt React Hook Form to simplify state management and validation

3. **Tech Stack Experience:** Do you have experience with PHP, Vue.js, or mobile app development (React Native/Flutter)?
   I have experience with mobile app development using React Native. I built a task management app designed for people with ADHD using React Native (Expo) for the frontend, C#/.NET for the backend and Azure for cloud. The project covers end-to-end development, including API integration, authentication, and deployment.
   GitHub: https://github.com/sol-wizard/Blotz-Task-App

4. **AI / Tools:** What tools/assistants did you use while working on this assignment (e.g., GitHub Copilot, ChatGPT, etc.)? We appreciate AI usage, we're interested in _how_ you use these tools.
   I mainly used ChatGPT and Codex while completing the assignment.
   I used Codex to quickly understand the project structure and how the frontend and backend are organized. Before starting the tasks, I skimmed the codebase to build a mental model, ran the project locally, and verified the current behavior in the browser.
   For each task, I first navigated to the relevant files to understand the existing logic. Once I had an approach in mind, I described the problem and my planned steps to Codex and used it to help implement the changes incrementally.
   After that, I carefully reviewed the generated code to check correctness, remove redundancy, and ensure the solution matched the existing patterns. Finally, I tested the functionality in the UI to confirm everything worked as expected.

5. **Visa Status:** What visa are you currently on?
   I am currently on a subclass 500 Student visa and plan to transition to a 485 Temporary Graduate visa before August 2026.

6. **Languages:** What language(s) do you speak and what's your proficiency level?
   I speak both Chinese and English fluently.

> **Tip:** You can write your answers directly in this README.md file below each question.

---

## Submission (How to Submit)

1. Create a **public GitHub repository** for this assignment.
2. Push your code with all changes.
3. **Create at least two pull requests (PRs):** one for backend and one for frontend. You may create more (e.g., each task can be an independent PR). You may merge them into the main branch. We can review and may leave comments on your PRs for feedback.
4. Answer questions above.
5. **Please complete and submit within 3 days** unless otherwise discussed.
6. Send the repository link to **admin@enroute-tech.com**.

---

Good luck!

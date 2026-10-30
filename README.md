# Smart Hostel Room Allocation System

A responsive, administrator-only hostel management dashboard built with HTML, CSS, and vanilla JavaScript. The app runs in the browser and stores its records in localStorage; it does not require a server, backend, or external database.

## Run the App

Open `index.html` in a modern browser. No installation or build step is required. A local static server, such as the VS Code Live Server extension, can also be used.

The app loads fonts, icons, and charts from CDNs, so an internet connection is needed for those external assets. Core data remains in the browser.

## Features

- Dashboard with live student, room, capacity, occupancy, and pending-approval statistics.
- Student and room management with search, filters, validation, and edit/delete actions.
- Room inventory grouped by Male, Female, and Guest eligibility.
- Smart room recommendations based on student preferences, eligibility, availability, and application priority.
- Manual approval and rejection of recommendations; beds are assigned only after approval.
- Allocation history, cancellation, occupancy reports, charts, CSV export, and print-friendly reports.
- JSON backup and restore, hostel configuration, and configurable recommendation weights.

The initial inventory includes 5 Faculty / Guest single-occupancy rooms, 25 Maple rooms, and 25 Oak rooms, plus 6 original demonstration rooms. Faculty / Guest rooms are reserved for staff and guests and are excluded from student allocation.

## Data and Privacy

Data is stored in this browser under the localStorage keys `students`, `rooms`, `allocations`, `suggestions`, `settings`, and `activityLogs`. First-run demonstration records are initialized only when storage is empty. The room inventory update is additive and preserves existing room and student records.

Browser storage is local to the browser profile and device. It is not synchronized or backed up automatically. Use **Settings > Application data** to export a JSON backup before clearing browser data or moving to another device.

## Project Structure

```text
index.html       Application shell and navigation
css/style.css    Dashboard, component, and responsive styles
js/app.js        Views, forms, room matching, reports, and interactions
js/storage.js    localStorage defaults, persistence, and inventory migration
```
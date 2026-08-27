# Church Management System — MVP Development Prompt

Build a modern **Church Management System (ChMS)** for managing church members, visitors, ministries, programs, attendance, communication, and basic finances.

The system should be designed as a **desktop-first, offline-capable application** using:

* **Electron**
* **React**
* **JavaScript**
* **Vite**
* **Tailwind CSS**
* **SQLite**
* **better-sqlite3**
* **Electron IPC**
* **React Context for application state**
* **Preact Signals where reactive state is beneficial**

The architecture must be modular and maintainable. Avoid putting database logic directly inside React components.

---

# 1. Core MVP Objective

The MVP should allow church administrators to:

1. Register and manage people.
2. Distinguish between visitors and members.
3. Track a person's status and status history.
4. Organize people into ministries/departments.
5. Create and manage church programs/events.
6. Record attendance.
7. Manage basic member information.
8. Track basic contributions/tithes and offerings.
9. View useful dashboard statistics.
10. Search, filter, update, and delete records.
11. Operate the application locally using SQLite.
12. Keep the UI responsive to database changes without unnecessarily reloading the entire application.

The application should feel like a **professional business management system**, not a simple CRUD demo.

---

# 2. Application Structure

Use the following high-level modules:

```text
Dashboard
│
├── People
│   ├── All People
│   ├── Visitors
│   ├── Members
│   ├── Leaders
│   └── Staff
│
├── Ministries
│   ├── Divisions
│   ├── Departments
│   └── Roles
│
├── Programs
│   ├── Programs
│   ├── Events
│   └── Attendance
│
├── Finance
│   ├── Contributions
│   ├── Tithes
│   └── Offerings
│
├── Reports
│
└── Settings
```

Do not implement every possible church feature in the MVP. The architecture should allow them to be added later.

---

# 3. People Management

Create a central `people` entity.

A person should contain information such as:

```text
id
full_name
gender
date_of_birth
phone
email
address
marital_status
status
created_at
updated_at
```

Possible statuses:

```text
visitor
member
leader
staff
inactive
```

The People module must support:

* Create person
* View person
* Update person
* Delete person
* Search people
* Filter people by status
* Filter by gender
* Filter by marital status
* View profile
* View status history
* View attendance history
* View contribution history
* View ministry assignments

The person profile should become the central location for information about that individual.

---

# 4. Visitor Management

Visitors are people who have interacted with the church but have not necessarily become members.

Allow administrators to:

* Register visitors.
* Record first visit.
* Record follow-up information.
* Assign follow-up status.
* Convert a visitor into a member.
* View visitor history.

Example visitor information:

```text
person_id
first_visit_date
visit_count
follow_up_status
follow_up_notes
converted_to_member
```

Do not duplicate the person's basic information in a separate visitor table unnecessarily.

Use relationships instead.

---

# 5. Member Management

Members should use the same central `people` entity.

Membership-related information can include:

```text
person_id
membership_date
membership_number
membership_status
baptism_date
```

Allow administrators to:

* View members.
* Register membership.
* Update membership information.
* View membership history.
* View ministry assignments.
* View attendance.
* View contributions.

---

# 6. Status History

Do not simply overwrite a person's previous status.

Create a status history table.

Example:

```text
people_status_history

id
person_id
previous_status
current_status
created_at
```

For example:

```text
visitor → member
member → leader
leader → inactive
```

This allows the church to understand how a person's relationship with the church changed over time.

---

# 7. Ministries

Create a hierarchical ministry structure:

```text
Division
   ↓
Department
   ↓
Ministry / Team
   ↓
Role
```

Example:

```text
Church Operations
    ↓
Media Department
    ↓
Sound Ministry
    ↓
Sound Engineer
```

Support:

* Create division
* Create department
* Create ministry/team
* Create role
* Assign person to ministry
* Assign role to person
* Remove assignment
* View ministry members

A person should be able to belong to multiple ministries.

Therefore, use junction tables rather than storing a single ministry ID on the person.

---

# 8. Programs and Events

Create a program/event management system.

Example:

```text
Sunday Service
Youth Service
Bible Study
Prayer Meeting
Leadership Meeting
Conference
Community Outreach
```

A program should contain:

```text
id
name
description
type
location
start_datetime
end_datetime
status
created_at
updated_at
```

Support:

* Create program
* Edit program
* Delete program
* View upcoming programs
* View previous programs
* Search programs
* Filter by type
* View program details

---

# 9. Attendance

Attendance should connect people with programs/events.

Use a structure similar to:

```text
attendance

id
program_id
person_id
attendance_status
check_in_time
created_at
```

Attendance status:

```text
present
absent
excused
```

Support:

* Mark attendance.
* Search people.
* Quickly check people in.
* View attendance for an event.
* View attendance history for a person.
* Calculate attendance statistics.
* See attendance trends.

Avoid storing attendance directly inside the person record.

---

# 10. Finance

The MVP should include a **basic contribution system**, not a full accounting platform.

Track:

```text
id
person_id
amount
type
payment_method
reference
date
notes
created_at
```

Contribution types:

```text
tithe
offering
donation
other
```

Payment methods:

```text
cash
card
bank_transfer
other
```

Support:

* Record contribution.
* Edit contribution.
* Delete contribution.
* View contribution history.
* Filter by date.
* Filter by contribution type.
* View totals.
* View monthly totals.
* View individual contribution history.

Financial information should have appropriate access controls.

---

# 11. Dashboard

Create a professional dashboard showing useful church metrics.

Example cards:

```text
Total People
Members
Visitors
Active Leaders
Upcoming Programs
Attendance Today
Monthly Contributions
```

Include useful visualizations such as:

### People Growth

Show:

```text
Visitors
Members
Total People
```

over time.

### Attendance

Show attendance trends by week/month.

### Contributions

Show monthly contribution totals.

### People Status

Show distribution:

```text
Visitors
Members
Leaders
Staff
Inactive
```

The dashboard should be useful immediately after opening the application.

---

# 12. Search and Filtering

Search should be available throughout the application.

For People:

```text
Name
Phone
Email
Membership number
Status
```

Filters should be composable.

For example:

```text
Status = Member
Gender = Female
Marital Status = Married
```

Do filtering at the database/query layer when appropriate rather than loading thousands of records into React and filtering everything in JavaScript.

---

# 13. Database Architecture

Use SQLite with `better-sqlite3`.

Use foreign keys:

```sql
PRAGMA foreign_keys = ON;
```

Design the database relationally.

Core tables should include:

```text
people

people_status_history

membership

visitor_profiles

divisions

departments

ministries

roles

person_ministries

person_roles

programs

attendance

contributions
```

Use:

* Primary keys
* Foreign keys
* Unique constraints
* Indexes
* Appropriate timestamps

Avoid unnecessary duplication.

---

# 14. Electron Architecture

Use Electron's process separation correctly.

Architecture:

```text
React Renderer
      ↓
Preload API
      ↓
Electron IPC
      ↓
Services
      ↓
Database ORM / Repository
      ↓
SQLite
```

React components must **not** directly access SQLite.

Do not expose the database object to the renderer.

Use IPC methods such as:

```javascript
window.api.people.getAll()
window.api.people.getById(id)
window.api.people.create(payload)
window.api.people.update(id, payload)
window.api.people.delete(id)
```

Follow the same pattern for:

```text
ministries
programs
attendance
contributions
```

---

# 15. State Management

Use React Context for domain-level application state.

Example:

```text
PeopleContext
MinistryContext
ProgramContext
FinanceContext
```

Do not put every piece of application state into one massive Context.

Use signals where they provide value for reactive state such as:

```text
peopleList
selectedPerson
dashboard statistics
UI state
```

The frontend should not depend on repeatedly calling `getPeople()` manually after every mutation.

Instead, establish a predictable data synchronization strategy.

For example:

```text
Create person
     ↓
IPC
     ↓
Database
     ↓
Return created/updated data
     ↓
Update reactive application state
     ↓
React UI automatically renders
```

The same principle should apply to update/delete operations.

---

# 16. UI/UX

Use a clean, premium desktop interface inspired by modern macOS/business applications.

Design principles:

* Clean typography
* Generous spacing
* Minimal visual noise
* Consistent cards
* Subtle borders
* Clear hierarchy
* Responsive tables
* Good empty states
* Loading states
* Error states
* Confirmation dialogs for destructive operations

The sidebar should provide navigation between modules.

Tables should support:

* Search
* Filtering
* Pagination
* Row actions
* Selection
* Empty states

Forms should use reusable components.

---

# 17. Error Handling

Implement proper error handling across:

```text
React
IPC
Services
Database
```

Never silently swallow errors.

Return predictable results from IPC.

For example:

```javascript
{
    success: true,
    data: ...
}
```

or:

```javascript
{
    success: false,
    error: {
        code: "PERSON_NOT_FOUND",
        message: "Person could not be found."
    }
}
```

Avoid exposing raw SQLite errors directly to users.

Log technical errors appropriately in the Electron main process.

---

# 18. Validation

Validate data before inserting it into SQLite.

Examples:

* Required name.
* Valid email.
* Valid dates.
* Positive financial amounts.
* Valid foreign keys.
* Valid status values.

Database constraints should provide a second layer of protection.

---

# 19. MVP Reports

Implement basic reports:

### People Report

```text
Total people
Members
Visitors
Leaders
Staff
Inactive
```

### Attendance Report

```text
Program
Date
Total attendance
Attendance percentage
```

### Contribution Report

```text
Date range
Total contributions
Tithes
Offerings
Donations
```

Reports should support basic filtering and exporting where practical.

---

# 20. Security

Implement the Electron application using secure defaults.

Use:

```text
contextIsolation: true
nodeIntegration: false
```

Expose only the APIs required by the renderer.

Do not expose:

```text
fs
path
sqlite
electron
database connections
```

directly to React.

---

# 21. MVP Non-Goals

Do NOT implement these in the first version unless the architecture requires placeholders:

* Payroll
* Full accounting
* Online payments
* SMS gateway
* Email marketing
* Push notifications
* Complex CRM automation
* Asset management
* Inventory management
* Advanced accounting
* Multi-church SaaS architecture
* AI features
* Mobile application
* Public church website

These can become future modules.

---

# 22. Development Strategy

Build the system incrementally.

### Phase 1 — Foundation

Implement:

```text
Electron
React
SQLite
DatabaseManager
IPC
Preload API
ORM/Repository layer
Error handling
```

### Phase 2 — People

Implement:

```text
People
Visitors
Members
Status history
Search
Filtering
Profiles
```

### Phase 3 — Organization

Implement:

```text
Divisions
Departments
Ministries
Roles
Assignments
```

### Phase 4 — Programs

Implement:

```text
Programs
Events
Attendance
```

### Phase 5 — Finance

Implement:

```text
Contributions
Tithes
Offerings
Basic reports
```

### Phase 6 — Dashboard

Aggregate the existing data into:

```text
Statistics
Charts
Recent activity
Upcoming programs
Attendance
Financial summaries
```

---

# 23. Important Architectural Rule

Do not build this as a collection of disconnected CRUD pages.

The system should be **relationship-driven**.

The central concept is:

```text
                    ┌──────────────┐
                    │    Person    │
                    └──────┬───────┘
                           │
          ┌────────────────┼─────────────────┐
          ↓                ↓                 ↓
     Membership        Ministries       Attendance
          │                │                 │
          ↓                ↓                 ↓
      Status History    Roles            Programs
                                             │
                                             ↓
                                       Contributions
```

A person's profile should eventually provide a unified view of their interaction with the church.

---

# 24. Definition of Done

The MVP is complete when an administrator can perform this complete workflow:

```text
Register visitor
       ↓
Record visit
       ↓
Follow up visitor
       ↓
Convert visitor to member
       ↓
Assign member to ministry
       ↓
Assign ministry role
       ↓
Create church program
       ↓
Record member attendance
       ↓
Record member contribution
       ↓
Open member profile
       ↓
See membership
ministry
attendance
and contribution history
```

The application should remain stable when records are created, updated, or deleted, and the UI should reflect those changes without requiring a full application restart.

Prioritize **correct architecture, data relationships, maintainability, and a functional end-to-end workflow over visual complexity**.

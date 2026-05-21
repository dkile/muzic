---
date: 2026-05-21
topic: job-posting-business-spec
---

# Job Posting Business Spec

## Purpose

Job postings are the central business object for the MVP. A job posting represents a concrete hiring opportunity that the user may discover, save, prepare for, submit to, or close.

The app should treat job postings as active application work, not as simple bookmarks.

## Business Goals

- Help the user save a job posting quickly from a browser context.
- Keep the job posting connected to a company, hiring process stage, deadline, next event, notes, materials, and alerts.
- Preserve the history and meaning of an application process even after the original posting URL changes or expires.
- Provide enough structure for notifications and material version management without introducing heavy CRM features.

## Core Concepts

**Job Posting**
- A specific hiring opportunity.
- Has a source URL, title, company, hiring stage, and optional deadline.
- May be connected to material versions, alerts, notes, and process events.

**Source URL**
- The URL where the posting was found.
- Used for duplicate detection and reopening the original page.
- The URL may become unavailable later, so the saved posting must remain usable without the live page.

**Hiring Stage**
- The user's current position in the hiring process for this posting.
- Stage is business state, not UI view state.

**Process Event**
- A dated event related to the posting, such as coding test, assignment due date, interview, or offer discussion.
- MVP may store only the next event, but the business model should allow a process history later.

**Linked Material Version**
- A specific version of an application material connected to the posting.
- The posting should link to material versions, not only the material family, because submissions must be historically traceable.

## MVP Requirements

**Saving**
- JP1. The user can create a job posting from a URL.
- JP2. A saved posting must store company, title, source URL, hiring stage, and created date.
- JP3. Deadline is optional because not all postings expose a clear deadline.
- JP4. The app should detect exact duplicate source URLs before creating a new posting.
- JP5. If a duplicate source URL exists, the app should route the user to the existing posting instead of silently creating another one.

**Company Relationship**
- JP6. A job posting should belong to a company.
- JP7. If the posting is saved from a known company career page, it can be connected to that company.
- JP8. If the company is not known yet, the user can create or choose the company during posting creation.
- JP9. Removing a company must not destroy an active job posting by default.

**Hiring Stage**
- JP10. A posting has exactly one current hiring stage.
- JP11. MVP hiring stages are: interested, documents preparing, documents submitted, coding test, assignment, first interview, final interview, offer negotiation, accepted, rejected, closed.
- JP12. Accepted, rejected, and closed are terminal stages.
- JP13. Terminal postings should not create new deadline alerts by default.
- JP14. Stage changes should update the posting's modified date.

**Deadline And Events**
- JP15. A posting may have a posting deadline.
- JP16. A posting may have a next event date and label.
- JP17. Before submission, posting deadline is the primary date.
- JP18. After submission, next event date is usually more important than the original posting deadline.
- JP19. Past dates should remain visible as history-relevant information, not be automatically removed.

**Materials**
- JP20. A posting can link to multiple material versions.
- JP21. A posting can have zero linked materials while it is only saved or under early review.
- JP22. Before moving to documents submitted, the app should be able to warn if no required materials are linked.
- JP23. Submitted material versions should remain traceable after the posting is closed.

**Notes**
- JP24. A posting can have user notes.
- JP25. Notes are user-authored and should not be overwritten by browser-derived data.

**Alerts**
- JP26. A posting with a future deadline can produce deadline alert candidates.
- JP27. Deadline alert candidates should include D-7, D-3, D-1, and same-day where applicable.
- JP28. Past alert candidates should not be generated.
- JP29. Terminal postings should not generate new deadline alert candidates.
- JP30. A posting with a future next event can produce event alert candidates.

## Stage Definitions

| Stage | Meaning |
| --- | --- |
| interested | Saved for possible application, but no preparation has started. |
| documents preparing | The user is preparing application materials. |
| documents submitted | The user submitted documents and is waiting for the next step. |
| coding test | The process is in a coding test stage. |
| assignment | The process is in an assignment or take-home stage. |
| first interview | The process is in a first interview stage. |
| final interview | The process is in a final interview stage. |
| offer negotiation | The process is in compensation or offer discussion. |
| accepted | The process ended with acceptance. |
| rejected | The process ended with rejection. |
| closed | The user manually closed or archived the process. |

## Business Rules

- BR1. Source URL duplicate detection is exact-match in MVP.
- BR2. URL normalization may be added later, but MVP should not guess too aggressively.
- BR3. A posting remains valid even if its source URL is unavailable.
- BR4. Terminal stages are accepted, rejected, and closed.
- BR5. Terminal postings are excluded from active process counts.
- BR6. Terminal postings do not generate new deadline alerts by default.
- BR7. Material links should target material versions.
- BR8. User-entered fields take precedence over browser-derived defaults.
- BR9. Deleting a posting should be treated separately from closing a posting.

## Explicit Non-Goals

- Automatic job posting tracking.
- Automatic posting parsing.
- Automatic source URL normalization beyond exact duplicate checks.
- Automatic application form filling.
- Kanban board behavior.
- Full process history timeline in MVP.
- Company-level analytics.

## Open Questions

- OQ1. Should MVP require company for every posting, or allow an "unknown company" placeholder?
- OQ2. Which materials are considered required before documents submitted: resume only, or resume plus optional job-specific materials?
- OQ3. Should "closed" mean user abandoned the posting, posting expired, or any manually archived state?
- OQ4. Should coding test and assignment be stages, events, or both?


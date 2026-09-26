# Event Page & Event Registration Gap Analysis

A comprehensive comparison of the Event Page and Event Registration logic between **`lego-webapp`** (Web Frontend) and **`abakus-app`** (React Native Mobile App).

---

## 1. Executive Summary

| Category | Status | Summary |
| :--- | :--- | :--- |
| **Basic Event View & Metadata** | 🟡 Partial | Standard metadata (title, time, location, price, description) is implemented. Missing YouTube covers, Mazemap maps, company details/logos, responsible group links, and language indicators. |
| **Registration Flow** | 🟡 Partial | Cloudflare Turnstile captcha, basic POST registration, and DELETE unregistration hooks exist. Missing custom feedback questions, waitlist position counter, penalty-delayed open time calculations, and pre-registration consent/survey checks. |
| **Payment Integration** | 🔴 Missing | Zero payment integration. Users cannot pay for priced events via Stripe or Vipps in the React Native app. |
| **Pools & Attendee Roster** | 🔴 Missing | Shows overall capacity only. Missing pool quota visualizations, attendee lists, attendee search, and anonymity/photo consent flags. |
| **Admin & Organizer Tools** | 🔴 Missing | No Abacard/RFID presence scanner, allergy export list, admin attendee management, pool movement, or event creation/editing. |
| **State Hydration & Realtime** | 🟡 Partial | WebSocket listener exists for registration events, but initial attendee array population from event pools is commented out, causing state bugs. |

---

## 2. Feature Comparison Matrix

### A. Event Page & Metadata UI

| Feature | [`lego-webapp`](file:///home/frikkern/Webkom/lego-webapp/lego-webapp) | [`abakus-app`](file:///home/frikkern/Webkom/abakus-app) | Status |
| :--- | :--- | :--- | :--- |
| **Hero Image / Media** | Supports cover image and YouTube video embeds (`YoutubeCover`) | Supports static hero cover image ([`HeroSection.tsx`](file:///home/frikkern/Webkom/abakus-app/components/screens/event/hero-section.tsx)) | 🟡 Partial |
| **Event Type Badges** | Colored badges per event type (Bedpres, Kurs, Sosielt, etc.) | Uses event type badge styling ([`TitleSection.tsx`](file:///home/frikkern/Webkom/abakus-app/components/screens/event/event-page/title-section.tsx)) | 🟢 Implemented |
| **Company Details** | Displays company logo, name, link to company page, and description toggle | Displays raw location and company ID if available | 🔴 Missing |
| **Organizer / Group Avatar** | Responsible group name, logo, link, and contact email | Displays raw text string if present | 🔴 Missing |
| **Interactive Mazemap** | Embedded Mazemap campus navigation accordion | Displays text location string only | 🔴 Missing |
| **Language Indicator** | English flag badge (`isForeignLanguage`) | Not displayed | 🔴 Missing |
| **Star / Interest Button** | `InterestedButton` component (follow/unfollow event) | Not implemented | 🔴 Missing |
| **Deadlines Summary** | Clear breakdown of registration open, unregistration deadline, payment deadline | Registration open and unregistration deadline strings in logistics card | 🟡 Partial |

---

### B. Event Registration & Unregistration Logic

| Feature | [`lego-webapp`](file:///home/frikkern/Webkom/lego-webapp/lego-webapp) | [`abakus-app`](file:///home/frikkern/Webkom/abakus-app) | Status |
| :--- | :--- | :--- | :--- |
| **Captcha Protection** | Cloudflare Turnstile integration | Turnstile WebView integration ([`turnstile.tsx`](file:///home/frikkern/Webkom/abakus-app/components/screens/event/turnstile.tsx)) | 🟢 Implemented |
| **Registration Post / Delete** | Redux actions calling `/api/v1/events/{id}/registrations/` | OpenAPI hooks ([`useEventRegistration.ts`](file:///home/frikkern/Webkom/abakus-app/lib/hooks/useEventRegistration.ts)) | 🟢 Implemented |
| **Async Queue State** | `PENDING_REGISTER` state with progress bar ("Påmelding behandles, ikke oppdater siden") | Standard loading spinner without queue progress feedback | 🟡 Partial |
| **Custom Feedback Questions** | Renders custom questions (`feedbackRequired`) and validates user input | Sends empty string `feedback: ''`. Input is commented out in [`[id].tsx`](file:///home/frikkern/Webkom/abakus-app/app/authed/(stacks)/event/[id].tsx#L166) | 🟡 Partial |
| **Waitlist Position Counter** | Calculates exact position (`"Du er nr. 3 på ventelisten"` via [`getWaitingListPosition.ts`](file:///home/frikkern/Webkom/lego-webapp/lego-webapp/pages/events/@eventIdOrSlug/getWaitingListPosition.ts)) | Shows generic `"På venteliste"` badge without position number | 🔴 Missing |
| **Penalty Open Time Delay** | Calculates dynamic registration open delay (+3h per penalty, >2 = waitlist only) | Shows penalty count in [`PenaltyWarningCard.tsx`](file:///home/frikkern/Webkom/abakus-app/components/screens/event/event-page/penalty-warning-card.tsx), but does not delay/display calculated open time | 🟡 Partial |
| **Semester Photo Consent** | Checks `allConsentsAnswered` and blocks sign-up if unanswered | Not checked prior to registration | 🔴 Missing |
| **Unanswered Survey Checks** | Prompts/blocks sign-up if past event evaluations are pending ([`UnansweredSurveys.tsx`](file:///home/frikkern/Webkom/lego-webapp/lego-webapp/pages/events/@eventIdOrSlug/UnansweredSurveys.tsx)) | Not checked | 🔴 Missing |
| **Unregistration Feedback** | Allows providing a reason when unregistering | Sends DELETE request without unregistration reason | 🔴 Missing |
| **Unregister Penalty Modal** | Warns user if unregistering past deadline will incur 1 penalty point | Modal exists in [`RegistrationCard.tsx`](file:///home/frikkern/Webkom/abakus-app/components/events/RegistrationCard.tsx) | 🟢 Implemented |

---

### C. Payment Integration

| Feature | [`lego-webapp`](file:///home/frikkern/Webkom/lego-webapp/lego-webapp) | [`abakus-app`](file:///home/frikkern/Webkom/abakus-app) | Status |
| :--- | :--- | :--- | :--- |
| **Stripe Checkout** | Complete payment flow via [`StripeElement.tsx`](file:///home/frikkern/Webkom/lego-webapp/lego-webapp/pages/events/@eventIdOrSlug/StripeElement.tsx) | None | 🔴 Missing |
| **Payment Statuses** | Supports `UNPAID`, `PAID`, `PENDING`, `MANUAL`, `FAILED` | None | 🔴 Missing |
| **Payment Expiration Timer** | Tracks payment deadline before spot is forfeited | None | 🔴 Missing |
| **Refunds on Unregister** | Triggered automatically on unregistering before deadline | None | 🔴 Missing |

---

### D. Attendance & Pools Visualization

| Feature | [`lego-webapp`](file:///home/frikkern/Webkom/lego-webapp/lego-webapp) | [`abakus-app`](file:///home/frikkern/Webkom/abakus-app) | Status |
| :--- | :--- | :--- | :--- |
| **Pool Quotas & Capacity** | Breakdown of pools, capacities, registration counts, and target study years ([`usePools.ts`](file:///home/frikkern/Webkom/lego-webapp/lego-webapp/pages/events/@eventIdOrSlug/usePools.ts)) | Aggregates overall total capacity only | 🔴 Missing |
| **Attendee Roster & Grid** | View registered users and waitlist ([`AttendeeSection.tsx`](file:///home/frikkern/Webkom/lego-webapp/lego-webapp/pages/events/@eventIdOrSlug/AttendeeSection.tsx)) | None | 🔴 Missing |
| **Attendee Search** | Client-side search and filtering across attendees | None | 🔴 Missing |

---

### E. Admin & Organizer Functionality

| Feature | [`lego-webapp`](file:///home/frikkern/Webkom/lego-webapp/lego-webapp) | [`abakus-app`](file:///home/frikkern/Webkom/abakus-app) | Status |
| :--- | :--- | :--- | :--- |
| **Abacard / RFID Presence Check-in** | Scan cards or manual check-in (`PRESENT`, `LATE`, `NOT_PRESENT`) under `/administrate/abacard` | None | 🔴 Missing |
| **Allergy & Dietary Export** | Table and CSV/TXT exporter for catering under `/administrate/allergies` | None | 🔴 Missing |
| **Admin Registration Table** | Manage users, move pools, admin register/unregister under `/administrate/attendees` | None | 🔴 Missing |
| **Manual Payment Bump** | Mark users as manually paid or bump unpaid users | None | 🔴 Missing |
| **Event Creation / Editing** | Forms to create/edit events, pools, capacities, and dates | None | 🔴 Missing |

---

## 3. Known Bugs & Technical Issues in `abakus-app`

1. **Attendee Array Hydration Bug**  
   In [`useEventAttendance.ts`](file:///home/frikkern/Webkom/abakus-app/hooks/useEventAttendance.ts#L41-L47), lines 41–47 are commented out:
   ```typescript
   useEffect(() => {
     if (!event?.pools) return;
     // const allAttendees = event.pools.flatMap((pool) => pool.registrations?.map((reg) => reg.id.toString())) ?? [];
     // setAttendees(allAttendees);
   }, [event?.pools]);
   ```
   Because `attendees` is initialized to `[]`, `isUserSignedUp` fails to populate from initial API data and relies solely on incoming WebSocket events during an active app session.

2. **OpenAPI Schema Limitation (`PoolRead`)**  
   In `schema.d.ts`, `GET /api/v1/events/{id}/` returns `pools` of type `PoolRead`, which includes `registrationCount` but **not** a `registrations` array. `GET /api/v1/events/{eventPk}/registrations/` is a `POST`-only route (`get?: never`). Attendee tracking should be derived from `event.isAdmitted` and WebSocket updates or the `/administrate/` endpoint for admins.

---

## 4. Recommended Development Roadmap

1. **Phase 1: Fix Core Registration & Hydration**
   - Correct initial user registration state using `event.isAdmitted` in [`useEventAttendance.ts`](file:///home/frikkern/Webkom/abakus-app/hooks/useEventAttendance.ts).
   - Calculate and display exact waitlist position (`"Du er nr. X på ventelisten"`).
   - Re-enable and format the registration feedback input field.

2. **Phase 2: Pool & Attendance Transparency**
   - Implement pool breakdown cards showing quota per study year/group.
   - Add an attendee list view with anonymity toggles.

3. **Phase 3: Payment Integration**
   - Integrate Stripe SDK / Web Checkout for priced events (`isPriced`).
   - Display payment status badges and payment expiration countdowns.

4. **Phase 4: Admin & Attendance Scanning (Mobile Specific)**
   - Add an Abacard / QR code scanner for event organizers to check in attendees at doors.

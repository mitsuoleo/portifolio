# Portfolio

A public website that presents one person's work and story to people who might hire them.

## Language

**Portfolio**:
The public website itself: pages, copy, and Systems a Visitor can open without an account. Shape: Index, Work, Profile, Contact, Resume, plus one page per System. This repository holds only the Portfolio, not Evidence Repos. It is a static Astro site intended for Cloudflare Pages. The anchor System must link to a public, cloneable Evidence Repo before the Portfolio goes live.
_Avoid_: Resume as the Surface, personal brand, landing page, web app

**Owner**:
Leonardo Mitsuo Fukuda. The title this Portfolio sells is Backend developer, for an internship or a junior role. The Owner is a student of Systems Analysis and Development at FATEC Ipiranga, in progress since February 2026. Index states that target level. The Bio names São Paulo, Brazil. A count of years of professional experience is not stated.
_Avoid_: User, candidate, me, Backend Engineer, pleno, senior, full-stack engineer (not the title)

**Visitor**:
Anyone who opens the Portfolio.
_Avoid_: User, customer, client

**Recruiter**:
A Visitor whose job is screening people, often in seconds, and who may not evaluate the work technically. Index must make the role obvious in under ten seconds. Their hire path is Contact, GitHub, and CV through visible links.
_Avoid_: HR, talent, non-technical user

**Technical Reviewer**:
A Visitor who judges the Owner's work as an engineer or hiring manager: Evidence Repos, architecture, and whether the story matches the artifacts. Work and System pages are for them.
_Avoid_: Engineer, developer, hiring manager (too role-specific), peer

**Systems Lab**:
The public identity of the site: a personal computational engineering archive. Not a fake OS, NASA, IBM, Bloomberg, or a full-screen terminal.
_Avoid_: Dashboard template, cyberpunk terminal, Windows clone

**Index**:
The first screen: name, Backend developer, student status, the internship or junior target, value proposition, featured Systems, practice areas, System Status, a short editorial profile, and hire actions.
_Avoid_: Hero as a greeting, Surface (retired term)

**Look**:
A restrained dark interface (`#101010`) with light text, soft green light around the Index hero, and occasional violet technical accents. Montserrat carries the main text. Cards leave room for complete sentences and the project index does not show system numbers.
_Avoid_: Hard hero box, flashing status lights, repeated terminal text, crowded pill cards

**Open to Work**:
An explicit statement on Index that the Owner is available for an internship or a junior backend role.
_Avoid_: Badge, status, generic availability with no level, pleno, senior

**System**:
The unit of proof. A documented computational system with a title, lead, year, status, domain, duties, and technologies mapped to the job they did. Every public System carries the same nine-section study. Observa is no longer the only one.
_Avoid_: Project, portfolio piece, work sample, repo, tutorial, Case Study (retired term)

**Mercado One**:
The first and featured System: an in-progress ERP for small grocery stores. Its public repository contains a Java/Spring Boot API, Angular web admin, and JavaFX desktop POS that stores sales in SQLite before synchronizing. The admin and API are a verified Azure pilot; the POS stays on the register and points at that API. The MVP is not complete.
_Avoid_: Finished retail product, production-ready ERP, in-store deployment

**Observa**:
The full-study System: a local laboratory for diagnosing and recovering a distributed order journey. Python and Node.js services exchange Kafka events, persist effects in PostgreSQL, and correlate metrics, traces, and logs in Grafana. Its public Evidence Repo documents synthetic scenarios, reproducible commands, observed results, and limits. OrderFlow remains a read-only contract reference.
_Avoid_: production payment platform, high-availability claim, Commerce Intelligence

**Order Pipeline**:
A secondary System: event-driven e-commerce order through payment and inventory without synchronous calls between domain services. Evidence Repo is polyglot (Python and NestJS). NestJS is supporting evidence.
_Avoid_: OrderFlow (repo name as product language)

**Link Shortener**:
A secondary System: short links and asynchronous click capture. Redis serves warm redirects; a cache miss reads PostgreSQL. Evidence Repo is Go. UI in that repo is not the exhibit.
_Avoid_: URLshortner

**Evidence Repo**:
A public Git repository under the Owner's user account, or under an organization that is not an Employer. Employer-org repos do not qualify, even when public. Evidence Repos are not this Portfolio's repository.
_Avoid_: GitHub project, source, demo repo (unless it is the Evidence Repo)

**Employer**:
An organization the Owner worked for. The Portfolio never names an Employer. Employer-org repositories are not Evidence Repos.
_Avoid_: Company, client, brand

**Hire Conversation**:
The successful visit: the Visitor starts a conversation that can lead to hiring the Owner. Email and LinkedIn are equal ways to start it. GitHub is a sibling action for proof, not a Hire Conversation.
_Avoid_: Lead, conversion, contact (too vague), application

**CV**:
A PDF of the Owner's resume, kept in sync with the Portfolio, plus a web Resume page. It is not Index.
_Avoid_: Resume as the only page

**Portuguese**:
The default language of the Portfolio. A Visitor who does not choose otherwise sees Portuguese.
_Avoid_: PT-BR as a product term, "local language"

**English**:
A complete second language of the Portfolio, not mixed into Portuguese pages. Interviews may happen in English for international remote roles.
_Avoid_: "International version", mixed-language copy

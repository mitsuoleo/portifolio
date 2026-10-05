# Portfolio

A public website that presents one person's work and story to people who might hire them.

## Language

**Portfolio**:
The public website itself: pages, copy, and Systems a Visitor can open without an account. Shape: Index, Work, Profile, Lab, Contact, Resume, plus one page per System. This repository holds only the Portfolio, not Evidence Repos. It is a static Astro site hosted on Cloudflare Pages. It does not go public until the Commerce Intelligence Evidence Repo is cloneable.
_Avoid_: Resume as the Surface, personal brand, landing page, web app

**Owner**:
Leonardo Mitsuo Fukuda. The title this Portfolio sells is Backend Engineer. The claimed stack is Python and SQL. Index states they are Open to Work. The Bio names São Paulo, Brazil. Years of experience are not stated on Index.
_Avoid_: User, candidate, me, full-stack engineer (not the title)

**Visitor**:
Anyone who opens the Portfolio.
_Avoid_: User, customer, client

**Recruiter**:
A Visitor whose job is screening people, often in seconds, and who may not evaluate the work technically. Index must make the role obvious in under ten seconds. Their hire path is Contact, GitHub, and CV — never hidden behind the Command Center.
_Avoid_: HR, talent, non-technical user

**Technical Reviewer**:
A Visitor who judges the Owner's work as an engineer or hiring manager: Evidence Repos, architecture, and whether the story matches the artifacts. Work and System pages are for them.
_Avoid_: Engineer, developer, hiring manager (too role-specific), peer

**Systems Lab**:
The public identity of the site: a personal computational engineering archive. Not a fake OS, NASA, IBM, Bloomberg, or a full-screen terminal.
_Avoid_: Dashboard template, cyberpunk terminal, Windows clone

**Index**:
The first screen: name, Backend Engineer, value proposition, the 3D core (with a static fallback), featured Systems, practice areas, System Status, a short editorial profile, and hire actions.
_Avoid_: Hero as a greeting, Surface (retired term)

**Look**:
Scientific Minimal on an off-white field (`#F4F4EE`), ink (`#111315`), cobalt (`#2457F5`). Syne for display, IBM Plex Mono for system codes, Source Serif 4 for editorial lines. IBM Plex Sans for chrome. Aqua and glass only on the core artifact and rare highlights. Y2K shows up as codes, thin panels, and chrome-scale detail — not as nostalgia.
_Avoid_: Night navy instrument board, cream Apple clone, neon terminal, generic glassmorphism

**Open to Work**:
An explicit statement on Index that the Owner is available to be hired.
_Avoid_: Badge, status, looking for opportunities

**System**:
The unit of proof. A documented computational system with a code (`SYS/001`), title, lead, year, status, domain, duties, and technologies mapped to the job they did. The full editorial study (nine sections) at launch is Commerce Intelligence. Other Systems may appear in Work or Lab without that study.
_Avoid_: Project, portfolio piece, work sample, repo, tutorial, Case Study (retired term)

**Commerce Intelligence**:
The anchor System (`SYS/001`): a modular commerce analytics platform (ingest, analytical model, read API). Python, PostgreSQL, FastAPI, Docker. Evidence Repo is separate git and is not public yet. This page is the contract for what that repo must prove.
_Avoid_: BI product, shop, employer dashboard

**Catalog**:
A secondary System: products, variants, and stock with no orders. FastAPI, Postgres, Operator UI as a React SPA in the Evidence Repo. Not the Index anchor.
_Avoid_: Inventory service, e-commerce clone, ERP

**Operator UI**:
A backoffice screen that makes Catalog's invariants visible. Not an end-user shop.
_Avoid_: Admin (unless we mean Django admin), dashboard, frontend app

**Order Pipeline**:
A secondary System: event-driven e-commerce order through payment and inventory without synchronous calls between domain services. Evidence Repo is polyglot (Python and NestJS). NestJS is supporting evidence.
_Avoid_: OrderFlow (repo name as product language)

**Link Shortener**:
A secondary System: short links and clicks without putting the database on the redirect path. Evidence Repo is Go. UI in that repo is not the exhibit.
_Avoid_: URLshortner

**Lab**:
Notes, prototypes, and smaller Systems (for example PromptVault). Must not hide Index or Work.
_Avoid_: Blog, playground as the product

**Command Center**:
Keyboard command palette (`Ctrl/Cmd+K`, `/`). Power feature. Every essential path also exists as visible navigation.
_Avoid_: Terminal as the only UI

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

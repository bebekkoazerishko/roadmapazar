# 🚀 Architect-Grade Curriculum Upgrades

Based on your feedback, here is the modernized, focused curriculum proposal. This avoids the massive Express.js context switch, enforces TypeScript on the frontend, standardizes your testing with Testcontainers, and grounds your system design in reality.

Once you review and approve these snippets, I can inject them safely into your `RoadmapDashboard.jsx` codebase.

---

### 1. Phase 2 Upgrade: Testcontainers (Week 15)
*What changed: Upgraded the testing segment to use Testcontainers instead of relying purely on Mockito and H2 in-memory databases.*

```javascript
  {
    week: 15, phase: "Foundation Hardening", hours: 7, rest: false,
    theme: "AWS Shared Responsibility + Modern Spring Testing + Effective Java",
    tasks: [
      { id: "w15t1", title: "Reading: AWS Shared Responsibility Model", duration: "1h", type: "reading",
        details: "Google 'AWS Shared Responsibility Model'. AWS = security OF cloud. YOU = security IN cloud. Draw line, list 3 examples each side. DONE when: model memorized." },
      { id: "w15t2", title: "Practice: Intro to Testcontainers", duration: "2h", type: "practice",
        details: "Ditch H2 databases for testing. Add `testcontainers-bom` and `mysql` module to `pom.xml`. Write a `@DataJpaTest` that spins up a real MySQL Docker container using `@ServiceConnection`. DONE when: your DB tests execute against a real isolated Docker container." },
      { id: "w15t3", title: "Reading: Effective Java — Ch 5 + Ch 7", duration: "2h", type: "reading",
        details: "Get 'Effective Java' (3rd ed). Read Chapter 5 (Generics) and Chapter 7 (Lambdas/Streams). Pick 3 items to apply at work. DONE when: summaries written." },
      { id: "w15t4", title: "Practice: JUnit 5 + Mockito + Testcontainers Integration", duration: "2h", type: "practice",
        details: "Write a full `@SpringBootTest` for a service layer. Use Testcontainers for the DB layer, but use `@MockBean` to mock out an external API call block. DONE when: you understand the line between unit testing and true integration testing." },
    ],
  },
```

---

### 2. Phase 3 Upgrade: Pragmatic System Design (Weeks 25 & 26)
*What changed: Scrapped "Instagram" and "Chat Systems". Replaced them with deep dives into micro-architecture that juniors actively touch: Advanced Redis caching patterns, distributed locking, and resilience.*

```javascript
  {
    week: 25, phase: "Architecture & DevOps", hours: 7, rest: false,
    theme: "SD: Redis Caching Strategies + HikariCP + Open Source",
    tasks: [
      { id: "w25t1", title: "Read: Advanced Redis Caching Patterns", duration: "2.5h", type: "reading",
        details: "Forget massive chat systems. Read up on micro-architecture caching: Cache-Aside, Write-Through, and Write-Behind. Understand the 'Thundering Herd' problem and Cache Invalidation. DONE when: you can draw a sequence diagram of Cache-Aside with expiration." },
      { id: "w25t2", title: "Work: HikariCP Configuration", duration: "1h", type: "work",
        details: "Search 'hikari' in work application.properties. Google 'HikariCP configuration explained'. Key: pool-size = (CPU cores x 2) + disk spindles. DONE when: you understand each HikariCP setting." },
      { id: "w25t3", title: "Research: Find Open Source Issue", duration: "1h", type: "practice",
        details: "Go to github.com/topics/spring-boot, filter 'good first issues'. Find one you could attempt (typo, test, doc fix). Bookmark it. DONE when: specific issue bookmarked." },
      { id: "w25t4", title: "Watch: System Design Udemy — Final Sections", duration: "2.5h", type: "video",
        details: "Finish Udemy: API gateway, CDN, DB replication, remaining core concepts. DONE when: course complete." },
    ],
  },
  {
    week: 26, phase: "Architecture & DevOps", hours: 7, rest: false,
    theme: "Terraform Modules + Jenkins + System Resilience",
    tasks: [
      { id: "w26t1", title: "Practice: Create Terraform Module", duration: "2h", type: "practice",
        details: "In work Terraform, find S3/Lambda resource. Create modules/s3-bucket/ with main.tf, variables.tf. Run terraform plan. DONE when: plan succeeds — reusable module created." },
      { id: "w26t2", title: "Practice: Jenkins Pipeline", duration: "2h", type: "practice",
        details: "Create Jenkinsfile: pipeline { agent any stages { stage('Test') { steps { sh 'mvn test' } } } }. Push, trigger build. DONE when: pipeline runs successfully." },
      { id: "w26t3", title: "Practice: GitHub Actions CI", duration: "1.5h", type: "practice",
        details: "Create .github/workflows/ci.yml: on push to main, run mvn test. Push. Check Actions tab. DONE when: CI check green on GitHub." },
      { id: "w26t4", title: "Read: System Resilience (Circuit Breakers)", duration: "1.5h", type: "reading",
        details: "Instead of designing Instagram, study Resilience4J. Understand Circuit Breaker pattern, Retry, and Rate Limiting at the code level. DONE when: you can explain why and when a circuit breaker 'opens'." },
    ],
  },
```

---

### 3. Phase 4 Upgrade: Fullstack (React Typescript + JS Serverless)
*What changed: Express.js is gone. Week 33 is now building Serverless Lambda functions in Node.js. Week 34 is strict React + TypeScript via Vite.*

```javascript
  {
    week: 33, phase: "Fullstack Integration", hours: 7, rest: false,
    theme: "JS Backend Exposure: Node.js on AWS Lambda",
    tasks: [
      { id: "w33t1", title: "Watch: Node.js + AWS Lambda Crash Course", duration: "2h", type: "video",
        details: "On YouTube, watch a Node.js AWS Lambda tutorial. Focus on the handler function structure, the event object, and returning JSON responses natively. DONE when: you understand the serverless execution model." },
      { id: "w33t2", title: "Build: Write a Lambda Function in JS", duration: "2.5h", type: "build",
        details: "Write a simple Node.js Lambda function that takes a JSON payload, performs some basic validation, and returns a 200/400 status code. Deploy it manually to the AWS console. DONE when: you can test the Lambda successfully in AWS." },
      { id: "w33t3", title: "Admin: Portfolio Repo Architecture", duration: "1.5h", type: "build",
        details: "Create GitHub repo 'order-processing-system'. Mermaid diagram in README: Core Spring API, AWS Lambda (Node.js) worker, MySQL, AWS SQS. DONE when: repo with architecture diagram is live." },
      { id: "w33t4", title: "Watch: Devtiro Theory — Revisit", duration: "1h", type: "video",
        details: "Revisit testing/error handling in Theory Explained to prepare for writing solid portfolio API code. DONE when: video complete." },
    ],
  },
  {
    week: 34, phase: "Fullstack Integration", hours: 7, rest: false,
    theme: "React.js Basics + Strict TypeScript",
    tasks: [
      { id: "w34t1", title: "Watch: React + TypeScript Crash Course", duration: "2.5h", type: "video",
        details: "Search YouTube 'React TypeScript Tutorial'. Focus on creating Interfaces for your component Props and typing your useState hooks. As a Java dev, this will feel much safer. DONE when: you understand typed props." },
      { id: "w34t2", title: "Practice: Build a TypeScript React App", duration: "3h", type: "practice",
        details: "Use Vite (npm create vite@latest -- --template react-ts). Build a strictly-typed to-do list where tasks adhere to a `Task` interface. DONE when: app compiles with 0 TypeScript errors." },
      { id: "w34t3", title: "Read: CORS and the Fetch API", duration: "1.5h", type: "reading",
        details: "Read MDN 'Fetch API' and 'CORS'. Understand JSON parsing and cross-origin resource sharing. DONE when: you can explain why CORS errors happen between frontend and backend." },
    ],
  },
  {
    week: 35, phase: "Fullstack Integration", hours: 7, rest: false,
    theme: "Connecting TypeScript React to Spring Boot",
    tasks: [
      { id: "w35t1", title: "Practice: Fetch Typed Data from Spring", duration: "2.5h", type: "practice",
        details: "Set up @CrossOrigin. Use useEffect to fetch from Spring. Strongly type the API response matching your Spring DTOs. DONE when: frontend displays DB data without any 'any' types." },
      { id: "w35t2", title: "Watch: Devtiro Event Ticket — Parts 1-2", duration: "2.5h", type: "video",
        details: "Find 'Build an Event Ticket Platform'. Watch Parts 1-2. Code along. DONE when: Parts 1-2 done." },
      { id: "w35t3", title: "Build: Portfolio Foundation", duration: "2h", type: "build",
        details: "Initialize the Spring Boot 3.4/Java 21 backend for your capstone. Set up entities, repos, and push to GitHub. DONE when: backend spins up locally." },
    ],
  },
  {
    week: 36, phase: "Fullstack Integration", hours: 4, rest: true,
    theme: "REST WEEK — Fullstack Review & Consolidation",
    tasks: [
      { id: "w36t1", title: "Review: Request Flow Diagram", duration: "1.5h", type: "review",
        details: "Draw a detailed mental box-diagram: React (TS) fetch() -> CORS Preflight -> Spring @RestController -> Service -> Repo -> MySQL. DONE when: lifecycle is second nature." },
      { id: "w36t2", title: "Watch: Devtiro Event Ticket — Parts 3-4", duration: "2.5h", type: "video",
        details: "Continue Event Ticket Parts 3-4. Business logic complexity increases. DONE when: Parts 3-4 done." },
    ],
  },
  {
    week: 37, phase: "Fullstack Integration", hours: 7, rest: false,
    theme: "Capstone Backend Core + Developer Resume",
    tasks: [
      { id: "w37t1", title: "Watch: Devtiro Event Ticket — Parts 5-6", duration: "2.5h", type: "video",
        details: "Continue Event Ticket Parts 5-6. Incorporating security and deeper architecture. DONE when: Parts 5-6 done." },
      { id: "w37t2", title: "Build: Capstone Spring Backend Logic", duration: "2.5h", type: "build",
        details: "Write the logic for your portfolio. Use Testcontainers for the repository tests. DONE when: Core API endpoints test successfully in JUnit." },
      { id: "w37t3", title: "Admin: Rewrite Resume", duration: "2h", type: "practice",
        details: "Emphasize backend depth (Java, Spring, DevOps) but list 'React (TypeScript), AWS Lambda' as familiar tools. Include CCP cert. DONE when: resume polished." },
    ],
  },
  {
    week: 38, phase: "Fullstack Integration", hours: 7, rest: false,
    theme: "Capstone Frontend UI + Event Ticket Progress",
    tasks: [
      { id: "w38t1", title: "Watch: Devtiro Event Ticket — Parts 7-8", duration: "2.5h", type: "video",
        details: "Continue Event Ticket Parts 7-8. Almost done. DONE when: Parts 7-8 complete." },
      { id: "w38t2", title: "Build: Capstone React UI", duration: "4h", type: "build",
        details: "Build the React TS application consuming your backend. Create a Dashboard page and Orders page with strict typing. DONE when: React UI renders active fetch data." },
      { id: "w38t3", title: "Admin: Polish LinkedIn", duration: "0.5h", type: "practice",
        details: "Headline, CCP cert, GitHub project, About section, Open to Work. DONE when: LinkedIn recruiter-ready." },
    ],
  },
  {
    week: 39, phase: "Fullstack Integration", hours: 7, rest: false,
    theme: "Capstone Polish + Serverless Integration",
    tasks: [
      { id: "w39t1", title: "Watch: Devtiro Event Ticket — Parts 9-10 (FINISH)", duration: "2.5h", type: "video",
        details: "FINISH Event Ticket. Put the code away as a reference library. DONE when: Complete." },
      { id: "w39t2", title: "Build: Connect Spring to AWS Lambda", duration: "3h", type: "build",
        details: "Integrate your Week 33 Node.js Lambda function into the Spring capstone flow (e.g. Spring dumps a message to SQS, Lambda processes it). DONE when: Spring successfully triggers the Lambda." },
      { id: "w39t3", title: "Practice: GitHub CI/CD with Testcontainers", duration: "1.5h", type: "build",
        details: "Set up GitHub actions pipeline. Because you use Testcontainers, ensure your Actions runner has Docker socket access to pass tests. DONE when: CI pipeline runs successfully." },
    ],
  },
  {
    week: 40, phase: "Fullstack Integration", hours: 4, rest: true,
    theme: "REST WEEK — Deploying the Fullstack Capstone",
    tasks: [
      { id: "w40t1", title: "Build: Deploy Spring Backend", duration: "2h", type: "build",
        details: "Deploy your backend to AWS or Render. Update GitHub README. DONE when: Live URL returns JSON." },
      { id: "w40t2", title: "Build: Deploy React Frontend", duration: "2h", type: "build",
        details: "Deploy frontend UI to Vercel/Netlify. Verify CORS allows your Vercel URL. DONE when: Fully functional web app live on URL." },
    ],
  },
```

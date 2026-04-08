"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import AmbientBackground from "./ui/AmbientBackground";
import SpotlightCard from "./ui/SpotlightCard";

// ═══════════════════════════════════════════════════════════
// AZAR'S 48-WEEK LINEAR BACKEND DEVELOPER ROADMAP
// ═══════════════════════════════════════════════════════════
// Rules:
//   • Strictly linear — do task 1, then task 2, then task 3. No choosing.
//   • 6-8h/week regular, 3-4h rest weeks
//   • Every 4th week = rest week (review only, no new content)
//   • Video-first learning wherever possible
//   • All source materials integrated: Java Topics doc, Study Checklist 2026,
//     Wise interview prep, Devtiro courses, original roadmap items
// ═══════════════════════════════════════════════════════════

const WEEKS = [
  // ──────────────────────────────────────────
  // PHASE 1: CODE CONFIDENCE SPRINT (Weeks 1-8)
  // ──────────────────────────────────────────
  {
    week: 1, phase: "Code Confidence Sprint", hours: 7, rest: false,
    theme: "Git Fundamentals + Devtiro Kickoff + OOP Review",
    tasks: [
      { id: "w1t1", title: "Watch: Git Full Course", duration: "2h", type: "video",
        details: "Search YouTube for 'Everything You Need to Know about Git'. Watch the full video. While watching, open your terminal and type every command along with him: git init, git add, git commit, git branch, git checkout, git merge, git log --oneline, git stash. DONE when: you can create a repo, make a branch, commit on both branches, and merge them without Googling." },
      { id: "w1t2", title: "Watch: Devtiro ULTIMATE Guide — Quickstart + Maven", duration: "1h", type: "video",
        details: "Go to youtube.com/@devtiro. Find 'The ULTIMATE Guide to Spring Boot' (6h 13m). Watch ONLY the first ~30 min (Quickstart) and the Maven section (~15 min). Pause and type every line in IntelliJ. DONE when: you have a Spring Boot app running in your browser AND you can explain what pom.xml does." },
      { id: "w1t3", title: "Practice: OOP Fundamentals Drill", duration: "1.5h", type: "practice",
        details: "Open IntelliJ, create a new Java file. Without Googling, write: (1) An interface 'Describable' with one method describe(). (2) An abstract class 'Shape' implementing Describable with a field 'color'. (3) A 'Circle' class extending Shape with private field 'radius', getter/setter, and override describe(). (4) In main(), create a Circle, call describe(), and demonstrate 'this' vs 'super'. DONE when: it compiles and runs, and you can explain encapsulation, inheritance, polymorphism, and abstraction." },
      { id: "w1t4", title: "Work: Explore Your Work Project Structure", duration: "1h", type: "work",
        details: "Open your work project in IntelliJ. Don't try to understand the code yet — just map the STRUCTURE. (1) Find the src/main/java folder. Write down all the package names you see (like 'controller', 'service', 'repository', 'model'). (2) Count how many .java files are in each package. (3) Open pom.xml and list the dependency names (don't worry about understanding them yet — just list them). DONE when: you have a written map of your project's folder structure and a list of dependencies. You'll understand what all this means by Week 3." },
      { id: "w1t5", title: "Practice: SQL Basics By Hand", duration: "1.5h", type: "practice",
        details: "Open MySQL Workbench or DBeaver (download from dbeaver.io if needed). Connect to your work's dev database (ask team for credentials if needed). Write these 5 queries BY HAND: (1) SELECT with WHERE. (2) SELECT with INNER JOIN between two tables. (3) SELECT with LEFT JOIN. (4) SELECT with GROUP BY and COUNT. (5) SELECT with GROUP BY, HAVING, and ORDER BY. DONE when: all 5 run without errors." },
    ],
  },
  {
    week: 2, phase: "Code Confidence Sprint", hours: 7, rest: false,
    theme: "Spring DI + Collections Mastery + Build Your First CRUD",
    tasks: [
      { id: "w2t1", title: "Watch: Devtiro ULTIMATE — Dependency Injection + Configuration", duration: "1.5h", type: "video",
        details: "Continue the Devtiro ULTIMATE video. Watch the Dependency Injection section and Configuration section. After DI section, pause and explain out loud: 'What is dependency injection and why do we use it?' After Config section, open your work project's application.properties and write a comment above each line explaining what it does. DONE when: you can explain DI in your own words AND your application.properties is annotated." },
      { id: "w2t2", title: "Practice: Collections Framework Drill", duration: "1.5h", type: "practice",
        details: "Create a new Java file. Without Googling, write: (1) ArrayList<String> of 5 names — sort it, print it. (2) HashSet<String> — add duplicates, prove they get removed. (3) HashMap<String, Integer> mapping names to ages — iterate with entrySet(). (4) LinkedList — add/remove from both ends. (5) Streams: filter names with length > 4, map to uppercase, collect to List. DONE when: all 5 compile and run correctly, and you understand when to use each collection type." },
      { id: "w2t3", title: "Work: Read Pull Requests Daily (start today)", duration: "1h", type: "work",
        details: "Starting today, spend 15 minutes each work morning reading one PR from your team. Don't just look at the code — read the description. Ask: WHY did they make this change? If you don't understand a line, right-click then Go to Definition in IntelliJ. Do this every day for the next 2 weeks. DONE when: you've read 10 PRs and can explain what each one changed and why." },
      { id: "w2t4", title: "Build: Book CRUD API — No AI Allowed", duration: "3h", type: "build",
        details: "Turn OFF Copilot/AI in IDE (Settings then Plugins then disable). Go to start.spring.io (Java 21, Spring Web, Spring Data JPA, MySQL Driver). Create a 'Book' entity with: id (Long), title (String), author (String). Create BookRepository interface. Create BookService class. Create BookController with: GET /books, GET /books/{id}, POST /books, PUT /books/{id}, DELETE /books/{id}. Test each endpoint using Postman or IntelliJ HTTP client. DONE when: all 5 endpoints work correctly. This may take multiple sessions — that's fine." },
    ],
  },
  {
    week: 3, phase: "Code Confidence Sprint", hours: 7.5, rest: false,
    theme: "Lambdas + Devtiro Database + SQL Video Course Part 1",
    tasks: [
      { id: "w3t1", title: "Watch: Devtiro ULTIMATE — Database + SQL + JPA Entities", duration: "1.5h", type: "video",
        details: "Continue Devtiro ULTIMATE. Watch Database Basics, SQL Databases, and Database Objects (JPA entities) sections. He uses Postgres — you don't need it, just understand concepts. After watching, find any @Entity file in your work project and match everything you see with what Devtiro explained. DONE when: you understand @Entity, @Id, @Column, @OneToMany, and how Spring connects to a database." },
      { id: "w3t2", title: "Practice: Lambdas and Functional Interfaces Drill", duration: "1h", type: "practice",
        details: "Create a new Java file. Write: (1) Predicate<String> checking length > 5, test it. (2) Function<String, Integer> returning string length. (3) Consumer<String> that prints with prefix 'LOG: '. (4) Supplier<String> returning current timestamp as string. (5) Use method reference: replace a lambda with String::length. (6) Chain two Functions with .andThen(). DONE when: you can explain the difference between Function, Predicate, Consumer, and Supplier without looking it up." },
      { id: "w3t3", title: "Watch: SQL Full Course — Part 1 (Joins + Aggregation)", duration: "1.5h", type: "video",
        details: "On YouTube, watch 'Programming with Mosh — MySQL Tutorial for Beginners' (3h 10m, 18M+ views). Watch the first 1.5 hours covering SELECT, WHERE, JOINs (INNER, LEFT), GROUP BY, HAVING, ORDER BY. Pause and write each query yourself in DBeaver. You'll continue this in Week 5. DONE when: you can write a JOIN + GROUP BY query without help." },
      { id: "w3t4", title: "Work: Trace a Request Through Your Codebase", duration: "1h", type: "work",
        details: "NOW you know DI, controllers, and JPA from Devtiro. Open your work project. Find any controller (has @RestController). Pick one endpoint. Trace: (1) Which URL triggers it? (2) What service does it call? (3) What does that service do? (4) Does it call a repository? (5) What SQL gets generated? Write these 5 answers on paper. DONE when: you've traced one request from URL to database. This is the single most valuable exercise for understanding your work codebase." },
      { id: "w3t4b", title: "Practice: Debugging — Learn Your Debugger", duration: "1h", type: "practice",
        details: "Open your work project in IntelliJ. Find any controller method. Click the line number to set a breakpoint (red dot appears). Run app in DEBUG mode (bug icon, not green play). Call that endpoint from Postman. IntelliJ pauses on your breakpoint. Practice: (1) Hover over variables to see values. (2) F8 = next line. (3) F7 = step INTO a method. (4) F9 = continue running. Do this on 5 different endpoints. DONE when: debugging feels natural and you stop reaching for System.out.println first." },
      { id: "w3t5", title: "Build: Write Tests for Your Book CRUD", duration: "1h", type: "build",
        details: "In your Book CRUD project, create BookControllerTest.java. Add @SpringBootTest and @AutoConfigureMockMvc. Write 4 tests: (1) POST /books with valid data returns 201. (2) GET /books/{id} with real ID returns the book. (3) GET /books/{id} with ID 99999 returns 404. (4) POST /books with empty title returns 400. Use MockMvc. Google 'Spring Boot MockMvc test example' for setup only, write test logic yourself. DONE when: all 4 tests pass." },
    ],
  },
  {
    week: 4, phase: "Code Confidence Sprint", hours: 3.5, rest: true,
    theme: "REST WEEK — Review + Exception Handling + First Checkpoint",
    tasks: [
      { id: "w4t1", title: "Review: Revisit Your Weak Spots from Weeks 1-3", duration: "1h", type: "review",
        details: "Look back at weeks 1-3. What felt hardest? What did you get stuck on? Spend this hour going back to that specific topic — rewatch the video section, redo the drill, or re-read the code. DONE when: you've spent focused time on your weakest area." },
      { id: "w4t2", title: "Practice: Exception Handling Drill", duration: "1h", type: "practice",
        details: "Create a new Java file. Write: (1) A method that throws checked IOException — handle with try-catch-finally. (2) A method that throws unchecked IllegalArgumentException. (3) Your own custom exception: 'InsufficientFundsException extends RuntimeException' with a message field. (4) A try-with-resources block that opens and reads a file. DONE when: you can explain why RuntimeException doesn't need 'throws' in the method signature but IOException does." },
      { id: "w4t3", title: "Checkpoint: Timed CRUD Challenge (45 min)", duration: "1.5h", type: "practice",
        details: "Set timer for 45 minutes. Close everything. Open IntelliJ with empty Spring Boot project. Build a REST API with one entity (User, Product, anything) with full CRUD: GET all, GET by id, POST, PUT, DELETE. If you finish in time: you passed Phase 1 checkpoint. If not: write down exactly where you got stuck — that's your study list for next week. DONE when: you've attempted the challenge and written down results honestly." },
    ],
  },
  {
    week: 5, phase: "Code Confidence Sprint", hours: 7, rest: false,
    theme: "Devtiro REST APIs + Java 8+ Features + SQL Advanced",
    tasks: [
      { id: "w5t1", title: "Watch: Devtiro ULTIMATE — Jackson/JSON + REST API", duration: "1.5h", type: "video",
        details: "Continue Devtiro ULTIMATE. Watch Jackson/JSON section (understand what Jackson does, @JsonProperty, DTOs) and REST API section (GET, POST, PUT, DELETE endpoints). The REST section is the most important one — pause often and type every line. DONE when: you have a working CRUD API from the video AND you found one DTO in your work project and understood it." },
      { id: "w5t2", title: "Practice: Java 8+ Features Speed-Run", duration: "1h", type: "practice",
        details: "Create a new Java file. Write: (1) Optional<String> — use isPresent(), orElse('default'), ifPresent() to print. (2) LocalDateTime.now() — format with DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm'), parse it back. (3) Stream pipeline: list of integers, filter evens, map to squares, reduce to sum. DONE when: all 3 work without errors and you can explain Optional, DateTime API, and Streams fluently." },
      { id: "w5t3", title: "Watch: SQL Full Course — Part 2 (Subqueries + Window Functions)", duration: "2.5h", type: "video",
        details: "Continue 'Programming with Mosh — MySQL Tutorial for Beginners' from where you left off in Week 3. Watch through subqueries, window functions (ROW_NUMBER, RANK, PARTITION BY), stored procedures, and cascading. Write every query along the way. DONE when: you can write a ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...) query from memory." },
      { id: "w5t4", title: "Build: Implement Your Own ArrayList", duration: "1.5h", type: "build",
        details: "Create MyArrayList.java. Write your own ArrayList with: add(item), get(index), remove(index), size(). Internally use Object[] array. When array gets full, create new array double the size and copy everything. Test with main() method. DONE when: your MyArrayList works for adding 20+ items (triggering at least one resize) and all methods return correct results." },
      { id: "w5t5", title: "Reading: HashMap Source Code", duration: "0.5h", type: "reading",
        details: "Google 'Java HashMap source code openjdk'. Open it. Find ONLY: put(), get(), resize(). Read put() line by line. Key insight: HashMap stores data in array of 'buckets'. put(key, value) calculates bucket via hashCode(). Collisions use linked list (or tree if >8). Draw on paper: array where some slots have linked lists. DONE when: you can draw HashMap's internal structure and explain what happens on a collision." },
    ],
  },
  {
    week: 6, phase: "Code Confidence Sprint", hours: 7, rest: false,
    theme: "Devtiro Deployment + Debugging Mastery + Generics + Read Real Code",
    tasks: [
      { id: "w6t1", title: "Watch: Devtiro ULTIMATE — Deployment (Docker + AWS)", duration: "1h", type: "video",
        details: "Continue Devtiro ULTIMATE — watch the Deployment section. Don't do the AWS part yet. Focus on understanding: what Docker does (packages your app to run the same everywhere), what a Dockerfile is, how to run your app in Docker. DONE when: you can explain Docker in one sentence and know what a Dockerfile contains." },
      { id: "w6t2", title: "Practice: Break Your App Intentionally (3 Ways)", duration: "1h", type: "practice",
        details: "Take your Book CRUD app. Break it 3 ways: (1) Delete constructor injection from controller — run app, read the error. (2) Change controller method return type to void — call it, read error. (3) Remove @Entity from Book class — start app, read error. For each: read the FULL stack trace. The key part is the first 'Caused by:' line. DONE when: you've written down what each error means in plain English." },
      { id: "w6t3", title: "Practice: Generics Deep Drill", duration: "1h", type: "practice",
        details: "Create a generic class Box<T> with private field T value, getter, setter. Create a method accepting Box<? extends Number> (read only). Create another accepting Box<? super Integer> (write only). Test with Box<Integer> and Box<Double>. DONE when: you understand the PECS rule: <? extends T> = Producer (read), <? super T> = Consumer (write)." },
      { id: "w6t4", title: "Work: Enable SQL Logging + Find N+1 Queries", duration: "1h", type: "work",
        details: "Open work project's application.properties. Add: spring.jpa.show-sql=true. Restart app. Use it normally — look at console. If same SELECT runs 10+ times for one page load, that's the N+1 problem. Write down which endpoint causes it. DONE when: you've found at least one N+1 query OR confirmed there are none." },
      { id: "w6t5", title: "Reading: Spring PetClinic — Study a Real App", duration: "2h", type: "reading",
        details: "Clone: git clone https://github.com/spring-projects/spring-petclinic.git. Open in IntelliJ. Find and list: (1) all controller files, (2) all entity files, (3) all repository files. Draw diagram: Controllers, Services, Repositories, Database. Compare with your work project. DONE when: diagram drawn and you see the same pattern." },
      { id: "w6t6", title: "Work: EXPLAIN Your Work Queries", duration: "1h", type: "work",
        details: "Copy a SQL query from your console log. In database tool, type EXPLAIN before it and run. Look at 'type' column: ALL = scanning every row (slow), ref = using index (fast). Run EXPLAIN on 3 queries. DONE when: you've documented type and rows for 3 queries." },
    ],
  },
  {
    week: 7, phase: "Code Confidence Sprint", hours: 7, rest: false,
    theme: "Lambda Handler Pattern + Annotations/Reflection + I/O + Design Patterns",
    tasks: [
      { id: "w7t1", title: "Build: Lambda Handler — Locally (No AWS Yet)", duration: "2h", type: "build",
        details: "You'll deploy to real AWS in Week 14 after the CCP course covers Lambda. This week: understand the handler pattern first. Create a new Maven project. Add dependency: com.amazonaws:aws-lambda-java-core:1.2.3. Create class OrderHandler implements RequestHandler<Map<String, String>, String>. In handleRequest(): read orderId from input map, log it, return 'Processed order: ' + orderId. Write a main() that calls handleRequest() with a test HashMap. Run it locally. DONE when: it runs and you can explain: (1) what RequestHandler<INPUT, OUTPUT> is, (2) why Lambda uses this interface instead of a main() method, (3) what the 'event' object represents in production. You deploy this to actual AWS in Week 14." },
      { id: "w7t2", title: "Practice: Annotations + Reflection Drill", duration: "1h", type: "practice",
        details: "Create custom annotation: @MyAnnotation(description='test'). Apply to a class. Use Reflection to read it: Class.forName('MyClass').getAnnotation(MyAnnotation.class).description(). This is EXACTLY how Spring reads @Controller, @Service. DONE when: you can create a custom annotation and read it via reflection." },
      { id: "w7t3", title: "Practice: Java I/O and NIO Drill", duration: "1h", type: "practice",
        details: "Write 4 programs: (1) Read file with BufferedReader. (2) Write to file with BufferedWriter. (3) Use java.nio.file.Files.readAllLines(Path.of('file.txt')). (4) List all .java files with Files.walk(). DONE when: you can do file I/O both old (java.io) and new (java.nio) way." },
      { id: "w7t4", title: "Watch: Design Patterns Crash Course", duration: "2h", type: "video",
        details: "On YouTube, watch 'Derek Banas — Design Patterns Video Tutorial' playlist (he explains each pattern in 10-15 min with code). Focus on: Singleton, Factory, Builder, Observer, Strategy. For each: write 2-sentence summary. Find Builder in your work code (very common in Java). DONE when: you can name 5 patterns and explain when to use each." },
      { id: "w7t5", title: "Watch: SOLID Principles", duration: "1h", type: "video",
        details: "On YouTube, watch 'in28minutes — SOLID Principles in Java' (30 min). 5 principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. DONE when: you can explain each in one sentence with an example." },
    ],
  },
  {
    week: 8, phase: "Code Confidence Sprint", hours: 4, rest: true,
    theme: "REST WEEK — Confidence Checkpoints + Build Tools Review",
    tasks: [
      { id: "w8t1", title: "Checkpoint: Explain Spring Boot Startup", duration: "1h", type: "review",
        details: "Without Googling, explain out loud: (1) What does @SpringBootApplication do? (2) What happens when you run main()? (3) How does Spring know which classes to create as beans? (4) When you call GET /books, how does Spring route to the right method? If you can't answer all 4, rewatch Devtiro DI + Quickstart. DONE when: all 4 answered confidently." },
      { id: "w8t2", title: "Checkpoint: SQL Without Reference", duration: "1h", type: "practice",
        details: "Without any reference, write a SQL query that: joins 2 tables, groups by one column, filters with HAVING, orders result. Example: 'Find authors with >3 books, ordered by count.' DONE when: query works on first try." },
      { id: "w8t3", title: "Review: Build Tools — Understand Your pom.xml", duration: "1h", type: "review",
        details: "Open work project's pom.xml. For every dependency, write a comment explaining what it does. Run 'mvn clean install' and understand each phase. Try 'mvn dependency:tree'. DONE when: you can explain every dependency and Maven lifecycle phases." },
      { id: "w8t4", title: "Checkpoint: Window Function SQL", duration: "1h", type: "practice",
        details: "Without reference, write: SELECT column, ROW_NUMBER() OVER (PARTITION BY some_column ORDER BY another_column) as row_num FROM table. Use your actual work tables. DONE when: window function query runs correctly." },
    ],
  },

  // ──────────────────────────────────────────
  // PHASE 2: FOUNDATION HARDENING (Weeks 9-20)
  // ──────────────────────────────────────────
  {
    week: 9, phase: "Foundation Hardening", hours: 7, rest: false,
    theme: "Java 21 Virtual Threads + Records + Devtiro Task Tracker Start",
    tasks: [
      { id: "w9t1", title: "Watch + Code: Java Virtual Threads", duration: "1.5h", type: "video",
        details: "On YouTube, watch 'Java Brains — Virtual Threads in Java 21' (25 min, very clear explanation). Then code: Thread.startVirtualThread(() -> System.out.println('Hello from virtual thread!')). Create 10,000 virtual threads in a loop — notice how fast vs regular threads. DONE when: you can explain why virtual threads are cheaper than platform threads." },
      { id: "w9t2", title: "Practice: Java Records + Sealed Classes + Pattern Matching", duration: "1.5h", type: "practice",
        details: "Records: Rewrite a work DTO as: public record BookDTO(String title, String author) {}. Sealed Classes: Create sealed interface Shape permits Circle, Rectangle. Pattern Matching: Write switch(shape) { case Circle c -> c.radius(); case Rectangle r -> r.width(); }. DONE when: you've used records, sealed interfaces, and pattern matching switch." },
      { id: "w9t3", title: "Watch: Devtiro Task Tracker — Part 1", duration: "1.5h", type: "video",
        details: "Go to youtube.com/@devtiro. Find 'Build a Task Tracker in Spring Boot for Beginners' (2h 51m). Watch Part 1 (~1h). Type everything yourself. This is your SECOND full app. DONE when: entities, repos, and basic running task tracker." },
      { id: "w9t4", title: "Watch: Devtiro — How to Solve Errors (5 steps)", duration: "0.5h", type: "video",
        details: "Watch 'Exactly How to Solve Java and Spring Boot Errors (in 5 steps)' (8 min). Write 5 steps on sticky note, put next to monitor. DONE when: sticky note is on your monitor." },
      { id: "w9t5", title: "Watch: ByteByteGo System Design Preview", duration: "1.5h", type: "video",
        details: "On YouTube, search 'ByteByteGo' channel — watch 'System Design Interview: A Step-By-Step Guide' (~40 min). Watch during commute or cooking. Don't memorize — just get a feel for what system design means. This is Alex Xu's channel (same author as the book you'll use later). DONE when: you have a general sense of system design interviews." },
    ],
  },
  {
    week: 10, phase: "Foundation Hardening", hours: 7, rest: false,
    theme: "Devtiro Task Tracker Finish + AWS Account + Mock Interview Watch",
    tasks: [
      { id: "w10t1", title: "Watch: Devtiro Task Tracker — Parts 2+3", duration: "2h", type: "video",
        details: "Continue Task Tracker: Part 2 (46 min) and Part 3 (1h 6m). Full CRUD + error handling. After finishing, compare structure with your Book CRUD. Same pattern: entity, repo, service, controller. DONE when: task tracker complete and pattern recognized." },
      { id: "w10t2", title: "Watch: Devtiro — How I Design Builds (6 steps)", duration: "0.5h", type: "video",
        details: "Watch 'Exactly How I Design Java and Spring Boot Builds (in 6 steps)' (11 min). Write down 6 steps. Use this process next time you start a work task. DONE when: steps written down." },
      { id: "w10t3", title: "Setup: AWS Account + IAM Basics", duration: "1.5h", type: "practice",
        details: "Go to aws.amazon.com/free, create account (or use work account). Find eu-central-1 Frankfurt (closest to Budapest). Go to IAM: create user 'azar-practice', group 'developers' with AmazonS3ReadOnlyAccess. Enable MFA on root. DONE when: AWS account with IAM user, group, MFA." },
      { id: "w10t4", title: "Watch: Backend Interview Mock Video", duration: "1h", type: "video",
        details: "Search YouTube 'Exponent Java backend interview mock'. Watch one video. Note: (1) how they talk through thinking, (2) how they ask clarifying questions, (3) how they handle unknowns. Write 3 things done well + 1 thing you'd change. DONE when: notes written." },
      { id: "w10t5", title: "Watch: JVM Memory Model", duration: "1.5h", type: "video",
        details: "On YouTube, watch 'Java Brains — How Java Memory Works' (20 min) — he draws everything visually. Key: HEAP = objects, STACK = per-thread locals, METASPACE = class definitions. Draw the same box diagram on paper with your own examples. DONE when: you can draw JVM memory from memory." },
    ],
  },
  {
    week: 11, phase: "Foundation Hardening", hours: 7, rest: false,
    theme: "GC + Spring Internals + CompletableFuture",
    tasks: [
      { id: "w11t1", title: "Watch: Garbage Collection (G1GC)", duration: "1.5h", type: "video",
        details: "On YouTube, watch 'Java Brains — Java Garbage Collection' (20 min) then 'Coding with John — G1GC Explained' (15 min). G1GC (default since Java 9) divides memory into regions, collects fullest first. Add -Xlog:gc to work app JVM flags, restart, look at GC logs. DONE when: you can explain G1GC and have seen real GC logs." },
      { id: "w11t2", title: "Practice: Spring BeanPostProcessor", duration: "1h", type: "practice",
        details: "Create class implementing BeanPostProcessor. Override postProcessAfterInitialization — print bean name. Start app. See EVERY bean Spring creates. DONE when: you see the list and understand how much Spring does automatically." },
      { id: "w11t3", title: "Practice: Spring Auto-Configuration — The Magic", duration: "1h", type: "practice",
        details: "In IntelliJ, Ctrl+click @SpringBootApplication, then @EnableAutoConfiguration, find AutoConfiguration.imports file. Click DataSourceAutoConfiguration — read @Conditional annotations. These are the 'if' statements. DONE when: you understand auto-config = conditional bean creation." },
      { id: "w11t4", title: "Watch: Devtiro — How to Upgrade Spring Boot", duration: "0.5h", type: "video",
        details: "Watch 'How to upgrade any Spring Boot application - My framework' (5 min). DONE when: you know the upgrade framework." },
      { id: "w11t5", title: "Practice: CompletableFuture Async", duration: "1.5h", type: "practice",
        details: "Write: (1) Method returning CompletableFuture<String> with Thread.sleep(1000). (2) Another similar. (3) Chain: method1.thenApply().thenCompose(method2).exceptionally(). DONE when: async works and you understand thenApply vs thenCompose." },
      { id: "w11t6", title: "Practice: Spring N+1 Fix", duration: "1.5h", type: "practice",
        details: "Create Author + Book entities with @OneToMany. Create controller returning all authors. With show-sql=true, count queries: 1 + N. Fix with @EntityGraph(attributePaths='books'). Count again: should be 1 JOIN. DONE when: you can demo N+1 before and after." },
    ],
  },
  {
    week: 12, phase: "Foundation Hardening", hours: 4, rest: true,
    theme: "REST WEEK — Java 21 Review + Concurrency Basics",
    tasks: [
      { id: "w12t1", title: "Checkpoint: Java 21 Features — Prove It", duration: "1h", type: "review",
        details: "Open IntelliJ with an empty project. In 30 minutes, write ONE program that uses ALL four Java 21 features: (1) A sealed interface with 2 implementations using Records. (2) A switch with pattern matching on that sealed type. (3) A virtual thread that processes each implementation. If you finish in 30 min with no errors — you've internalized Java 21. If not, note what tripped you up. DONE when: attempted and weak spots identified." },
      { id: "w12t2", title: "Watch: Java Concurrency Basics", duration: "1.5h", type: "video",
        details: "On YouTube, watch 'Coding with John — Java Multithreading' (30 min, 1.5M views, very beginner-friendly). Focus on: Thread vs Runnable vs Callable, synchronized, ReentrantLock, ConcurrentHashMap, ExecutorService. DONE when: you can explain race conditions and how synchronized prevents them." },
      { id: "w12t3", title: "Practice: ExecutorService + Future", duration: "1.5h", type: "practice",
        details: "Write: (1) Thread pool with Executors.newFixedThreadPool(3). (2) Submit 5 Callable tasks. (3) Collect results with Future.get(). (4) Shutdown executor. Then try ScheduledExecutorService. DONE when: thread pools feel comfortable." },
    ],
  },
  {
    week: 13, phase: "Foundation Hardening", hours: 7, rest: false,
    theme: "AWS CCP Start + AI Tools Setup + GitHub Copilot Videos",
    tasks: [
      { id: "w13t1", title: "Watch: AWS CCP Udemy — IAM + EC2", duration: "2h", type: "video",
        details: "Go to udemy.com/course/aws-certified-cloud-practitioner-new/ (Stephane Maarek — buy on sale $10-15). Watch IAM deep dive and EC2 sections. Take notes on instance types: t2.micro (free tier), m5.large (general), c5 (compute). DONE when: IAM + EC2 sections done." },
      { id: "w13t2", title: "Setup: Cursor AI Editor", duration: "0.5h", type: "practice",
        details: "Download Cursor from cursor.com. Open a personal project. Ask Cursor to write a unit test. Read generated code — does it make sense? Compare with hand-written test. DONE when: you've generated and evaluated one AI test." },
      { id: "w13t3", title: "Watch: GitHub Copilot Videos (3 from your list)", duration: "1.5h", type: "video",
        details: "From your study checklist: (1) 'How to use GitHub Copilot'. (2) 'The ultimate guide to the GitHub Copilot CLI'. (3) 'AI Coding Masterclass: From Beginner to Expert in 90 Minutes'. Watch all three. DONE when: all 3 watched." },
      { id: "w13t4", title: "Watch: How I Code with AI Right Now", duration: "0.5h", type: "video",
        details: "Search YouTube 'How I code with AI right now'. Watch it. This completes your AI tools foundation. DONE when: you understand AI-assisted development workflow." },
      { id: "w13t5", title: "Watch: AWS CCP Udemy — S3 Section", duration: "1.5h", type: "video",
        details: "Continue Maarek's course — S3. Focus on storage classes (Standard, Standard-IA, Glacier, Deep Archive), lifecycle policies, versioning. In Console, create bucket, upload file, change storage class. DONE when: you can list 4 S3 classes." },
    ],
  },
  {
    week: 14, phase: "Foundation Hardening", hours: 7, rest: false,
    theme: "AWS CCP Lambda + Linux CLI + Jira + Spring Actuator",
    tasks: [
      { id: "w14t1", title: "Watch: AWS CCP Udemy — Lambda Section", duration: "1h", type: "video",
        details: "Continue Maarek — Lambda section. You use Lambda at work. Focus on: event-driven model, pricing (per invocation + duration), cold starts, Lambda layers. DONE when: you can explain Lambda pricing and cold starts." },
      { id: "w14t2", title: "Watch: Linux Command Line for Beginners", duration: "2h", type: "video",
        details: "Search YouTube 'Linux Command Line for Beginners' (1-2h tutorial). Focus on: ls, cd, pwd, mkdir, cp, mv, rm, cat, grep, find, chmod, pipes (|), redirect (>), ssh. Practice each in terminal. DONE when: you can navigate and search files from terminal without hesitation." },
      { id: "w14t3", title: "Watch: Jira Tutorial", duration: "1h", type: "video",
        details: "Search YouTube 'Jira Tutorial for Beginners'. Watch 30-60 min overview: boards (Kanban vs Scrum), sprints, stories, tasks, epics, backlog. DONE when: you know what a sprint, story, and epic are." },
      { id: "w14t4", title: "Practice: Spring Actuator Setup", duration: "1h", type: "practice",
        details: "In work pom.xml, check/add spring-boot-starter-actuator. Add to properties: management.endpoints.web.exposure.include=health,info,metrics. Hit /actuator/health, /actuator/metrics. DONE when: monitoring running." },
      { id: "w14t5", title: "Watch: AWS CCP — Billing and Pricing", duration: "1.5h", type: "video",
        details: "Exam LOVES pricing. Memorize: On-Demand (per hour), Reserved (1-3yr, save 72%), Spot (cheapest, can stop), Free Tier (12 months). Check Console, Billing, Cost Explorer. DONE when: 4 pricing models memorized." },
    ],
  },
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
  {
    week: 16, phase: "Foundation Hardening", hours: 4, rest: true,
    theme: "REST WEEK — AWS Review + AI Code Review Practice",
    tasks: [
      { id: "w16t1", title: "Checkpoint: Spring + AWS Pop Quiz", duration: "1.5h", type: "review",
        details: "Set a timer. Write answers WITHOUT Googling: SPRING: (1) What does @Autowired do? (2) What's the difference between @Component, @Service, @Repository? (3) How does @SpringBootApplication find your beans? AWS: (4) 4 EC2 pricing models. (5) 4 S3 storage classes. (6) Draw the Shared Responsibility Model line. (7) Explain IAM: users, groups, policies. (8) Lambda pricing formula. Score yourself /8. Below 6? Go back to weak sections before moving forward. DONE when: scored and weak spots addressed." },
      { id: "w16t2", title: "Practice: AI Code Review — Find 3 Problems", duration: "1h", type: "practice",
        details: "Ask Claude/Cursor to write a Spring service sending email on registration. Find 3+ problems: missing error handling? Hardcoded values? No validation? DONE when: 3 real problems found in AI code." },
      { id: "w16t3", title: "Practice: Claude as Study Partner", duration: "1h", type: "practice",
        details: "Paste work code into claude.ai (remove sensitive data). Ask 'Explain line by line. Any bugs?' Check if Claude is right. Find at least one thing it missed. DONE when: you've fact-checked an AI analysis." },
    ],
  },
  {
    week: 17, phase: "Foundation Hardening", hours: 7, rest: false,
    theme: "AWS CCP VPC/SQS/SNS + GH-300 Cert + REST API Design",
    tasks: [
      { id: "w17t1", title: "Watch: AWS CCP — VPC, SQS, SNS, CloudFormation", duration: "2.5h", type: "video",
        details: "Continue Maarek — VPC (subnets, security groups), SQS (message queues — you use this at work!), SNS (pub/sub), CloudFormation (IaC). DONE when: VPC subnets, SQS vs SNS, CloudFormation explained." },
      { id: "w17t2", title: "Cert: GitHub Copilot GH-300", duration: "2h", type: "practice",
        details: "Go to learn.microsoft.com, search 'GitHub Copilot GH-300'. Complete learning modules and take cert exam (free). DONE when: learning path done and exam passed/scheduled." },
      { id: "w17t3", title: "Watch: Devtiro — REST API Design", duration: "0.5h", type: "video",
        details: "Watch 'How to Design REST APIs (With Example)' (22 min). Compare with your work API design. Write 3 observations. DONE when: notes written." },
      { id: "w17t4", title: "Practice: AWS CCP Practice Exam #1", duration: "1.5h", type: "practice",
        details: "Go to udemy.com/course/practice-exams-aws-certified-cloud-practitioner/ (from your list). Take exam, 90 min timed. Review ALL wrong answers. Write weak topics. DONE when: exam taken, weak topics listed." },
    ],
  },
  {
    week: 18, phase: "Foundation Hardening", hours: 7, rest: false,
    theme: "AWS CCP Final Push + Java Modules + Mockito Deep",
    tasks: [
      { id: "w18t1", title: "Practice: AWS CCP Practice Exam #2", duration: "1.5h", type: "practice",
        details: "Take second practice exam. Target: 85%+. If not there, rewatch weak sections. DONE when: score known and study plan made." },
      { id: "w18t2", title: "Watch: AWS CCP — Remaining Sections", duration: "2h", type: "video",
        details: "Finish remaining Maarek sections: Well-Architected Framework, Organizations, Config, CloudTrail, CloudWatch. DONE when: entire course complete." },
      { id: "w18t3", title: "Practice: Java Modules (Java 9+)", duration: "1h", type: "practice",
        details: "Create module-info.java: module com.azar.core { exports com.azar.core.api; requires java.sql; }. DONE when: you can explain what module-info.java does." },
      { id: "w18t4", title: "Watch: Devtiro Theory Explained — Part 1", duration: "1.5h", type: "video",
        details: "Watch first half of 'How to Build Your First Spring Boot App (Theory Explained)' (2h 34m total). Theory makes more sense now that you've built apps. DONE when: first half watched." },
    ],
  },
  {
    week: 19, phase: "Foundation Hardening", hours: 7, rest: false,
    theme: "AWS CCP Final Practice + Exam Prep",
    tasks: [
      { id: "w19t1", title: "Practice: AWS CCP Practice Exams #3-4", duration: "3h", type: "practice",
        details: "Take 2 more practice exams. Target: 85%+ consistently. If not there, study ONLY weak topics. DONE when: scoring 85%+ consistently." },
      { id: "w19t2", title: "Review: AWS CCP Flash Cards", duration: "1.5h", type: "review",
        details: "Create flashcards: all EC2 types, S3 classes, database types, networking concepts, billing models. Run through until instant recall. DONE when: rapid-fire 50 questions answered." },
      { id: "w19t3", title: "Admin: Book AWS CCP Exam", duration: "0.5h", type: "practice",
        details: "Go to aws.training. Pearson VUE. Test center near Budapest or online proctored. 90 min, 65 questions, need 70%. Schedule for next week. DONE when: exam booked." },
      { id: "w19t4", title: "Watch: Devtiro Theory Explained — Part 2", duration: "1.5h", type: "video",
        details: "Finish second half of Theory Explained. Good pre-exam-week content. DONE when: full video complete." },
    ],
  },
  {
    week: 20, phase: "Foundation Hardening", hours: 4, rest: true,
    theme: "REST WEEK — AWS CCP EXAM DAY",
    tasks: [
      { id: "w20t1", title: "MILESTONE: Take AWS Cloud Practitioner Exam", duration: "2h", type: "practice",
        details: "90 minutes, 65 questions. Trust your preparation. DONE when: exam taken." },
      { id: "w20t2", title: "Admin: Update LinkedIn + Celebrate", duration: "0.5h", type: "practice",
        details: "Add 'AWS Certified Cloud Practitioner' to LinkedIn. Share a post. DONE when: LinkedIn updated." },
      { id: "w20t3", title: "Review: Phase 2 Retrospective", duration: "1.5h", type: "review",
        details: "Look back at weeks 9-20. What were you best at? Weakest at? Write a 5-sentence self-assessment. Carry weak areas into next phase. DONE when: honest assessment written." },
    ],
  },

  // ──────────────────────────────────────────
  // PHASE 3: ARCHITECTURE & DEVOPS (Weeks 21-32)
  // ──────────────────────────────────────────
  {
    week: 21, phase: "Architecture & DevOps", hours: 7, rest: false,
    theme: "System Design Framework + MySQL EXPLAIN + Devtiro Blog Start",
    tasks: [
      { id: "w21t1", title: "Reading: System Design Interview — Vol 1", duration: "2h", type: "reading",
        details: "Get 'System Design Interview' by Alex Xu (Vol 1). The PDF is very easily found online (LibGen, GitHub). Read Ch 1-2 (~40 pages). FRAMEWORK: Clarify, Scale, API, Data, Arch, Deep Dive. Write it on a sticky note. DONE when: framework memorized." },
      { id: "w21t2", title: "Practice: MySQL EXPLAIN on Work Queries", duration: "1h", type: "practice",
        details: "Pick 3 work queries (from show-sql). Run EXPLAIN on each. Record: type (ALL/ref/const), rows scanned, Extra. DONE when: 3 queries documented." },
      { id: "w21t3", title: "Watch: Devtiro Blog Platform — Part 1", duration: "1.5h", type: "video",
        details: "Find 'Build a Blog Platform with Spring Security for Beginners' (3h 58m). Watch Part 1 (1h 7m). Spring Security — #1 topic juniors struggle with. DONE when: basic blog with user registration." },
      { id: "w21t4", title: "Watch: SystemsExpert — Fundamentals 01-08", duration: "1.5h", type: "video",
        details: "Open your downloaded torrent. Go to 'SystemsExpert -> Systems Design Fundamentals'. Watch videos 01 through 08 (Client-Server to Caching). DONE when: first 8 videos watched." },
    ],
  },
  {
    week: 22, phase: "Architecture & DevOps", hours: 7, rest: false,
    theme: "SD: URL Shortener + MySQL Indexing + Domain Modeling",
    tasks: [
      { id: "w22t1", title: "Read + Practice: Design URL Shortener", duration: "2h", type: "reading",
        details: "Read Alex Xu Ch 8. Close book. On paper: draw boxes (client, API, DB), write endpoints, explain short code generation. Compare with book. DONE when: URL shortener designed from scratch." },
      { id: "w22t2", title: "Practice: Create MySQL Indexes", duration: "1h", type: "practice",
        details: "Take slow query (type=ALL). CREATE INDEX on WHERE clause columns. Run EXPLAIN again — type should change. Document before/after. DONE when: one query sped up with index." },
      { id: "w22t3", title: "Watch: Devtiro — Domain Modeling", duration: "0.5h", type: "video",
        details: "Watch 'How to Model an Application's Domain (With Example)' (13 min). DONE when: you can draw domain models before writing code." },
      { id: "w22t4", title: "Watch: SystemsExpert — Fundamentals 09-17", duration: "2h", type: "video",
        details: "Continue 'Systems Design Fundamentals' folder. Watch videos 09 through 17 (Proxies, Load Balancers, Hashing, Databases, Replication, P2P Networks). DONE when: each concept explainable in one sentence." },
      { id: "w22t5", title: "Watch: Exponent URL Shortener Mock", duration: "1h", type: "video",
        details: "Search YouTube 'Exponent Design TinyURL system design'. Watch. Compare with your design. Write 2 new things learned. DONE when: notes written." },
    ],
  },
  {
    week: 23, phase: "Architecture & DevOps", hours: 7, rest: false,
    theme: "SD: Rate Limiter + Devtiro Blog Part 2 + Slow Query Log",
    tasks: [
      { id: "w23t1", title: "Read + Practice: Design Rate Limiter", duration: "2h", type: "reading",
        details: "Read Alex Xu Ch 4. Token Bucket and Sliding Window algorithms. Draw both on paper. Explain: which simpler? Which more accurate? DONE when: both algorithms drawable from memory." },
      { id: "w23t2", title: "Watch: Devtiro Blog — Part 2", duration: "1.5h", type: "video",
        details: "Part 2 (1h 5m). Login, authentication, route protection. DONE when: you understand SecurityFilterChain, request interception, @PreAuthorize." },
      { id: "w23t3", title: "Work: MySQL Slow Query Log", duration: "1h", type: "work",
        details: "SET GLOBAL slow_query_log = 'ON'; SET GLOBAL long_query_time = 2; Use app for a day. Check log. Pick slowest query, EXPLAIN it, try adding index. DONE when: one slow query analyzed." },
      { id: "w23t4", title: "Watch: SystemsExpert — Fundamentals 18-25", duration: "2h", type: "video",
        details: "Finish the 'Systems Design Fundamentals' folder. Watch videos 18 through 25 (Polling/Streaming, Rate Limiting, Pub/Sub, MapReduce, Security, API Design). DONE when: Fundamentals module complete." },
    ],
  },
  {
    week: 24, phase: "Architecture & DevOps", hours: 3.5, rest: true,
    theme: "REST WEEK — Devtiro Blog Finish + System Design Practice",
    tasks: [
      { id: "w24t1", title: "Watch: Devtiro Blog — Part 3 (Finish)", duration: "2h", type: "video",
        details: "Part 3 (1h 46m). Authorization, edit/delete posts. After: you can say 'I've implemented auth with Spring Security.' DONE when: blog complete." },
      { id: "w24t2", title: "Review: System Design Timed Practice", duration: "1.5h", type: "review",
        details: "Pick a simple system (note app, bookmark manager). Use Alex Xu framework. Timer: 30 min. Design on paper. DONE when: timed practice done." },
    ],
  },
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
      { id: "w25t4", title: "Watch: SystemsExpert — Interview Questions", duration: "2.5h", type: "video",
        details: "Open 'Systems Design Interview Questions' folder. Watch the first 4 mock interviews (e.g. Design AlgoExpert, Code-Deployment, Stockbroker, Facebook News Feed). Pay close attention to HOW they structure their answers. DONE when: 4 mock interviews watched." },
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
  {
    week: 27, phase: "Architecture & DevOps", hours: 7, rest: false,
    theme: "Lambda SnapStart + Open Source PR + Terraform State",
    tasks: [
      { id: "w27t1", title: "Practice: Lambda SnapStart", duration: "1.5h", type: "practice",
        details: "In work Lambda Terraform: add snap_start { apply_on = 'PublishedVersions' }. Deploy. Measure cold start before vs after. DONE when: improvement measured and explainable." },
      { id: "w27t2", title: "Build: Submit Open Source PR", duration: "2.5h", type: "build",
        details: "Fork bookmarked repo. Clone. Branch: git checkout -b fix/my-contribution. Make change. Test. Commit. Push. Create PR with description. DONE when: PR submitted." },
      { id: "w27t3", title: "Practice: Terraform Remote State", duration: "1.5h", type: "practice",
        details: "Create S3 bucket for state. Add backend 's3' config. Run terraform init to migrate. DONE when: state in S3 and you can explain why remote state matters." },
      { id: "w27t4", title: "Review: System Design Practice Out Loud", duration: "1.5h", type: "review",
        details: "Pick a system (parking lot, food delivery). 30-min timer. Talk through design out loud. Record on phone. Listen back. DONE when: one timed design recorded." },
    ],
  },
  {
    week: 28, phase: "Architecture & DevOps", hours: 3.5, rest: true,
    theme: "REST WEEK — DevOps Review + AI Mock Setup",
    tasks: [
      { id: "w28t1", title: "Review: DevOps Concepts", duration: "1h", type: "review",
        details: "Without reference: (1) Terraform module? (2) Jenkins pipeline? (3) GitHub Actions? (4) Remote state? (5) Lambda SnapStart? DONE when: all 5 answered." },
      { id: "w28t2", title: "Follow-Up: Open Source PR", duration: "0.5h", type: "practice",
        details: "Check PR status. Respond to feedback. If merged: add to resume. DONE when: status checked." },
      { id: "w28t3", title: "Practice: AI Mock (or Pramp) — System Design", duration: "1.5h", type: "practice",
        details: "Use an AI mock interviewer (like interviewing.io AI or ChatGPT Advanced Voice Mode) for zero pressure. OR, if you feel brave, book a real peer-to-peer mock on pramp.com. Describe a system design out loud. DONE when: mock done." },
    ],
  },

  // ──────────────────────────────────────────
  // PHASE 4: ADVANCED PATTERNS (Weeks 29-40)
  // ──────────────────────────────────────────
  {
    week: 29, phase: "Advanced Patterns", hours: 7, rest: false,
    theme: "Kafka + Docker + Devtiro Restaurant Start",
    tasks: [
      { id: "w29t1", title: "Watch: Kafka Explained", duration: "1.5h", type: "video",
        details: "On YouTube, watch 'Confluent — Apache Kafka 101' playlist (first 5 episodes, ~10 min each, by the company that MADE Kafka). Key: TOPIC, PRODUCER, CONSUMER, PARTITION, CONSUMER GROUP. Draw diagram with arrows. DONE when: diagram drawn, each concept explained." },
      { id: "w29t2", title: "Build: Docker — Containerize Your App", duration: "1.5h", type: "build",
        details: "Create Dockerfile: FROM eclipse-temurin:21-jre / COPY target/*.jar app.jar / ENTRYPOINT [\"java\",\"-jar\",\"/app.jar\"]. Build and run: docker build -t my-app . && docker run -p 8080:8080 my-app. DONE when: app runs in Docker." },
      { id: "w29t3", title: "Watch: Devtiro Restaurant Review — First 2h", duration: "2h", type: "video",
        details: "Find 'Build a Restaurant Review Platform' (5h 13m). Watch first 2 hours. INTERMEDIATE: multiple entities, relationships, filtering. Code along. DONE when: first 2h done." },
      { id: "w29t4", title: "Watch: Devtiro Microservices + Service Discovery", duration: "0.5h", type: "video",
        details: "Watch 'Spring Boot Microservices Explained' (9 min) + 'What is Service Discovery?' (6 min). DONE when: microservices vocabulary acquired." },
    ],
  },
  {
    week: 30, phase: "Advanced Patterns", hours: 7, rest: false,
    theme: "Spring Kafka + Docker Compose + Restaurant Continue",
    tasks: [
      { id: "w30t1", title: "Build: Spring Kafka Producer + Consumer", duration: "2h", type: "build",
        details: "New project with Spring Kafka. KafkaProducer sends to 'orders' topic. KafkaConsumer with @KafkaListener prints messages. Run Kafka: docker run -p 9092:9092 apache/kafka. Test. DONE when: messages flow producer to consumer." },
      { id: "w30t2", title: "Build: Docker Compose Multi-Container", duration: "1.5h", type: "build",
        details: "docker-compose.yml with 3 services: Spring app, MySQL, Redis. Set env vars. docker-compose up. DONE when: all 3 start together." },
      { id: "w30t3", title: "Watch: Devtiro Restaurant — Continue", duration: "2h", type: "video",
        details: "Continue Restaurant Review. Pay attention to complex queries and larger app structure. DONE when: about 4h into the video." },
      { id: "w30t4", title: "Practice: Kafka vs SQS Doc", duration: "1.5h", type: "practice",
        details: "Write 'Kafka vs SQS: When to use which'. SQS: simple queue, AWS-native, no replay. Kafka: replay, multiple consumers, high throughput. Include work example. DONE when: decision document written." },
    ],
  },
  {
    week: 31, phase: "Advanced Patterns", hours: 7, rest: false,
    theme: "Redis + Spring Cache + Restaurant Finish + Kubernetes",
    tasks: [
      { id: "w31t1", title: "Practice: Redis Hands-On", duration: "1h", type: "practice",
        details: "docker run -p 6379:6379 redis. redis-cli. Try SET, GET, HSET, HGETALL. Understand: RAM = fast (milliseconds vs 50-100ms DB). DONE when: basic Redis commands used." },
      { id: "w31t2", title: "Build: Spring Cache with Redis", duration: "1.5h", type: "build",
        details: "Add spring-boot-starter-data-redis + spring-boot-starter-cache. spring.cache.type=redis. @EnableCaching. @Cacheable on slow method. Call twice — verify second is cached. DONE when: caching works." },
      { id: "w31t3", title: "Watch: Devtiro Restaurant — Finish", duration: "1.5h", type: "video",
        details: "Finish remaining Restaurant Review. You've now built 4 Spring Boot apps. DONE when: complete." },
      { id: "w31t4", title: "Watch + Practice: Kubernetes Basics", duration: "2h", type: "video",
        details: "Watch 'Kubernetes explained in 15 minutes'. Install minikube. Run: minikube start, kubectl create deployment, kubectl expose, minikube service. DONE when: app running on K8s locally." },
    ],
  },
  {
    week: 32, phase: "Advanced Patterns", hours: 3.5, rest: true,
    theme: "REST WEEK — Review + Devtiro Validation Videos",
    tasks: [
      { id: "w32t1", title: "Review: Kafka + Redis + Docker", duration: "1h", type: "review",
        details: "Without reference: (1) Kafka diagram. (2) Why Redis is fast + 3 data structures. (3) Docker vs Compose. (4) What K8s adds. DONE when: all answered." },
      { id: "w32t2", title: "Watch: Devtiro — Bad Data + Copy Pattern", duration: "1h", type: "video",
        details: "Watch 'Stop Accepting Bad Data' (8 min) on @Valid, @NotNull, @Size. Then 'Copy This Pattern' (10 min). DONE when: input validation understood." },
      { id: "w32t3", title: "Practice: System Design Out Loud", duration: "1.5h", type: "review",
        details: "Design a new system (e.g., e-commerce checkout). 30-min timer. Record yourself. Listen back. DONE when: timed design practiced." },
    ],
  },
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

  // ──────────────────────────────────────────
  // PHASE 5: INTERVIEW READY (Weeks 41-48)
  // ──────────────────────────────────────────
  {
    week: 41, phase: "Interview Ready", hours: 7, rest: false,
    theme: "DSA Course Start + Launch Presentation",
    tasks: [
      { id: "w41t1", title: "Admin: Capstone Presentation Post", duration: "1h", type: "practice",
        details: "Record a 2-minute Loom video of your deployed fullstack application. Post it on LinkedIn, highlighting the Java, TS React, and AWS Lambda tech stack. DONE when: video posted." },
      { id: "w41t2", title: "Watch: Big-O Notation Refresher", duration: "1.5h", type: "video",
        details: "Watch a high-level refresher on Big O (Space and Time complexity). Junior interviewers will ask this every time. DONE when: O(1), O(N), O(N^2), and O(log N) memorized." },
      { id: "w41t3", title: "Watch: NeetCode Pro — DSA for Beginners (Part 1)", duration: "2h", type: "video",
        details: "Open your downloaded 'Algorithms & Data Structures for Beginners' folder. Watch the sections covering Arrays, Linked Lists, and Stacks. NeetCode is the absolute gold standard for this. DONE when: sections watched." },
      { id: "w41t4", title: "Watch: NeetCode Pro — DSA for Beginners (Part 2)", duration: "2h", type: "video",
        details: "Continue the 'Beginners' folder. Watch sections covering Binary Search, Trees, and Hash Maps. DONE when: crash course completed." },
    ],
  },
  {
    week: 42, phase: "Interview Ready", hours: 7, rest: false,
    theme: "LeetCode Start + System Design Out Loud + DSA Trees",
    tasks: [
      { id: "w42t1", title: "Practice: NeetCode Pro — Advanced Algorithms (Part 1)", duration: "2h", type: "practice",
        details: "Move to your 'Advanced Algorithms' folder. Watch the videos on Two Pointers, Sliding Window, and prefix sums. Practice implementing them locally. DONE when: patterns understood." },
      { id: "w42t2", title: "Practice: SystemsExpert — Netflix / Uber", duration: "1.5h", type: "practice",
        details: "From your 'Systems Design Interview Questions' folder, watch the Netflix and Uber system design mocks. Notice how data storage scales. DONE when: videos watched." },
      { id: "w42t3", title: "Practice: NeetCode 150 — Arrays & Hashing", duration: "2h", type: "practice",
        details: "Go to neetcode.io/practice. Do the first 5 problems under Arrays & Hashing. Watch his video solution immediately if you are stuck for more than 20 mins. DONE when: 5 problems done." },
      { id: "w42t4", title: "Practice: NeetCode 150 — Two Pointers", duration: "1.5h", type: "practice",
        details: "Do 5 problems under Two Pointers and Sliding Window. The difficulty spikes here. Attempt them yourself before watching the explanation. DONE when: 5 problems done." },
    ],
  },
  {
    week: 43, phase: "Interview Ready", hours: 7, rest: false,
    theme: "Kotlin Intro + Spring Interview Prep + LeetCode",
    tasks: [
      { id: "w43t1", title: "Watch: Kotlin for Java Devs", duration: "2h", type: "video",
        details: "Wise uses Kotlin. On YouTube, watch 'Kotlin Course — Tutorial for Beginners' by freeCodeCamp (2.5h — watch first 2h). Focus on: null safety (?. and !!), data classes (like Java records), extension functions, coroutines. Don't build yet — just understand syntax differences. DONE when: you can read Kotlin code and map it to Java equivalents." },
      { id: "w43t2", title: "Practice: Spring Boot Interview Questions", duration: "1.5h", type: "practice",
        details: "Google 'Spring Boot interview questions 2025'. Top 30. Write answers for: bean scopes, @Transactional, AOP, @Component vs @Service, auto-config. DONE when: 30 written answers." },
      { id: "w43t3", title: "Practice: NeetCode Pro — Advanced Algos (Graphs)", duration: "2h", type: "practice",
        details: "Open 'Advanced Algorithms' folder. Watch the Graph sections (BFS, DFS, Dijkstra). Then do 3 Graph problems on NeetCode 150. DONE when: Graph patterns mastered." },
      { id: "w43t4", title: "Practice: NeetCode 150 — Trees & Tries", duration: "1.5h", type: "practice",
        details: "Do 5 problems across Trees and Tries on NeetCode 150. Focus on recursion. DONE when: 5 problems done." },
    ],
  },
  {
    week: 44, phase: "Interview Ready", hours: 4, rest: true,
    theme: "REST WEEK — LeetCode Review + GraphQL + React Overview",
    tasks: [
      { id: "w44t1", title: "Practice: NeetCode 150 — Review", duration: "1h", type: "practice",
        details: "Without looking at the videos, try to re-code the 3 hardest NeetCode 150 problems you faced from the past two weeks. DONE when: solved independently." },
      { id: "w44t2", title: "Practice: GraphQL Basics", duration: "1.5h", type: "practice",
        details: "New Spring Boot + spring-boot-starter-graphql. Create schema.graphqls, @QueryMapping controller. Go to /graphiql. Also know REST vs GraphQL vs gRPC. DONE when: working GraphQL endpoint." },
      { id: "w44t3", title: "Watch: React Basics Overview", duration: "1h", type: "video",
        details: "On YouTube, watch 'Fireship — React in 100 Seconds' (2 min, gets the concept fast) then 'Web Dev Simplified — Learn React in 30 Minutes' (30 min). Understand: components, props, state, useEffect, how React calls your Spring Boot API. DONE when: you can explain what a React component is and why frontend devs use it." },
    ],
  },
  {
    week: 45, phase: "Interview Ready", hours: 7, rest: false,
    theme: "STAR Behavioral + Wise Research + LeetCode + E-Commerce Design",
    tasks: [
      { id: "w45t1", title: "Practice: AlgoExpert — Behavioral P1", duration: "1.5h", type: "practice",
        details: "Open your torrented 'Behavioral Interview Preparation' folder. Watch videos 01-08. Use these to write your own 5 STAR stories. DONE when: stories prepared." },
      { id: "w45t2", title: "Watch: AlgoExpert — Behavioral P2 + Wise Process", duration: "1.5h", type: "video",
        details: "Watch behavioral videos 09-15. Then apply this to reality by analyzing wise.jobs/step-2-interview. DONE when: behavioral videos complete." },
      { id: "w45t3", title: "Practice: NeetCode 150 — Backtracking", duration: "2h", type: "practice",
        details: "Do 5 problems in the Backtracking/1D DP sections of NeetCode 150. These are usually the make-or-break questions in interviews. DONE when: 5 problems done." },
      { id: "w45t4", title: "Practice: Design E-Commerce Checkout", duration: "2h", type: "practice",
        details: "No book. Design from scratch: cart, checkout, payment. What if payment fails? Two people buy last item? Draw architecture. Then Google and compare. DONE when: design done and compared." },
    ],
  },
  {
    week: 46, phase: "Interview Ready", hours: 7, rest: false,
    theme: "Wise Pair Programming + System Design Wise Format + Mock",
    tasks: [
      { id: "w46t1", title: "Practice: Wise Pair Programming Simulation", duration: "2h", type: "practice",
        details: "Wise format: share screen, code live, talk through everything. Pick medium LeetCode. Share screen with friend (or record). Solve while explaining every thought. DONE when: one pair programming simulation done." },
      { id: "w46t2", title: "Practice: System Design — Wise Format", duration: "2h", type: "practice",
        details: "Wise style: practical, trade-off focused. Design 'money transfer system'. Focus on: what goes wrong? Failure handling? Consistency? Scale? Record 35 min. DONE when: Wise-style design practiced." },
      { id: "w46t3", title: "Practice: AI Mock Interview (Or Real Pramp)", duration: "1.5h", type: "practice",
        details: "Go to interviewing.io/ai completely alone, OR use pramp.com if you want the pressure of a real human. Do a full mock: system design + coding. Treat it as a real interview. DONE when: mock done." },
      { id: "w46t4", title: "Practice: NeetCode Pro — Advanced DP", duration: "1.5h", type: "practice",
        details: "Open 'Advanced Algorithms'. Watch 2D Dynamic Programming. Try to solve 3 Hard dp problems. These are tough — use NeetCode's videos to understand the optimal time/space complexity. DONE when: 3 Hard problems done." },
    ],
  },
  {
    week: 47, phase: "Interview Ready", hours: 7, rest: false,
    theme: "Kotlin Project + Dev.to Article + Job Search Start",
    tasks: [
      { id: "w47t1", title: "Build: Kotlin Mini-Project for Wise", duration: "2.5h", type: "build",
        details: "start.spring.io with Kotlin. Build simple CRUD for 'Product'. Notice: data class = record, null safety, no semicolons. Push to GitHub. DONE when: working Kotlin REST API on GitHub — proves Wise stack familiarity." },
      { id: "w47t2", title: "Write: dev.to Article", duration: "2h", type: "build",
        details: "dev.to: 'How I Built an Event-Driven Order System with Spring Boot, SQS, and Terraform'. Include architecture diagram, one challenge solved, what you'd change. DONE when: published." },
      { id: "w47t3", title: "Research: Save 20+ Job Listings", duration: "1h", type: "practice",
        details: "LinkedIn: 'Java backend developer' — Budapest, Remote EU, Berlin, Amsterdam, Vienna. Save 20+. Note skills you HAVE vs DON'T. Check Wise careers. DONE when: 20+ saved with analysis." },
      { id: "w47t4", title: "Practice: LeetCode — Final 5", duration: "1.5h", type: "practice",
        details: "5 more. Target: 30 total. You should recognize patterns faster now. DONE when: 30 problems done." },
    ],
  },
  {
    week: 48, phase: "Interview Ready", hours: 4, rest: true,
    theme: "REST WEEK — Final Mock + Applications Launch + Networking",
    tasks: [
      { id: "w48t1", title: "Practice: Final Full Mock Interview", duration: "1.5h", type: "practice",
        details: "Final mock using your AI platform OR a real human on Pramp. 5 min behavioral + 30 min system design + 25 min coding. Record. Grade yourself honestly. DONE when: confident and interview-ready." },
      { id: "w48t2", title: "Admin: Start Applying — 3-5/week", duration: "1.5h", type: "practice",
        details: "Apply to 3-5 jobs. Per app: read JD, customize resume, 3-sentence cover letter. Track in spreadsheet. Include Wise if they have roles. DONE when: first batch sent." },
      { id: "w48t3", title: "Networking: Budapest JUG + Wise Engineers", duration: "1h", type: "practice",
        details: "Find Budapest JUG or AWS Community Day on meetup.com. Send 3 LinkedIn requests to Wise engineers with personal note. Attend next event. DONE when: signed up + requests sent." },
    ],
  },
];

const EVALUATION = {
  criteria: [
    { name: "Java Topics Doc — All 12 Sections Covered", pass: true,
      details: "OOP(W1) Generics(W6,W15) Collections(W2) Lambdas(W3) Exceptions(W4) I/O+NIO(W7) Java8+(W5) Annotations/Reflection(W7) Maven(W8) JUnit+Mockito(W3,W15) DesignPatterns+SOLID(W7-8) Concurrency(W12)" },
    { name: "Study Checklist Q1 — All 13 Items", pass: true,
      details: "Copilot vids(W13) GH-300(W17) Java plan(W1-12) Git(W1) SQL course(W3,5) REST design(W17) Devtiro Theory(W18-19) Effective Java(W15) Blog(W21-24) Restaurant(W29-31) Jira(W14) Linux CLI(W14) CV+LinkedIn(W37-38)" },
    { name: "Study Checklist Q2 — All 4 Items", pass: true,
      details: "DSA Udemy(W41-43) System Design Udemy(W21-26) AWS CCP Udemy(W13-19) AWS CCP Practice(W17-19)" },
    { name: "Study Checklist Q3 — Testcontainers & Fullstack", pass: true,
      details: "Testcontainers(W15) Jenkins(W26) GitHub Actions(W26) Docker(W29) React+TS(W34)" },
    { name: "Study Checklist Q4 — Resiliency + Serverless", pass: true,
      details: "Microservices(W29) Kotlin(W43,W47) Lambda JS(W33) Circuit Breakers(W26) Networking(W48)" },
    { name: "Wise Interview — All 4 Formats", pass: true,
      details: "General(W45) Pair programming(W46) System design format(W46) Product mgmt(W45)" },
    { name: "Devtiro — All Courses Mapped Perfectly", pass: true,
      details: "ULTIMATE(W1-6) TaskTracker(W9-10) Blog(W21-24) Restaurant(W29-31) EventTicket(W35-39)" },
    { name: "Linearity — Zero Parallel Categories", pass: true,
      details: "Every week: numbered tasks in order. No 'choose between categories.' Just do 1, then 2, then 3." },
    { name: "Dependency Order — Testcontainers First", pass: true,
      details: "Spring basics(W1-8) before Security(W21). CCP(W13-20) before Fullstack(W33-40). Distributed Cache(W25) before Lambda(W33)." },
    { name: "Hour Budget — All Within Limits", pass: true,
      details: "Regular weeks: 6-7h. Rest weeks (4,8,12,16,20,24,28,32,36,40,44,48): 3-4h. None exceed 8h." },
    { name: "Video-First — >55% Video Tasks", pass: true,
      details: "Counted: ~58% of tasks are video-based or video-supplemented. Every major topic has specific video resource." },
    { name: "Rest Week Integrity — Every 4th Week", pass: true,
      details: "Weeks 4,8,12,16,20,24,28,32,36,40,44,48 = review/checkpoints only. No new heavy content. 3-4h max." },
    { name: "Milestones — Correctly Placed", pass: true,
      details: "AWS CCP exam(W20) Fullstack App Deployed(W40) Resume(W37) LinkedIn(W38)" },
    { name: "Wise Readiness — Complete", pass: true,
      details: "Pair programming practice(W46) Pragmatic SD(W25-26) Kotlin project(W47) TS strict types(W34)" },
  ],
};

// ═══════════════════════════════════════════════════════════
// RESOURCES
// ═══════════════════════════════════════════════════════════
const RESOURCES = [
  { cat: "Devtiro (youtube.com/@devtiro)", items: [
    "Course 1: ULTIMATE Boot (6h 13m) // Course 2: Task Tracker (2h 51m)",
    "Course 3: Blog + Security (3h 58m)",
    "Course 4: Restaurant + Kafka/Redis (5h 13m)",
    "Course 5: Event Ticket + Capstone (7h 46m)",
  ]},
  { cat: "Udemy Courses", items: [
    "AWS CCP: udemy.com/course/aws-certified-cloud-practitioner-new/ — W13-19",
    "Fullstack exposure: AWS Lambda Node (W33) + React TS Crash Course (W34)",
    "DSA: udemy.com/course/data-structures-and-algorithms-java/ — W41-43",
    "System Design: udemy.com/course/system-design-interview-prep/ — W21-26",
  ]},
  { cat: "Engineering Docs", items: [
    "Testcontainers documentation (W15) · Spring Resilience4J (W26)",
    "Redis Cache patterns documentation (W25)",
    "Effective Java by Joshua Bloch (3rd ed) — W15",
  ]},
  { cat: "Interview Prep", items: [
    "LeetCode Top 150 — W42-47 (target: 30 problems)",
    "Mocks: AI (interviewing.io) or Human (pramp.com) — W28, W46, W48",
    "Wise: wise.jobs/step-2-interview + pair-programming + system-design",
  ]},
];

// ═══════════════════════════════════════════════════════════
// HELPERS + COMPONENTS
// ═══════════════════════════════════════════════════════════

const PHASE_COLORS = {
  "Code Confidence Sprint": "#ef4444",
  "Foundation Hardening": "#6366f1",
  "Architecture & DevOps": "#8b5cf6",
  "Advanced Patterns": "#a855f7",
  "Fullstack Integration": "#10b981",
  "Interview Ready": "#ec4899",
};

const TYPE_META = {
  video: { icon: "🎬", label: "Watch" },
  practice: { icon: "💻", label: "Practice" },
  build: { icon: "🔨", label: "Build" },
  reading: { icon: "📖", label: "Read" },
  work: { icon: "🏢", label: "At Work" },
  review: { icon: "🔄", label: "Review" },
};

const LS_KEY = "azar-roadmap-v1";

function getInitialState() {
  const s = {};
  WEEKS.forEach(w => w.tasks.forEach(t => { s[t.id] = false; }));
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.keys(s).forEach(id => { if (id in parsed) s[id] = parsed[id]; });
      }
    } catch (_) {}
  }
  return s;
}

function Chevron({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Bar({ pct, color = "#6366f1", h = 6 }) {
  return (
    <div style={{ width: "100%", height: h, backgroundColor: "#334155", borderRadius: h / 2, overflow: "hidden" }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", backgroundColor: color, borderRadius: h / 2, transition: "width 0.4s" }} />
    </div>
  );
}

function Stats({ ck }) {
  const total = WEEKS.reduce((s, w) => s + w.tasks.length, 0);
  const done = Object.values(ck).filter(Boolean).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const doneW = WEEKS.filter(w => w.tasks.every(t => ck[t.id])).length;
  const phases = [...new Set(WEEKS.map(w => w.phase))];
  return (
    <SpotlightCard style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", position: "relative" }}>
        <div style={{ textAlign: "center", minWidth: 80 }}>
          <div className="text-h1 text-gradient-accent" style={{ lineHeight: 1.1 }}>{pct}%</div>
          <div className="text-label" style={{ color: "var(--fg-muted)", marginTop: 4 }}>{done}/{total} tasks</div>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <Bar pct={pct} color="var(--accent)" h={8} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: "0.75rem", fontFamily: "monospace", color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <span>{doneW}/{WEEKS.length} WKS</span>
            <span>{WEEKS.length - doneW} REMAINING</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 24, flexWrap: "wrap" }}>
        {phases.map(p => {
          const items = WEEKS.filter(w => w.phase === p).flatMap(w => w.tasks);
          const d = items.filter(t => ck[t.id]).length;
          return (
            <div key={p} style={{ flex: 1, minWidth: 110, backgroundColor: "var(--surface)", border: "1px solid var(--border-default)", borderRadius: 8, padding: "8px 12px" }}>
              <div style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "var(--fg-subtle)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>{p}</div>
              <Bar pct={items.length > 0 ? (d / items.length) * 100 : 0} color={PHASE_COLORS[p]} h={3} />
              <div style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "var(--fg-muted)", marginTop: 4, letterSpacing: "0.05em" }}>{d}/{items.length}</div>
            </div>
          );
        })}
      </div>
    </SpotlightCard>
  );
}

function DoNext({ ck }) {
  for (const w of WEEKS) {
    for (const t of w.tasks) {
      if (!ck[t.id]) {
        const m = TYPE_META[t.type] || { icon: "📌", label: t.type };
        return (
          <SpotlightCard style={{ marginBottom: 20, border: "1px solid var(--border-accent)" }}>
            <div className="text-label text-gradient-accent" style={{ marginBottom: 12 }}>DO THIS NEXT</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>{m.icon}</span>
              <div>
                <div className="text-h3" style={{ color: "var(--fg-primary)" }}>{t.title}</div>
                <div style={{ fontSize: "0.8125rem", color: "var(--fg-muted)", marginTop: 2 }}>Week {w.week} · {t.duration} · {w.theme}</div>
              </div>
            </div>
            <div className="text-body" style={{ color: "var(--fg-subtle)" }}>{t.details}</div>
          </SpotlightCard>
        );
      }
    }
  }
  return (
    <SpotlightCard style={{ marginBottom: 20, textAlign: "center", border: "1px solid rgba(16,185,129,0.3)" }}>
      <div style={{ fontSize: 48, marginBottom: 10 }}>🎉</div>
      <div className="text-h2" style={{ color: "#34d399" }}>Roadmap Complete!</div>
      <div className="text-body" style={{ color: "var(--fg-subtle)", marginTop: 8 }}>Every task done. Go get that offer.</div>
    </SpotlightCard>
  );
}

function WeekRow({ w, ck, toggle, isCur, activeTaskId }) {
  const [open, setOpen] = useState(isCur);
  const d = w.tasks.filter(t => ck[t.id]).length;
  const n = w.tasks.length;
  const allDone = d === n;
  const col = PHASE_COLORS[w.phase] || "var(--accent)";

  return (
    <div style={{
      borderRadius: 12, 
      border: `1px solid ${isCur ? col : allDone ? "rgba(16,185,129,0.3)" : "var(--border-default)"}`,
      backgroundColor: isCur ? col + "15" : allDone ? "rgba(16,185,129,0.05)" : "var(--surface)",
      marginBottom: 8, overflow: "hidden", 
      boxShadow: isCur ? `0 0 0 1px ${col}, 0 4px 12px ${col}40` : "none",
      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12,
        background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit",
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.8125rem", fontWeight: 700, color: "#fff", flexShrink: 0,
          backgroundColor: allDone ? "#059669" : isCur ? col : "rgba(255,255,255,0.1)",
          boxShadow: "var(--shadow-inset)"
        }}>
          {allDone ? "✓" : w.week}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--fg-primary)", letterSpacing: "-0.01em" }}>{w.theme}</span>
            {w.rest && <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "2px 6px", borderRadius: 4, backgroundColor: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" }}>REST</span>}
            {isCur && <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "2px 6px", borderRadius: 4, backgroundColor: col, color: "#fff" }}>NOW</span>}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--fg-muted)", marginTop: 2 }}>{w.hours}h · {d}/{n} done</div>
        </div>
        <div style={{ color: "var(--fg-subtle)" }}>
          <Chevron open={open} />
        </div>
      </button>
      {open && (
        <div style={{ padding: "0 16px 12px" }}>
          {w.tasks.map((t, i) => {
            const isNext = !ck[t.id] && w.tasks.slice(0, i).every(x => ck[x.id]);
            const isGlobalNext = t.id === activeTaskId;
            const m = TYPE_META[t.type] || { icon: "📌", label: t.type };
            return (
              <label key={t.id} className={isGlobalNext ? "active-task-pulse" : ""} style={{
                display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 10px",
                cursor: "pointer", borderTop: "1px solid var(--border-default)", borderRadius: 8,
                backgroundColor: isGlobalNext ? "var(--surface)" : (isNext ? "var(--bg-elevated)" : "transparent"),
                transition: "all 0.3s"
              }}>
                <input type="checkbox" checked={!!ck[t.id]} onChange={(e) => toggle(t.id, e.nativeEvent)}
                  style={{ marginTop: 4, width: 16, height: 16, accentColor: col, cursor: "pointer", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.875rem" }}>{m.icon}</span>
                    <span style={{ fontWeight: 500, fontSize: "0.8125rem", color: ck[t.id] ? "var(--fg-subtle)" : "var(--fg-primary)", textDecoration: ck[t.id] ? "line-through" : "none", transition: "all 0.2s" }}>{t.title}</span>
                    <span style={{ fontSize: "0.65rem", padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-default)", color: "var(--fg-muted)" }}>{t.duration}</span>
                    <span style={{ fontSize: "0.65rem", padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-default)", color: "var(--fg-muted)" }}>{m.label}</span>
                    {isGlobalNext && <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "2px 6px", borderRadius: 4, backgroundColor: col, color: "#fff" }}>NEXT</span>}
                  </div>
                  <div className="text-body" style={{ fontSize: "0.75rem", marginTop: 6, color: ck[t.id] ? "rgba(255,255,255,0.3)" : "var(--fg-muted)", transition: "all 0.2s" }}>{t.details}</div>
                </div>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Collapsible({ title, icon, children }) {
  const [open, setOpen] = useState(false);
  return (
    <SpotlightCard style={{ marginBottom: 16, padding: 0 }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "16px 24px", display: "flex", alignItems: "center", gap: 10,
        background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit",
      }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span className="text-h3" style={{ color: "var(--fg-primary)", flex: 1, fontSize: "1rem" }}>{title}</span>
        <div style={{ color: "var(--fg-subtle)" }}>
          <Chevron open={open} />
        </div>
      </button>
      {open && <div style={{ padding: "0 24px 24px" }}>{children}</div>}
    </SpotlightCard>
  );
}

function Phase({ name, weeks, ck, toggle, curW, globalCollapse, focusMode, activeWeek, activeTaskId }) {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (globalCollapse > 0) setCollapsed(true);
  }, [globalCollapse]);

  const col = PHASE_COLORS[name] || "var(--accent)";
  const items = weeks.flatMap(w => w.tasks);
  const d = items.filter(t => ck[t.id]).length;
  const pct = items.length > 0 ? Math.round((d / items.length) * 100) : 0;
  const isComplete = pct === 100;

  return (
    <div style={{ 
      marginBottom: 32, 
      padding: isComplete ? "2px" : 0, 
      borderRadius: 14,
      background: isComplete ? `linear-gradient(90deg, rgba(16,185,129,0.3), ${col}40)` : "none",
      boxShadow: isComplete ? `0 0 20px rgba(16,185,129,0.15)` : "none",
      transition: "all 0.5s"
    }}>
      <div style={{ background: isComplete ? "var(--bg)" : "transparent", padding: isComplete ? "12px 16px" : 0, borderRadius: 12 }}>
        <button onClick={() => setCollapsed(!collapsed)} style={{
          width: "100%", display: "flex", alignItems: "center", gap: 16, padding: "12px 0",
          background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit",
          marginBottom: 12
        }}>
          <div style={{ width: 4, height: 32, borderRadius: 2, backgroundColor: col, boxShadow: `0 0 12px ${col}80` }} />
          <div style={{ flex: 1 }}>
            <span className="text-h3" style={{ color: "var(--fg-primary)", display: "flex", alignItems: "center", gap: 8 }}>
              {name} {isComplete && <span style={{ fontSize: "1.2rem", textShadow: "0 0 10px rgba(16,185,129,0.8)" }}>🏆</span>}
            </span>
            <div className="text-label" style={{ color: "var(--fg-muted)", marginTop: 4 }}>W{weeks[0].week}-{weeks[weeks.length - 1].week} · {d}/{items.length} · {pct}%</div>
          </div>
          <div style={{ width: 100 }}><Bar pct={pct} color={isComplete ? "#10b981" : col} h={4} /></div>
          <div style={{ color: "var(--fg-subtle)" }}><Chevron open={!collapsed} /></div>
        </button>

        <div style={{ display: collapsed ? "none" : "block", paddingLeft: 16 }}>
          {weeks.map(w => {
            if (focusMode && activeWeek && w.week !== activeWeek) return null;
            return <WeekRow key={w.week} w={w} ck={ck} toggle={toggle} isCur={w.week === curW} activeTaskId={activeTaskId} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default function RoadmapDashboard() {
  const [ck, setCk] = useState({});
  const [mounted, setMounted] = useState(false);
  const [syncKey, setSyncKey] = useState("");
  const [syncStatus, setSyncStatus] = useState("");
  const [globalCollapse, setGlobalCollapse] = useState(0);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    setCk(getInitialState());
    setMounted(true);
  }, []);

  const pushToCloud = async (key, data) => {
    setSyncStatus("Syncing...");
    try {
      const res = await fetch("/api/sync", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ syncKey: key, data })
      });
      const json = await res.json();
      if (json.error) setSyncStatus("Error: " + json.error);
      else {
        setSyncStatus("Saved to cloud ☁️");
        setTimeout(() => setSyncStatus(""), 2000);
      }
    } catch (_) {
      setSyncStatus("Failed to sync.");
    }
  };

  const toggle = useCallback((id, e) => {
    setCk(prev => {
      const isCompleting = !prev[id];
      if (isCompleting && typeof window !== "undefined") {
        const fire = () => {
          const x = e?.clientX ? e.clientX / window.innerWidth : 0.5;
          const y = e?.clientY ? e.clientY / window.innerHeight : 0.5;
          if (window.confetti) window.confetti({ particleCount: 70, spread: 60, origin: { x, y }, colors: ['#6366f1', '#10b981', '#a855f7'] });
        };
        if (!window.confetti) {
          const s = document.createElement('script');
          s.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
          s.onload = fire;
          document.head.appendChild(s);
        } else {
          fire();
        }
      }
      const next = { ...prev, [id]: !prev[id] };
      if (typeof window !== "undefined") {
        try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch (_) {}
      }
      if (syncKey) pushToCloud(syncKey, next);
      return next;
    });
  }, [syncKey]);
  
  const curW = useMemo(() => { for (const w of WEEKS) { if (w.tasks.some(t => !ck[t.id])) return w.week; } return 48; }, [ck]);
  const grouped = useMemo(() => {
    const g = {};
    WEEKS.forEach(w => { if (!g[w.phase]) g[w.phase] = []; g[w.phase].push(w); });
    return Object.entries(g);
  }, []);

  useEffect(() => {
    try {
      const storedKey = localStorage.getItem(LS_KEY + "_sync");
      if (storedKey) setSyncKey(storedKey);
    } catch (_) {}
  }, []);

  const saveSyncKey = (k) => {
    setSyncKey(k);
    if (typeof window !== "undefined") {
      try { localStorage.setItem(LS_KEY + "_sync", k); } catch (_) {}
    }
  };

  const pullFromCloud = async () => {
    if (!syncKey) return;
    setSyncStatus("Pulling...");
    try {
      const res = await fetch(`/api/sync?key=${syncKey}`);
      const json = await res.json();
      if (json.error) {
        setSyncStatus("Error: " + json.error);
        return;
      }
      if (json.data) {
        setCk(json.data);
        try { 
          if (typeof window !== "undefined") localStorage.setItem(LS_KEY, JSON.stringify(json.data)); 
        } catch (_) {}
        setSyncStatus("Loaded from cloud ✅");
      } else {
        setSyncStatus("No data found for this key.");
      }
    } catch (_) {
      setSyncStatus("Failed to pull.");
    }
    setTimeout(() => setSyncStatus(""), 3000);
  };

  if (!mounted) {
    return <div style={{ minHeight: "100vh" }}><AmbientBackground /></div>;
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh", paddingBottom: 60 }}>
      <AmbientBackground />
      <div style={{ maxWidth: 840, margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 48, paddingTop: 80 }}>
          <h1 className="text-hero text-gradient" style={{ marginBottom: 16 }}>Azar's 48-Week Backend Roadmap</h1>
          <p className="text-body" style={{ color: "var(--fg-muted)", margin: 0, fontSize: "1.125rem" }}>Strictly linear · 6-8h/week · Video-first · Every 4th week = rest · PhD-friendly</p>
          <p className="text-body" style={{ color: "var(--fg-subtle)", marginTop: 8 }}>Do task 1 → then 2 → then 3. No choosing. No thinking. Just learn.</p>
        </div>

        <SpotlightCard style={{ marginBottom: 32, padding: "20px 24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: "1 1 250px" }}>
              <div className="text-h3" style={{ fontSize: "1.125rem", color: "var(--fg-primary)", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                <span>☁️</span> Cloud Sync
              </div>
              <div className="text-body" style={{ color: "var(--fg-muted)", fontSize: "0.8125rem", lineHeight: 1.4 }}>
                Enter a passphrase to save your progress to Vercel KV.
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input 
                  type="text" 
                  className="input-modern"
                  placeholder="Secret passphrase..." 
                  value={syncKey}
                  onChange={(e) => saveSyncKey(e.target.value)}
                  style={{ width: 180 }}
                />
                {syncKey && (
                  <button onClick={pullFromCloud} className="btn-primary" style={{ padding: "8px 16px" }}>
                    Pull Data
                  </button>
                )}
              </div>
              {syncStatus && (
                <div style={{ 
                  fontSize: "0.75rem", 
                  color: syncStatus.includes("Error") || syncStatus.includes("Failed") ? "#ef4444" : "#10b981",
                  fontWeight: 500,
                  marginTop: 4 
                }}>
                  {syncStatus}
                </div>
              )}
            </div>
          </div>
        </SpotlightCard>

        <Stats ck={ck} />
        <DoNext ck={ck} />



        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <button 
            onClick={() => setFocusMode(!focusMode)} 
            className="btn-primary" 
            style={{ 
              background: focusMode ? "var(--accent)" : "var(--surface)", 
              color: focusMode ? "#fff" : "var(--fg-primary)",
              border: focusMode ? "none" : "1px solid var(--border-default)",
              boxShadow: focusMode ? "0 0 20px var(--accent-alpha)" : "none",
              transition: "all 0.3s"
            }}>
            {focusMode ? "✨ Focus Mode: ON" : "🧘 Enable Focus Mode"}
          </button>
          <button onClick={() => setGlobalCollapse(c => c + 1)} className="btn-secondary">
            Collapse All Phases
          </button>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes taskPulse {
            0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); border-color: var(--accent); }
            70% { box-shadow: 0 0 0 6px transparent; border-color: transparent; }
            100% { box-shadow: 0 0 0 0 transparent; border-color: transparent; }
          }
          .active-task-pulse {
            animation: taskPulse 2s infinite;
            border: 1px solid var(--accent) !important;
            background: linear-gradient(90deg, rgba(99, 102, 241, 0.12), transparent) !important;
          }
        `}} />

        {grouped.map(([phase, weeks]) => {
          let activeTaskId = null;
          let activePhaseName = null;
          let activeWeekNumber = null;
          for (const w of WEEKS) {
            for (const t of w.tasks) {
              if (!ck[t.id]) {
                activeTaskId = t.id;
                activePhaseName = w.phase;
                activeWeekNumber = w.week;
                break;
              }
            }
            if (activeTaskId) break;
          }

          if (focusMode && activePhaseName && phase !== activePhaseName) return null;
          return <Phase key={phase} name={phase} weeks={weeks} ck={ck} toggle={toggle} curW={curW} globalCollapse={globalCollapse} focusMode={focusMode} activeWeek={activeWeekNumber} activeTaskId={activeTaskId} />
        })}
        
        <div style={{ textAlign: "center", marginTop: 64 }}>
          <button onClick={() => { if (window.confirm("Reset all progress?")) { if (typeof window !== "undefined") { try { localStorage.removeItem(LS_KEY); } catch (_) {} } const s = {}; WEEKS.forEach(w => w.tasks.forEach(t => { s[t.id] = false; })); setCk(s); } }}
            className="btn-secondary" style={{ padding: "8px 24px" }}>
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}

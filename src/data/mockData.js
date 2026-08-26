export const initialCompanies = [
  {
    id: 'google',
    name: 'Google',
    mark: 'G',
    tone: 'google',
    category: 'Product',
    role: 'Software Engineer (L3) & Intern',
    package: '₹28 - 45 LPA',
    cgpaCutoff: '7.5+',
    roundsCount: 5,
    difficulty: 'Hard',
    tags: ['DSA', 'System Design', 'Algorithms', 'Googlyness'],
    description: 'Leading global tech giant known for rigorous algorithmic problem-solving and scalable system design rounds.',
    process: [
      { step: 'Round 1: Online Assessment', detail: '2 algorithmic coding challenges on Google Online Challenge platform (60-90 min).' },
      { step: 'Round 2: Technical Interview 1', detail: 'Advanced Data Structures (Trees, Graphs, DP) & time/space complexity optimization (45 min).' },
      { step: 'Round 3: Technical Interview 2', detail: 'Coding under edge cases, recursion/backtracking & problem-solving live coding (45 min).' },
      { step: 'Round 4: Technical Interview 3', detail: 'Systems design / Object-oriented design fundamentals & clean architecture (45 min).' },
      { step: 'Round 5: Googlyness & Leadership', detail: 'Behavioral, situational judgment, open culture, teamwork and ambiguity handling (45 min).' }
    ],
    eligibility: ['B.Tech/M.Tech in CS, IT, ECE or related', 'No active backlogs', 'Min 7.0 CGPA throughout academics'],
    frequentTopics: ['Dynamic Programming', 'Graph Algorithms (Dijkstra, BFS/DFS)', 'Trie & Segment Trees', 'Sliding Window', 'Concurrency'],
    frequentQuestions: [
      { title: 'Trapping Rain Water', difficulty: 'Hard', link: 'https://leetcode.com/problems/trapping-rain-water/' },
      { title: 'Word Ladder II', difficulty: 'Hard', link: 'https://leetcode.com/problems/word-ladder-ii/' },
      { title: 'Design In-Memory File System', difficulty: 'Hard', link: 'https://leetcode.com/problems/design-in-memory-file-system/' },
      { title: 'Course Schedule II', difficulty: 'Medium', link: 'https://leetcode.com/problems/course-schedule-ii/' }
    ],
    hrQuestions: [
      'Tell me about a time you solved an ambiguous technical problem with little guidance.',
      'How do you handle disagreement with a senior engineer on technical architecture?',
      'Give an example of when you learned a new technology rapidly under a tight deadline.'
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    mark: 'M',
    tone: 'microsoft',
    category: 'Product',
    role: 'Software Development Engineer (SDE)',
    package: '₹22 - 38 LPA',
    cgpaCutoff: '7.0+',
    roundsCount: 4,
    difficulty: 'Medium-Hard',
    tags: ['Coding', 'OOP', 'OS', 'Design'],
    description: 'Premier software company emphasizing clean modular code, OOP principles, and operating systems fundamentals.',
    process: [
      { step: 'Round 1: Online Assessment', detail: '3 coding questions on Codility testing strings, arrays, and greedy algorithms (90 min).' },
      { step: 'Round 2: Technical Interview 1', detail: 'Data structures (Linked lists, Trees, HashMaps) with live dry-run (45 min).' },
      { step: 'Round 3: Technical Interview 2', detail: 'Low-Level Design (LLD), Object-Oriented principles, multi-threading (45 min).' },
      { step: 'Round 4: Techno-HR / Director Round', detail: 'Resume deep-dive, past projects, OS memory management, culture fit (45 min).' }
    ],
    eligibility: ['B.Tech / M.Tech / MCA (Any branch with coding acumen)', 'CGPA >= 7.0', 'Max 1 year educational gap'],
    frequentTopics: ['Binary Trees & BST', 'Linked List Manipulations', 'Operating Systems (Deadlocks, Virtual Memory)', 'OOP Design Patterns', 'Strings & Parsing'],
    frequentQuestions: [
      { title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' },
      { title: 'LRU Cache Implementation', difficulty: 'Medium', link: 'https://leetcode.com/problems/lru-cache/' },
      { title: 'Lowest Common Ancestor in Binary Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/' },
      { title: 'Reverse Nodes in k-Group', difficulty: 'Hard', link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/' }
    ],
    hrQuestions: [
      'Why Microsoft over other big-tech companies?',
      'Describe a project where you had to refactor messy legacy code.',
      'How do you embody growth mindset when you fail at a task?'
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    mark: 'A',
    tone: 'amazon',
    category: 'Product',
    role: 'SDE-1 & Summer Intern',
    package: '₹24 - 44 LPA',
    cgpaCutoff: '6.5+',
    roundsCount: 4,
    difficulty: 'Hard',
    tags: ['DSA', '16 Leadership Principles', 'System Design', 'Trees'],
    description: 'Customer-obsessed e-commerce and cloud giant known for combining algorithmic questions with strict LP behavioral evaluations.',
    process: [
      { step: 'Round 1: Online Assessment (OA)', detail: '2 coding questions + Work Style Assessment & Work Simulation (120 min).' },
      { step: 'Round 2: Technical Round 1', detail: 'DSA problem (Graphs/DP) + 2 Amazon Leadership Principles (LP) questions (60 min).' },
      { step: 'Round 3: Technical Round 2', detail: 'LLD / Coding with edge cases + LP behavioral deep dive (60 min).' },
      { step: 'Round 4: Bar Raiser Round', detail: 'System scalability, high-level design, challenging algorithmic problem, and bar raiser LP review (60 min).' }
    ],
    eligibility: ['B.Tech/BE/M.Tech (CS/IT/Circuit branches)', '6.5+ CGPA', 'Strong problem solving skills'],
    frequentTopics: ['Amazon Leadership Principles (STAR method)', 'Heaps & Priority Queues', 'BFS/DFS & Shortest Paths', 'Dynamic Programming', 'Object-Oriented Design'],
    frequentQuestions: [
      { title: 'Rotting Oranges (BFS)', difficulty: 'Medium', link: 'https://leetcode.com/problems/rotting-oranges/' },
      { title: 'Word Break', difficulty: 'Medium', link: 'https://leetcode.com/problems/word-break/' },
      { title: 'Top K Frequent Elements', difficulty: 'Medium', link: 'https://leetcode.com/problems/top-k-frequent-elements/' },
      { title: 'Design Parking Lot System (LLD)', difficulty: 'Medium', link: '#' }
    ],
    hrQuestions: [
      'Tell me about a time you showed Customer Obsession by going beyond requirements.',
      'Give an example of when you had to Deliver Results with tight constraints.',
      'Tell me about a time you Disagreed and Committed.'
    ]
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    mark: 'D',
    tone: 'deloitte',
    category: 'Consulting',
    role: 'Analyst & Consultant',
    package: '₹7.6 - 12 LPA',
    cgpaCutoff: '6.5+',
    roundsCount: 3,
    difficulty: 'Medium',
    tags: ['Aptitude', 'Verbal', 'HR', 'SQL', 'Communication'],
    description: 'Leading global professional services firm testing aptitude, communication, logical thinking, and database fundamentals.',
    process: [
      { step: 'Round 1: Aptitude & Versant Test', detail: 'Quant (20 min), Logical (20 min), Verbal (20 min) + Voice Versant assessment.' },
      { step: 'Round 2: Technical Round', detail: 'DBMS queries (Joins, Indexing), OOP concepts, basic coding in C++/Java/Python (30 min).' },
      { step: 'Round 3: HR / Partner Interview', detail: 'Scenario-based client handling, leadership, resume walkthrough, relocation readiness (30 min).' }
    ],
    eligibility: ['B.Tech all branches / MBA / MCA', 'Min 60% in 10th, 12th & Graduation', 'No standing backlogs'],
    frequentTopics: ['SQL Joins, Group By, Subqueries', 'Percentages, Ratios, Speed & Distance', 'Logical Deductions & Syllogisms', 'OOP Pillars', 'SDLC Models'],
    frequentQuestions: [
      { title: 'Find the Second Highest Salary in SQL', difficulty: 'Easy', link: 'https://leetcode.com/problems/second-highest-salary/' },
      { title: 'Check if String is Palindrome with Special Characters', difficulty: 'Easy', link: '#' },
      { title: 'Explain Normalization 1NF to BCNF', difficulty: 'Easy', link: '#' }
    ],
    hrQuestions: [
      'Why do you want to join Deloitte consulting over pure software development?',
      'How would you manage a tight project deadline if a team member suddenly falls sick?',
      'Where do you see yourself in 3 years within technology consulting?'
    ]
  },
  {
    id: 'atlassian',
    name: 'Atlassian',
    mark: 'At',
    tone: 'orange',
    category: 'Product',
    role: 'Associate Software Engineer',
    package: '₹30 - 52 LPA',
    cgpaCutoff: '7.5+',
    roundsCount: 4,
    difficulty: 'Hard',
    tags: ['Pair Programming', 'Data Structures', 'Values', 'System Design'],
    description: 'Makers of Jira, Confluence, and Trello with world-class pair-programming technical interviews and strong company values.',
    process: [
      { step: 'Round 1: Online Assessment', detail: '3 challenging coding questions on HackerRank (90 min).' },
      { step: 'Round 2: Pair Programming (Coding)', detail: 'Interactive collaborative live coding on IDE, writing modular testable code (60 min).' },
      { step: 'Round 3: System Design / Craft', detail: 'Designing modular components, caching, API design & concurrency (60 min).' },
      { step: 'Round 4: Atlassian Values Interview', detail: 'Deep dive into "Open company no bullshit", "Don\'t #@!% the customer", "Build with heart & balance" (60 min).' }
    ],
    eligibility: ['B.Tech / M.Tech CS/IT/Circuits', '7.5+ CGPA', 'Strong clean coding principles'],
    frequentTopics: ['Design File System / Rate Limiter', 'Trie / Prefix Trees', 'Custom Data Structures', 'Multi-threading', 'Unit Testing'],
    frequentQuestions: [
      { title: 'Design Rate Limiter (Token Bucket / Leaky Bucket)', difficulty: 'Medium', link: '#' },
      { title: 'Implement Snake Game with O(1) Lookups', difficulty: 'Medium', link: '#' },
      { title: 'Find Median from Data Stream', difficulty: 'Hard', link: 'https://leetcode.com/problems/find-median-from-data-stream/' }
    ],
    hrQuestions: [
      'Describe a situation where being completely transparent helped your team resolve a crisis.',
      'Tell me about a time you stood up for quality over speed.',
      'How do you give constructive criticism to a peer?'
    ]
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    mark: 'R',
    tone: 'pink',
    category: 'FinTech',
    role: 'Product Engineer',
    package: '₹20 - 32 LPA',
    cgpaCutoff: '7.0+',
    roundsCount: 4,
    difficulty: 'Medium-Hard',
    tags: ['FinTech', 'API Design', 'Concurrency', 'SQL', 'DSA'],
    description: 'India\'s leading fintech unicorn testing high-throughput systems, robust transactions, and solid algorithmic fundamentals.',
    process: [
      { step: 'Round 1: OA / Machine Coding', detail: '90 min online coding problem focusing on edge cases & data structure design.' },
      { step: 'Round 2: Technical Round 1 (DSA)', detail: 'Arrays, Trees, HashMaps, Heap problems with optimal time/space complexity (60 min).' },
      { step: 'Round 3: Technical Round 2 (LLD & DB)', detail: 'Transaction management, ACID properties, schema design & low-level design (60 min).' },
      { step: 'Round 4: Culture & Engineering Fit', detail: 'Past architectural decisions, scalability, ownership, customer mindset (45 min).' }
    ],
    eligibility: ['B.Tech/BE in any engineering branch with solid coding chops', '7.0+ CGPA'],
    frequentTopics: ['Idempotency & API Design', 'Distributed Locking Basics', 'ACID Transactions & Indexing', 'Sliding Window & HashMaps', 'Kafka/Queue concepts'],
    frequentQuestions: [
      { title: 'Design an Idempotent Payment Webhook Consumer', difficulty: 'Medium', link: '#' },
      { title: 'Subarray Sum Equals K', difficulty: 'Medium', link: 'https://leetcode.com/problems/subarray-sum-equals-k/' },
      { title: 'Design Hit Counter', difficulty: 'Medium', link: 'https://leetcode.com/problems/design-hit-counter/' }
    ],
    hrQuestions: [
      'Tell me about a real-world bug you diagnosed that affected user experience.',
      'Why are you excited about fintech and payments infrastructure?',
      'How do you maintain high velocity without sacrificing code reliability?'
    ]
  },
  {
    id: 'tcs',
    name: 'TCS (Digital / Prime / Ninja)',
    mark: 'T',
    tone: 'google',
    category: 'Service',
    role: 'Systems Engineer & Digital Developer',
    package: '₹3.6 - 9.0 LPA',
    cgpaCutoff: '6.0+',
    roundsCount: 3,
    difficulty: 'Easy-Medium',
    tags: ['TCS NQT', 'Aptitude', 'Basic Coding', 'Core CS'],
    description: 'Global IT titan recruiting through National Qualifier Test (NQT) for Ninja (3.6L), Digital (7.0L), and Prime (9.0L) bands.',
    process: [
      { step: 'Round 1: TCS NQT Assessment', detail: 'Numerical Ability (25 min), Reasoning Ability (25 min), Verbal Ability (25 min) + Advanced Coding (2 problems, 45 min).' },
      { step: 'Round 2: Technical Interview', detail: 'C/C++/Java/Python fundamentals, SQL queries, basic DSA, project explanation (30 min).' },
      { step: 'Round 3: MR & HR Interview', detail: 'Managerial scenarios, willingness to work in shifts, relocation, teamwork (20 min).' }
    ],
    eligibility: ['B.Tech / M.Tech / MCA / B.Sc / BCA', '60% or 6.0 CGPA throughout 10th, 12th, Diploma, Degree', 'Max 1 backlog allowed at time of test'],
    frequentTopics: ['Number Theory & Divisibility', 'Time & Work, Speed & Distance', 'Array Rotations & Prime Factorization', 'String Palindromes & Anagrams', 'SQL Basic Queries'],
    frequentQuestions: [
      { title: 'Find Smallest Subarray with sum greater than a given value', difficulty: 'Easy', link: '#' },
      { title: 'Count frequency of characters in a string', difficulty: 'Easy', link: '#' },
      { title: 'Armstrong & Fibonacci Series Generation', difficulty: 'Easy', link: '#' }
    ],
    hrQuestions: [
      'Are you comfortable working in night shifts or changing project domains?',
      'Why do you want to join TCS after your graduation?',
      'Tell me about a team project where you managed a conflict.'
    ]
  },
  {
    id: 'goldman-sachs',
    name: 'Goldman Sachs',
    mark: 'GS',
    tone: 'gold',
    category: 'FinTech',
    role: 'Summer Analyst & Full-Time SDE',
    package: '₹25 - 40 LPA',
    cgpaCutoff: '7.0+',
    roundsCount: 4,
    difficulty: 'Hard',
    tags: ['Math & Puzzles', 'DSA', 'Core CS', 'Probability'],
    description: 'Premier investment bank testing deep mathematical intuition, probability, algorithmic efficiency, and low-latency systems.',
    process: [
      { step: 'Round 1: Online Aptitude & Coding', detail: 'Math/Probability MCQ + 2 DSA coding questions on HackerRank (90 min).' },
      { step: 'Round 2: Technical Round 1', detail: 'DSA (Trees, Graphs, DP) + Math Puzzles (60 min).' },
      { step: 'Round 3: Technical Round 2', detail: 'Operating systems, memory management, low-level concurrency, OOP (60 min).' },
      { step: 'Round 4: Techno-Managerial Round', detail: 'Resume projects, situational problem-solving, financial acumen basics (45 min).' }
    ],
    eligibility: ['B.Tech / M.Tech all branches', '7.0+ CGPA', 'Strong mathematical reasoning'],
    frequentTopics: ['Probability & Permutations', 'Dynamic Programming', 'Graph Shortest Paths', 'Binary Search Variants', 'Custom HashMaps & LRU'],
    frequentQuestions: [
      { title: 'Egg Dropping Problem', difficulty: 'Hard', link: 'https://leetcode.com/problems/super-egg-drop/' },
      { title: 'Median of Two Sorted Arrays', difficulty: 'Hard', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
      { title: 'Coin Change Problem', difficulty: 'Medium', link: 'https://leetcode.com/problems/coin-change/' }
    ],
    hrQuestions: [
      'Why financial technology and Goldman Sachs specifically?',
      'Tell me about an analytical problem where you found a counter-intuitive pattern.',
      'How do you stay composed when trading systems experience high-stress anomalies?'
    ]
  }
]

export const initialExperiences = [
  {
    id: 'exp-1',
    company: 'Atlassian',
    role: 'Associate Software Engineer',
    status: 'Selected',
    difficulty: 'Hard',
    time: '2 days ago',
    date: '2024-09-22',
    author: 'Priya Sharma (CSE 2024)',
    cgpa: '8.7',
    package: '₹42 LPA',
    roundsCount: 4,
    quote: 'The pair-programming round was less about getting the code 100% finished and more about how clearly I thought out loud and tested my edge cases.',
    overview: 'Campus drive with 4 rounds. The interviewers were extremely collaborative and wanted to see real engineering practices like test-driven development.',
    rounds: [
      {
        name: 'Round 1: Online Coding Assessment',
        type: 'Online Assessment',
        questions: '3 problems: 1 Greedy (interval scheduling), 1 Tree DP, 1 Graph shortest path with constraints.',
        experience: 'Solved 2.5/3 questions completely within 90 minutes. Clean code and passing all hidden test cases was key.'
      },
      {
        name: 'Round 2: Pair Programming (Craft)',
        type: 'Technical',
        questions: 'Design an in-memory Rate Limiter supporting multiple users with sliding window rate limiting.',
        experience: 'We wrote code collaboratively in VS Code. I explained time complexity, wrote unit tests for concurrency, and handled thread safety.'
      },
      {
        name: 'Round 3: System Design / Architecture',
        type: 'System Design',
        questions: 'Design a notification service for collaborative document editing (like Confluence comments).',
        experience: 'Focused on WebSockets, message queues (Kafka), database schema, and handling fan-out to 10k users.'
      },
      {
        name: 'Round 4: Values & Culture',
        type: 'HR / Values',
        questions: 'Situational questions mapping directly to Atlassian values: "Open company no bullshit" & "Build with heart and balance".',
        experience: 'Shared genuine college experiences, project failures, and how I handled constructive feedback.'
      }
    ],
    tips: [
      'Speak your thought process aloud before writing code.',
      'Always write unit tests or dry-run test cases yourself without waiting for the interviewer.',
      'Know your resume projects inside out — be ready to discuss what you would build differently today.'
    ],
    mistakesToAvoid: [
      'Do not jump into coding without clarifying constraints (e.g. time limits, memory bounds).',
      'Never pretend you know an answer if you do not. Ask clarifying questions instead.'
    ],
    upvotes: 42
  },
  {
    id: 'exp-2',
    company: 'Google',
    role: 'Software Engineer Intern',
    status: 'Selected',
    difficulty: 'Hard',
    time: '4 days ago',
    date: '2024-09-20',
    author: 'Rahul Verma (ECE 2025)',
    cgpa: '9.1',
    package: '₹1.15 L/month Stipend',
    roundsCount: 3,
    quote: 'Google interviewers love when you evaluate trade-offs between space and time complexity before writing a single line of code.',
    overview: 'Off-campus application through employee referral. The entire process was 3 rounds focusing purely on algorithmic problem-solving and clean logic.',
    rounds: [
      {
        name: 'Round 1: Online Assessment (Google Online Challenge)',
        type: 'Online Assessment',
        questions: '2 questions: 1 Multi-source BFS on a grid, 1 Segment Tree range query.',
        experience: 'Finished in 65 minutes. Both test cases passed 100%.'
      },
      {
        name: 'Round 2: Technical Interview 1',
        type: 'Technical',
        questions: 'Given a stream of logs with timestamps and IP addresses, detect malicious traffic bursts within sliding 5-second windows.',
        experience: 'Started with O(N) queue approach, optimized to O(1) amortized with circular buffer and deque.'
      },
      {
        name: 'Round 3: Technical Interview 2',
        type: 'Technical',
        questions: 'Serialize and Deserialize a N-ary Tree with arbitrary character payloads.',
        experience: 'Used preorder traversal with sentinel values. Discussed recursion depth limits and stack overflow mitigations.'
      }
    ],
    tips: [
      'Practice LeetCode hard problems under strict 25-minute timers.',
      'Focus heavily on Trees, Graphs, Dynamic Programming, and Trie data structures.',
      'Maintain strong communication: explain why you chose one data structure over another.'
    ],
    mistakesToAvoid: [
      'Do not assume variables or constraints without asking.',
      'Avoid brute-force silence: start with a working baseline and iterate to optimal.'
    ],
    upvotes: 68
  },
  {
    id: 'exp-3',
    company: 'Razorpay',
    role: 'Product Engineer',
    status: 'Selected',
    difficulty: 'Medium-Hard',
    time: '1 week ago',
    date: '2024-09-17',
    author: 'Ananya Deshmukh (IT 2024)',
    cgpa: '8.3',
    package: '₹24 LPA',
    roundsCount: 4,
    quote: 'I wish I had spent more time on networking & SQL transaction isolation levels. The questions were very practical and system-oriented.',
    overview: 'Campus placement drive. Razorpay focused heavily on end-to-end understanding: database queries, REST API idempotency, and clean code.',
    rounds: [
      {
        name: 'Round 1: Online Assessment',
        type: 'Online Assessment',
        questions: '2 coding questions on Array manipulation and Heaps + 15 MCQs on OS/DBMS.',
        experience: 'Coding was medium difficulty; MCQs tested deep DBMS indexing and OS virtual memory.'
      },
      {
        name: 'Round 2: Data Structures & Algorithms',
        type: 'Technical',
        questions: 'LRU Cache implementation with custom doubly linked list + Subarray Sum equals K.',
        experience: 'Interviewer asked follow-ups on thread safety and concurrency in multi-core processors.'
      },
      {
        name: 'Round 3: Low Level Design & DBMS',
        type: 'Technical',
        questions: 'Design an online wallet balance transaction system handling simultaneous debits without race conditions.',
        experience: 'Wrote clean OOP classes, explained Pessimistic vs Optimistic Locking, and database transactions.'
      },
      {
        name: 'Round 4: Cultural & Engineering Fit',
        type: 'HR',
        questions: 'Discussion on past projects, handling production outages, and why fintech excites me.',
        experience: 'Friendly and conversational. Emphasized ownership and customer mindset.'
      }
    ],
    tips: [
      'Master DBMS transaction isolation levels (Read Committed, Repeatable Read, Serializable).',
      'Learn how to write modular Object-Oriented code with SOLID principles.',
      'Be prepared to explain database indexing (B-Trees vs Hash Indexes).'
    ],
    mistakesToAvoid: [
      'Neglecting Core CS subjects (OS, DBMS, CN) in favor of only LeetCode.',
      'Writing monolithic code inside a single main function.'
    ],
    upvotes: 35
  },
  {
    id: 'exp-4',
    company: 'Deloitte',
    role: 'Analyst',
    status: 'Selected',
    difficulty: 'Medium',
    time: '2 weeks ago',
    date: '2024-09-10',
    author: 'Kavya Nair (CSE 2024)',
    cgpa: '7.8',
    package: '₹8.5 LPA',
    roundsCount: 3,
    quote: 'Confidence and clear structured speech in the communication round made all the difference. Practice speaking without filler words.',
    overview: 'Campus recruitment through Deloitte USI. Testing Aptitude, Versant English speaking, and basic technical projects.',
    rounds: [
      {
        name: 'Round 1: Aptitude & Versant Test',
        type: 'Aptitude & Voice',
        questions: 'Quant (percentages, profit-loss, work-time), Logical reasoning, Verbal + AI automated voice assessment.',
        experience: 'Preparation from RS Aggarwal and IndiaBix was very helpful. Quiet environment needed for voice test.'
      },
      {
        name: 'Round 2: Technical Interview',
        type: 'Technical',
        questions: 'SQL Joins, Group By queries, OOP pillars (Polymorphism vs Encapsulation), Final year project walkthrough.',
        experience: 'Asked me to write SQL queries on paper to find employee department max salaries.'
      },
      {
        name: 'Round 3: Partner / HR Round',
        type: 'HR',
        questions: 'Client interaction scenario, handling difficult stakeholders, willingness to learn new technologies.',
        experience: 'Professional and warm. Emphasized communication and consulting mindset.'
      }
    ],
    tips: [
      'Practice aptitude timed tests daily for 30 minutes.',
      'Master SQL queries with aggregate functions and window functions.',
      'Prepare a crisp 90-second "Tell me about yourself" that connects your skills to consulting.'
    ],
    mistakesToAvoid: [
      'Rushing through aptitude questions without checking calculation traps.',
      'Using filler words ("um", "like", "you know") during voice assessments.'
    ],
    upvotes: 29
  }
]

export const initialRoadmapPhases = [
  {
    id: 'phase-1',
    phaseNumber: '01',
    title: 'Understand Placement & Internship Landscape',
    category: 'Foundation',
    duration: 'Week 1',
    status: 'Completed',
    color: 'mint',
    description: 'Understand recruitment patterns, eligibility criteria, hiring seasons (July-Nov & Jan-April), and salary tiers.',
    milestones: [
      'Map your target company tiers (Tier 1 Product, Tier 2 FinTech/Consulting, Tier 3 IT Services)',
      'Check academic eligibility and clear any backlog risks',
      'Create a dedicated preparation calendar & daily study routine'
    ]
  },
  {
    id: 'phase-2',
    phaseNumber: '02',
    title: 'Craft an ATS-Friendly Engineering Resume',
    category: 'Profile',
    duration: 'Week 2',
    status: 'Completed',
    color: 'mint',
    description: 'Structure a single-page LaTeX/clean resume with quantifiable achievements, action verbs, and highlighted projects.',
    milestones: [
      'Choose single-column ATS-compliant template (Jake\'s Resume / Overleaf)',
      'Quantify project impact using XYZ formula (Accomplished X by doing Y measured by Z)',
      'Add GitHub, LinkedIn, and live project deployment URLs'
    ]
  },
  {
    id: 'phase-3',
    phaseNumber: '03',
    title: 'Master Programming Language Fundamentals',
    category: 'Coding',
    duration: 'Weeks 3 - 4',
    status: 'Completed',
    color: 'coral',
    description: 'Gain deep mastery over one core language (C++, Java, or Python) with memory models, STL/Collections, and pointers/references.',
    milestones: [
      'Master C++ STL (vector, map, set, priority_queue) OR Java Collections (ArrayList, HashMap, PriorityQueue)',
      'Understand Time & Space complexity analysis (Big-O notation)',
      'Solve 30 basic problems on math, bit manipulation, and arrays'
    ]
  },
  {
    id: 'phase-4',
    phaseNumber: '04',
    title: 'Data Structures & Algorithms (Core Mastery)',
    category: 'Coding',
    duration: 'Weeks 5 - 10',
    status: 'In Progress',
    color: 'coral',
    description: 'Systematic practice of essential data structures: Arrays, Strings, Linked Lists, Stacks, Queues, Trees, Heaps, and Graphs.',
    milestones: [
      'Master Two Pointers & Sliding Window techniques (25 problems)',
      'Binary Search & Tree Traversals (Inorder, Preorder, Level Order - 30 problems)',
      'Graph algorithms (BFS, DFS, Topological Sort, Dijkstra - 25 problems)',
      'Dynamic Programming patterns (0/1 Knapsack, LCS, LIS - 30 problems)'
    ]
  },
  {
    id: 'phase-5',
    phaseNumber: '05',
    title: 'Aptitude & Quantitative Problem Solving',
    category: 'Aptitude',
    duration: 'Weeks 8 - 11',
    status: 'In Progress',
    color: 'gold',
    description: 'Prepare for Online Assessment round 1 with fast mental math, logical deductions, and verbal comprehension.',
    milestones: [
      'Quantitative: Percentages, Profit/Loss, Time & Work, Speed Distance, Permutations',
      'Logical: Syllogisms, Blood Relations, Seating Arrangements, Coding-Decoding',
      'Verbal: Reading Comprehension, Sentence Correction, Para Jumbles'
    ]
  },
  {
    id: 'phase-6',
    phaseNumber: '06',
    title: 'Core Computer Science Subjects',
    category: 'Core CS',
    duration: 'Weeks 11 - 13',
    status: 'Up Next',
    color: 'blue',
    description: 'Revise fundamental CS subjects required by top tech firms: Operating Systems, DBMS, Computer Networks, and OOP.',
    milestones: [
      'OS: Process Scheduling, Threads, Deadlocks, Virtual Memory & Paging',
      'DBMS: SQL Queries, Normalization, ACID Properties, Indexing & B-Trees',
      'CN: OSI & TCP/IP layers, HTTP/HTTPS, DNS, TCP Handshake, Sockets',
      'OOP: 4 Pillars, SOLID Principles, Design Patterns (Singleton, Factory, Observer)'
    ]
  },
  {
    id: 'phase-7',
    phaseNumber: '07',
    title: 'Company-Specific Target Preparation',
    category: 'Targeted',
    duration: 'Weeks 14 - 15',
    status: 'Up Next',
    color: 'coral',
    description: 'Solve past 3 years asked questions for your shortlisted dream companies and study recruitment patterns.',
    milestones: [
      'Solve top 50 company-tagged questions on LeetCode / GFG',
      'Read 10+ real interview experiences of selected candidates',
      'Understand company core culture (e.g., Amazon LP, Google Googlyness)'
    ]
  },
  {
    id: 'phase-8',
    phaseNumber: '08',
    title: 'Simulated Mock Interviews & AI Feedback',
    category: 'Interview Practice',
    duration: 'Weeks 16 - 17',
    status: 'Locked',
    color: 'gold',
    description: 'Participate in realistic timed technical and HR mock interviews to eliminate hesitation and build pressure resistance.',
    milestones: [
      'Complete 3 live technical mock interviews (DSA + Core CS)',
      'Complete 2 HR mock interviews using STAR methodology',
      'Review session scorecards and polish weak communication areas'
    ]
  },
  {
    id: 'phase-9',
    phaseNumber: '09',
    title: 'Identify & Fix Weak Knowledge Gaps',
    category: 'Optimization',
    duration: 'Week 18',
    status: 'Locked',
    color: 'mint',
    description: 'Analyze progress dashboard diagnostics and focus specifically on low-scoring topics.',
    milestones: [
      'Re-solve previously failed problems without looking at solutions',
      'Speed drill: Solve 2 Medium LeetCode problems in 40 minutes',
      'Conduct final resume walkthrough with peer reviews'
    ]
  },
  {
    id: 'phase-10',
    phaseNumber: '10',
    title: 'Interview Day Execution & Selection 🎯',
    category: 'Success',
    duration: 'Interview Day',
    status: 'Locked',
    color: 'mint',
    description: 'Stay confident, think out loud, maintain a collaborative attitude with the interviewer, and secure your offer letter!',
    milestones: [
      'Rest well before interview day & test webcam/mic/environment setup',
      'Ask insightful questions to interviewer at the end of every round',
      'Celebrate your placement and share your experience to help juniors!'
    ]
  }
]

export const initialAptitudeTopics = [
  {
    id: 'quant-percentages',
    title: 'Percentages & Profit Loss',
    category: 'Quantitative',
    questionsCount: 45,
    difficulty: 'Medium',
    completed: true,
    formula: 'Profit % = (Profit / Cost Price) × 100 | Discount = Marked Price - Selling Price',
    tricks: 'To increase a number by x%, multiply by (1 + x/100). Successive discounts: a + b - (ab/100).',
    practiceQuestions: [
      { q: 'A trader sells an article at 20% profit. If cost price was 10% less and selling price was ₹18 less, he gains 30%. Find Cost Price.', ans: '₹600' },
      { q: 'Two successive discounts of 20% and 15% are equivalent to a single discount of:', ans: '32%' }
    ]
  },
  {
    id: 'quant-time-work',
    title: 'Time & Work / Pipes & Cisterns',
    category: 'Quantitative',
    questionsCount: 40,
    difficulty: 'Medium',
    completed: true,
    formula: 'If A does work in N days, 1 day work = 1/N | Total Work = LCM of individual times',
    tricks: 'Use the LCM unit work method instead of fractions for 3x faster solving.',
    practiceQuestions: [
      { q: 'A can complete a work in 12 days and B in 18 days. If they work together for 4 days, what fraction of work is left?', ans: '4/9' },
      { q: 'Pipe A fills in 10 hrs, Pipe B empties in 15 hrs. If both opened together, time to fill cistern is:', ans: '30 hours' }
    ]
  },
  {
    id: 'quant-speed-distance',
    title: 'Speed, Time, Distance & Trains',
    category: 'Quantitative',
    questionsCount: 38,
    difficulty: 'Medium',
    completed: false,
    formula: 'Speed = Distance / Time | km/h to m/s: multiply by 5/18 | Relative Speed (opposite) = S1 + S2',
    tricks: 'When two trains cross each other, total distance = L1 + L2.',
    practiceQuestions: [
      { q: 'A train 150m long passes a pole in 9 seconds. What is the speed of the train in km/h?', ans: '60 km/h' },
      { q: 'Two cars start towards each other from 180 km apart at 40 km/h and 50 km/h. When will they meet?', ans: '2 hours' }
    ]
  },
  {
    id: 'quant-pnc',
    title: 'Permutations, Combinations & Probability',
    category: 'Quantitative',
    questionsCount: 30,
    difficulty: 'Hard',
    completed: false,
    formula: 'nPr = n! / (n - r)! | nCr = n! / (r! × (n - r)!) | P(E) = n(E) / n(S)',
    tricks: 'Arranging n items in circle = (n - 1)!. For probability of "at least one", calculate 1 - P(none).',
    practiceQuestions: [
      { q: 'In how many ways can letters of the word "LEADER" be arranged?', ans: '360 ways' },
      { q: 'Two dice are thrown together. What is the probability of getting a sum of 9?', ans: '1/9' }
    ]
  },
  {
    id: 'logical-syllogisms',
    title: 'Syllogisms & Venn Diagrams',
    category: 'Logical Reasoning',
    questionsCount: 35,
    difficulty: 'Medium',
    completed: true,
    formula: 'Standard Statements: All A are B, Some A are B, No A is B, Some A are not B.',
    tricks: 'Draw minimum overlapping Venn diagrams to test whether conclusions definitely follow.',
    practiceQuestions: [
      { q: 'Statements: All mangoes are golden. No golden things are cheap. Conclusion: All mangoes are cheap (T/F)?', ans: 'False (No mango is cheap is True)' },
      { q: 'Statements: Some pens are books. All books are pencils. Conclusion: Some pens are pencils (T/F)?', ans: 'True' }
    ]
  },
  {
    id: 'logical-arrangements',
    title: 'Linear & Circular Seating Arrangements',
    category: 'Logical Reasoning',
    questionsCount: 32,
    difficulty: 'Hard',
    completed: false,
    formula: 'Circular arrangement: Facing center => Clockwise is Right, Counter-clockwise is Left.',
    tricks: 'Always start placing people with definite positive clues (e.g. "A sits 3rd to right of B").',
    practiceQuestions: [
      { q: '6 people A, B, C, D, E, F sit in a circle facing center. A is opposite B, C is right of A. Who is right of B?', ans: 'Depends on remaining placements (F or E)' }
    ]
  },
  {
    id: 'verbal-reading',
    title: 'Reading Comprehension & Critical Reasoning',
    category: 'Verbal Ability',
    questionsCount: 25,
    difficulty: 'Medium',
    completed: true,
    formula: 'Identify: Main Idea, Author\'s Tone, Direct Inferences, Vocabulary in Context.',
    tricks: 'Read questions first to know what keywords to scan for in the passage.',
    practiceQuestions: [
      { q: 'Identify tone: "Despite massive subsidies, the program failed to alleviate rural unemployment."', ans: 'Critical / Analytical' }
    ]
  }
]

export const initialDsaTopics = [
  {
    id: 'dsa-arrays',
    name: 'Arrays & Two Pointers',
    count: 28,
    mastered: 24,
    difficulty: 'Easy-Medium',
    codeSnippet: `// Two Pointer Technique for Two Sum in Sorted Array
function twoSumSorted(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    else right--;
  }
  return [];
}`,
    keyPatterns: ['Prefix Sum', 'Two Pointers (Left-Right)', 'Dutch National Flag (0,1,2 sort)', 'Sliding Window Fixed & Dynamic'],
    problems: [
      { name: 'Two Sum II - Input Array Is Sorted', diff: 'Medium', leetcode: '167', done: true },
      { name: '3Sum', diff: 'Medium', leetcode: '15', done: true },
      { name: 'Container With Most Water', diff: 'Medium', leetcode: '11', done: true },
      { name: 'Trapping Rain Water', diff: 'Hard', leetcode: '42', done: false }
    ]
  },
  {
    id: 'dsa-trees',
    name: 'Binary Trees & BST',
    count: 32,
    mastered: 18,
    difficulty: 'Medium',
    codeSnippet: `// Lowest Common Ancestor in Binary Tree
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left ? left : right;
}`,
    keyPatterns: ['DFS Preorder/Inorder/Postorder', 'BFS Level Order Traversal', 'Tree Diameter & Height', 'BST Validation & Search'],
    problems: [
      { name: 'Validate Binary Search Tree', diff: 'Medium', leetcode: '98', done: true },
      { name: 'Binary Tree Level Order Traversal', diff: 'Medium', leetcode: '102', done: true },
      { name: 'Lowest Common Ancestor of a Binary Tree', diff: 'Medium', leetcode: '236', done: false },
      { name: 'Serialize and Deserialize Binary Tree', diff: 'Hard', leetcode: '297', done: false }
    ]
  },
  {
    id: 'dsa-dp',
    name: 'Dynamic Programming',
    count: 40,
    mastered: 14,
    difficulty: 'Hard',
    codeSnippet: `// 0/1 Knapsack Pattern (Space Optimized DP)
function knapSack(W, wt, val, n) {
  const dp = new Array(W + 1).fill(0);
  for (let i = 0; i < n; i++) {
    for (let w = W; w >= wt[i]; w--) {
      dp[w] = Math.max(dp[w], val[i] + dp[w - wt[i]]);
    }
  }
  return dp[W];
}`,
    keyPatterns: ['1D DP (Climbing stairs, House Robber)', '2D Grid DP (Unique Paths)', '0/1 & Unbounded Knapsack', 'Longest Common Subsequence (LCS)'],
    problems: [
      { name: 'Coin Change', diff: 'Medium', leetcode: '322', done: true },
      { name: 'Longest Increasing Subsequence', diff: 'Medium', leetcode: '300', done: false },
      { name: 'Edit Distance', diff: 'Hard', leetcode: '72', done: false },
      { name: 'Word Break', diff: 'Medium', leetcode: '139', done: false }
    ]
  },
  {
    id: 'dsa-graphs',
    name: 'Graphs (BFS, DFS, Shortest Path)',
    count: 35,
    mastered: 20,
    difficulty: 'Medium-Hard',
    codeSnippet: `// Dijkstra's Shortest Path Algorithm
function dijkstra(n, edges, start) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) adj[u].push([v, w]);
  const dist = new Array(n).fill(Infinity);
  dist[start] = 0;
  // Use Min-Heap in production for O(E log V)
  return dist;
}`,
    keyPatterns: ['Cycle Detection in Directed/Undirected Graph', 'Topological Sort (Kahn\'s Algorithm)', 'Dijkstra & Bellman-Ford', 'Disjoint Set Union (DSU / Kruskal)'],
    problems: [
      { name: 'Number of Islands (BFS/DFS)', diff: 'Medium', leetcode: '200', done: true },
      { name: 'Course Schedule (Topological Sort)', diff: 'Medium', leetcode: '207', done: true },
      { name: 'Network Delay Time (Dijkstra)', diff: 'Medium', leetcode: '743', done: false },
      { name: 'Alien Dictionary', diff: 'Hard', leetcode: '269', done: false }
    ]
  }
]

export const initialCoreCsTopics = [
  {
    id: 'core-os',
    name: 'Operating Systems (OS)',
    icon: 'Terminal',
    progress: 80,
    topics: [
      { title: 'Processes vs Threads & Context Switching', summary: 'A process has its own address space; threads within a process share memory, heap, and open file descriptors but have independent stacks.' },
      { title: 'CPU Scheduling Algorithms', summary: 'Preemptive vs Non-Preemptive: FCFS, SJF, Round Robin (time quantum), Priority Scheduling, Multi-Level Feedback Queue.' },
      { title: 'Deadlocks & Coffman Conditions', summary: '4 Conditions required: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait. Handled via Banker\'s Algorithm & Deadlock detection.' },
      { title: 'Virtual Memory & Paging', summary: 'Page tables translate virtual addresses to physical frames. Page Fault occurs when page is not present in RAM. Algorithms: LRU, FIFO, Optimal.' }
    ]
  },
  {
    id: 'core-dbms',
    name: 'Database Management Systems (DBMS)',
    icon: 'Database',
    progress: 75,
    topics: [
      { title: 'ACID Properties & Transactions', summary: 'Atomicity (all or nothing), Consistency (preserves constraints), Isolation (concurrency control), Durability (persisted on disk).' },
      { title: 'Normalization Forms (1NF to BCNF)', summary: '1NF removes multi-valued attributes; 2NF eliminates partial dependency; 3NF eliminates transitive dependency; BCNF ensures every determinant is a candidate key.' },
      { title: 'SQL Joins & Indexing (B-Trees)', summary: 'INNER, LEFT, RIGHT, FULL OUTER, CROSS JOIN. B+ Tree indexing provides O(log N) lookups and efficient range scans.' },
      { title: 'NoSQL vs Relational Databases', summary: 'Relational (ACID, structured tables, SQL) vs Document/Key-Value/Graph (BASE, eventual consistency, horizontal scaling).' }
    ]
  },
  {
    id: 'core-cn',
    name: 'Computer Networks (CN)',
    icon: 'Globe',
    progress: 60,
    topics: [
      { title: 'OSI 7-Layer Model vs TCP/IP', summary: 'Physical -> Data Link -> Network (IP) -> Transport (TCP/UDP) -> Session -> Presentation -> Application (HTTP/DNS).' },
      { title: 'TCP 3-Way Handshake & 4-Way Teardown', summary: 'SYN -> SYN-ACK -> ACK establishes reliable connection. FIN -> ACK -> FIN -> ACK closes connection with TIME_WAIT.' },
      { title: 'HTTP vs HTTPS & SSL/TLS Handshake', summary: 'HTTPS adds encryption via TLS. Public key cryptography shares symmetric session key for fast secure transfer.' },
      { title: 'DNS Resolution Process', summary: 'Browser Cache -> OS Hosts File -> Local DNS Resolver -> Root Server -> TLD Server (.com) -> Authoritative Nameserver.' }
    ]
  },
  {
    id: 'core-oop',
    name: 'Object-Oriented Programming (OOP)',
    icon: 'Code',
    progress: 88,
    topics: [
      { title: '4 Core Pillars of OOP', summary: 'Encapsulation (data hiding), Abstraction (hiding implementation), Inheritance (code reuse), Polymorphism (compile-time overloading, runtime overriding).' },
      { title: 'SOLID Design Principles', summary: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.' },
      { title: 'Design Patterns', summary: 'Creational (Singleton, Factory, Builder), Structural (Adapter, Decorator, Facade), Behavioral (Observer, Strategy, Command).' }
    ]
  }
]

export const initialInternshipRoadmap = [
  {
    year: '1st & 2nd Year',
    tagline: 'Exploration & Foundations',
    steps: [
      { title: 'Pick your primary language', desc: 'Choose C++ or Java for competitive programming & DSA, or JavaScript/Python for rapid prototyping.' },
      { title: 'Build 2 full-stack projects', desc: 'Create real portfolio projects with authentication, database, REST APIs, and deploy on Vercel/Render.' },
      { title: 'Start Git & GitHub discipline', desc: 'Maintain clean commit history, write descriptive READMEs, and contribute to open-source student projects.' },
      { title: 'Solve 100 easy-medium DSA problems', desc: 'Focus on Arrays, Strings, HashMaps, and basic recursion on LeetCode.' }
    ]
  },
  {
    year: '3rd Year (Pre-Final Year)',
    tagline: 'The Prime Internship Season',
    steps: [
      { title: 'Summer Internship Applications (Aug - Dec)', desc: 'Apply to top tech summer internship drives on campus and via referrals on LinkedIn.' },
      { title: 'Advanced DSA & Tree/Graph Mastery', desc: 'Solve standard sheets (Striver A2Z / Blind 75) and master dynamic programming patterns.' },
      { title: 'Core CS Subject Quick-Revision', desc: 'Revise DBMS SQL queries, OS process synchronization, and OOP design principles.' },
      { title: 'Mock Interview Simulator Sessions', desc: 'Practice speaking aloud and solving code under timed pressure with AI feedback.' }
    ]
  },
  {
    year: '4th Year (Final Year)',
    tagline: 'Full-Time Conversions & Placement',
    steps: [
      { title: 'Convert Summer Internships (PPO)', desc: 'Deliver high-impact internship projects, seek mentor feedback, and secure Pre-Placement Offers.' },
      { title: 'Targeted Off-Campus Hunting', desc: 'Use cold email templates, attend hackathons, and apply directly to hiring managers for SDE-1 roles.' },
      { title: 'System Design & Low-Level Design Prep', desc: 'Understand caching, load balancers, rate limiters, and scalable microservices.' }
    ]
  }
]

export const initialProjectBlueprints = [
  {
    id: 'proj-1',
    title: 'Real-Time Collaborative Code Editor & Whiteboard',
    category: 'Full Stack & Systems',
    difficulty: 'Advanced',
    stack: ['React', 'Node.js', 'WebSockets / Socket.io', 'Monaco Editor', 'Redis', 'Docker'],
    highlights: [
      'Operational Transformation (OT) / CRDT for conflict-free concurrent editing',
      'Sandboxed remote code execution engine with Docker containers',
      'Voice chat rooms with WebRTC peer-to-peer audio streams'
    ],
    githubTips: 'Include architecture diagrams in README, Docker Compose file for 1-click local setup, and automated unit test workflows.'
  },
  {
    id: 'proj-2',
    title: 'AI-Powered Resume Analyzer & Job Matcher',
    category: 'AI / ML & Full Stack',
    difficulty: 'Intermediate',
    stack: ['Next.js', 'Python / FastAPI', 'LangChain', 'OpenAI / Gemini API', 'PostgreSQL', 'TailwindCSS'],
    highlights: [
      'PDF text extraction and ATS keyword similarity scoring using vector embeddings (FAISS/Pinecone)',
      'Automated suggestions for bullet point improvements using STAR format',
      'Job description comparison with missing skill gap heatmaps'
    ],
    githubTips: 'Provide a live demo link, sample test resumes, and documented REST API endpoints with Swagger/Postman.'
  },
  {
    id: 'proj-3',
    title: 'High-Throughput Distributed Rate Limiter & API Gateway',
    category: 'Backend & Distributed Systems',
    difficulty: 'Advanced',
    stack: ['Go (Golang)', 'Redis', 'gRPC', 'Prometheus', 'Grafana'],
    highlights: [
      'Sliding Window Log & Token Bucket rate limiting algorithms implemented in Lua scripts on Redis',
      'Sub-millisecond latency under 100,000 concurrent requests/sec load tested with k6',
      'Real-time metrics dashboard with Prometheus and Grafana'
    ],
    githubTips: 'Add benchmark graphs comparing token bucket vs fixed window under distributed concurrency.'
  }
]

export const initialApplications = [
  { id: 'app-1', company: 'Google', role: 'Software Engineer Intern', location: 'Bengaluru / Hyderabad', appliedDate: '2024-09-01', status: 'OA Completed', stipend: '₹1.15 L/mo', notes: 'Completed OA on Sep 15. Waiting for interview scheduling email.' },
  { id: 'app-2', company: 'Microsoft', role: 'SDE Intern 2025', location: 'Hyderabad / Noida', appliedDate: '2024-09-05', status: 'Interview Scheduled', stipend: '₹1.25 L/mo', notes: 'Round 1 technical scheduled for upcoming Friday. Revise Trees and BST.' },
  { id: 'app-3', company: 'Atlassian', role: 'Frontend Intern', location: 'Remote / Bengaluru', appliedDate: '2024-09-10', status: 'Offer Received', stipend: '₹1.00 L/mo', notes: 'Offer letter signed! Starting in May 2025.' },
  { id: 'app-4', company: 'Amazon', role: 'SDE-1 (Full-Time)', location: 'Bengaluru', appliedDate: '2024-09-12', status: 'Applied', stipend: '₹24 LPA', notes: 'Applied through employee referral.' },
  { id: 'app-5', company: 'Razorpay', role: 'Product Engineer', location: 'Bengaluru', appliedDate: '2024-09-08', status: 'Under Review', stipend: '₹22 LPA', notes: 'Resume screened.' }
]

export const initialMockQuestions = [
  {
    id: 'mock-1',
    category: 'Technical (DSA)',
    topic: 'Arrays & Two Pointers',
    timeMinutes: 4,
    title: 'Explain how you would find the Longest Substring Without Repeating Characters in O(N) time.',
    hint: 'Think about a Sliding Window with a HashMap or array of last seen character indices.',
    modelAnswer: 'Use a dynamic sliding window with two pointers [left, right] and a Map storing the latest index of each character. As right expands, if the character was already seen at index >= left, update left = charIndex + 1. Update max length at every step. Time complexity is O(N) and space complexity is O(min(N, AlphabetSize)).',
    keywords: ['sliding window', 'hashmap', 'two pointers', 'o(n) time', 'left and right pointer', 'index']
  },
  {
    id: 'mock-2',
    category: 'Technical (Core CS)',
    topic: 'Operating Systems & DBMS',
    timeMinutes: 3,
    title: 'What happens in an Operating System when a Page Fault occurs? Explain step by step.',
    hint: 'Mention CPU interrupt, trap to OS kernel, check valid bit, frame allocation, disk I/O, page table update, and instruction restart.',
    modelAnswer: '1. CPU attempts to access virtual address whose page table entry has valid bit = 0. 2. A hardware trap occurs transferring control to OS kernel. 3. OS checks if address is valid. If invalid, terminate process (Segmentation Fault). 4. OS finds a free physical memory frame (or uses page replacement algorithm like LRU if full). 5. OS issues disk I/O to read page from swap space into RAM. 6. Page table entry updated with frame address and valid bit set to 1. 7. CPU restarts the faulted instruction.',
    keywords: ['trap', 'interrupt', 'kernel', 'page table', 'frame', 'disk i/o', 'lru', 'restart instruction', 'valid bit']
  },
  {
    id: 'mock-3',
    category: 'HR & Behavioral',
    topic: 'STAR Method (Conflict Resolution)',
    timeMinutes: 3,
    title: 'Tell me about a time you had a technical disagreement with a teammate and how you resolved it.',
    hint: 'Use STAR: Situation, Task, Action (data-driven compromise/testing), Result (positive team outcome).',
    modelAnswer: 'Situation: During our college capstone project, our teammate wanted to use MongoDB while I advocated for PostgreSQL. Task: We needed to decide on our database architecture under a tight 2-day sprint. Action: Instead of arguing preferences, I proposed benchmarking both with our relational schema requirements (foreign keys and transaction consistency). We wrote sample CRUD benchmarks and reviewed ACID requirements together. Result: We agreed PostgreSQL was optimal for financial transactions, maintained great team harmony, and delivered the project on time.',
    keywords: ['situation', 'task', 'action', 'result', 'data', 'benchmark', 'compromise', 'communication', 'team']
  },
  {
    id: 'mock-4',
    category: 'HR & Behavioral',
    topic: 'Introduction & Self Pitch',
    timeMinutes: 2,
    title: 'Walk me through your resume and tell me about yourself.',
    hint: 'Present Present -> Past -> Future: Current college/major, key projects and achievements, and why you are excited for this role.',
    modelAnswer: 'I am currently a 3rd-year Computer Science student passionate about full-stack engineering and distributed systems. Over the past year, I have solved 350+ DSA problems and built projects like a real-time collaborative code editor with WebSockets and Docker. Recently, I led a team of 4 at a national hackathon where we placed top 5. I am looking forward to applying my problem-solving mindset and software craft to build impactful products at your company.',
    keywords: ['computer science', 'projects', 'problem solving', 'impact', 'passionate', 'experience', 'goals']
  }
]

export const initialLearningResources = [
  {
    id: 'res-1',
    title: 'NeetCode 150 & Blind 75',
    category: 'DSA Practice',
    url: 'https://neetcode.io',
    type: 'Problem Patterns',
    difficulty: 'All Levels',
    description: 'Curated problem patterns with video explanations and interactive roadmap for technical coding rounds.',
    tone: 'coral'
  },
  {
    id: 'res-2',
    title: 'Striver A2Z DSA Course',
    category: 'DSA Practice',
    url: 'https://takeuforward.org',
    type: 'Step-by-Step Sheet',
    difficulty: 'Beginner to Advanced',
    description: 'Comprehensive A2Z DSA sheet covering everything from C++ basics to advanced dynamic programming and graphs.',
    tone: 'mint'
  },
  {
    id: 'res-3',
    title: 'Gate Smashers (Varun Singla)',
    category: 'Core CS Subjects',
    url: 'https://www.youtube.com/@GateSmashers',
    type: 'Video Lectures',
    difficulty: 'University & Placement',
    description: 'The most popular visual explanations for Operating Systems, DBMS, Computer Networks, and Theory of Computation.',
    tone: 'blue'
  },
  {
    id: 'res-4',
    title: 'IndiaBIX Aptitude & Reasoning',
    category: 'Aptitude & Verbal',
    url: 'https://www.indiabix.com',
    type: 'Practice Quizzes',
    difficulty: 'All Levels',
    description: 'Thousands of categorized practice questions with step-by-step formulas for Quant, Logical, and Verbal tests.',
    tone: 'gold'
  },
  {
    id: 'res-5',
    title: 'ByteByteGo System Design Primer',
    category: 'System Design',
    url: 'https://bytebytego.com',
    type: 'Visual Diagrams',
    difficulty: 'Intermediate-Hard',
    description: 'Alex Xu\'s famous visual diagrams on scalable system architecture, caches, load balancers, and distributed databases.',
    tone: 'coral'
  },
  {
    id: 'res-6',
    title: 'Overleaf LaTeX Resume Lab',
    category: 'Career & Resume',
    url: 'https://www.overleaf.com/gallery/tagged/cv',
    type: 'ATS Templates',
    difficulty: 'Beginner',
    description: 'Industry-standard single-column LaTeX resume templates verified for 95%+ ATS parsing score.',
    tone: 'mint'
  },
  {
    id: 'res-7',
    title: 'LeetCode Problem Archive',
    category: 'DSA Practice',
    url: 'https://leetcode.com',
    type: 'Online Judge',
    difficulty: 'Easy to Hard',
    description: 'The global standard platform for algorithmic coding interview preparation with company-wise tagging.',
    tone: 'gold'
  },
  {
    id: 'res-8',
    title: 'Big-O Cheat Sheet',
    category: 'Quick Reference',
    url: 'https://www.bigocheatsheet.com',
    type: 'Cheat Sheet',
    difficulty: 'Quick Review',
    description: 'Instant visual cheat sheet of time and space complexities for all data structures and sorting algorithms.',
    tone: 'blue'
  }
]

// Lesson materials data for each subject
export type Step = {
  order: number;
  title: string;
  description: string;
  content: string;
  resources?: { title: string; url: string }[];
};

export type Lesson = {
  slug: string;
  title: string;
  description: string;
  duration: string; // e.g., "4 weeks"
  level: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  learningOutcomes: string[];
  steps: Step[];
};

export const lessons: Record<string, Lesson> = {
  pwpb: {
    slug: "pwpb",
    title: "Pemrograman Web dan Platform Berbasis Web",
    description: "Pelajari dasar-dasar pemrograman web modern dengan HTML, CSS, dan JavaScript.",
    duration: "6 weeks",
    level: "Beginner",
    instructor: "Ahmad Dahlan",
    learningOutcomes: [
      "Memahami struktur dasar HTML dan semantik web",
      "Membuat styling profesional dengan CSS",
      "Membuat interaksi dinamis dengan JavaScript",
      "Mengenal responsive design dan mobile-first approach",
    ],
    steps: [
      {
        order: 1,
        title: "Pengenalan HTML5",
        description: "Memahami struktur dokumen HTML dan elemen-elemen penting.",
        content: `HTML adalah fondasi setiap website. Dalam modul ini kamu akan belajar:
        
- Struktur dasar dokumen HTML
- Tag-tag penting (heading, paragraph, link, image)
- Semantik HTML untuk aksesibilitas
- Form dan input elements
        
Praktik: Buat halaman portofolio sederhana menggunakan HTML semantik.`,
        resources: [
          { title: "MDN HTML Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
          { title: "HTML Cheat Sheet", url: "https://htmlcheatsheet.com/" },
        ],
      },
      {
        order: 2,
        title: "CSS Styling & Layout",
        description: "Menguasai CSS untuk styling dan layout halaman web.",
        content: `CSS memberikan tampilan visual untuk website. Pelajari:
        
- Selectors dan specificity
- Box model (margin, padding, border)
- Flexbox dan CSS Grid
- Responsive design dengan media queries
        
Praktik: Buat layout responsif menggunakan Flexbox dan CSS Grid.`,
        resources: [
          { title: "CSS-Tricks Guide", url: "https://css-tricks.com/" },
          { title: "Flexbox Playground", url: "https://flexboxfroggy.com/" },
        ],
      },
      {
        order: 3,
        title: "JavaScript Basics",
        description: "Dasar-dasar pemrograman dengan JavaScript.",
        content: `JavaScript membuat website interaktif. Kamu akan mempelajari:
        
- Variables, data types, dan operators
- Functions dan scope
- DOM manipulation
- Event handling
        
Praktik: Buat kalkulator interaktif dengan JavaScript.`,
        resources: [
          { title: "JavaScript.info", url: "https://javascript.info/" },
          { title: "Codecademy JS", url: "https://www.codecademy.com/" },
        ],
      },
      {
        order: 4,
        title: "Responsive Web Design",
        description: "Membuat website yang responsif di semua perangkat.",
        content: `Responsive design penting untuk user experience modern:
        
- Mobile-first approach
- Media queries dan breakpoints
- Fluid typography dan images
- Testing di berbagai perangkat
        
Praktik: Optimalkan website portofolio untuk mobile, tablet, dan desktop.`,
        resources: [
          { title: "Google Mobile-Friendly Guide", url: "https://developers.google.com/" },
        ],
      },
    ],
  },

  pbo: {
    slug: "pbo",
    title: "Pemrograman Berorientasi Objek",
    description: "Kuasai konsep OOP dengan Java atau Python untuk pengembangan aplikasi enterprise.",
    duration: "8 weeks",
    level: "Intermediate",
    instructor: "Fatimah Azzahra",
    learningOutcomes: [
      "Memahami konsep class, object, dan inheritance",
      "Menerapkan enkapsulasi dan polymorphism",
      "Menggunakan design patterns",
      "Membuat aplikasi skala menengah dengan OOP",
    ],
    steps: [
      {
        order: 1,
        title: "Konsep OOP",
        description: "Pengenalan paradigma pemrograman berorientasi objek.",
        content: `OOP adalah paradigma pemrograman modern yang mengorganisir code dalam objek:
        
- Class dan Object
- Properties dan Methods
- Abstraction dan Encapsulation
- Keuntungan OOP vs Procedural
        
Praktik: Buat class sederhana untuk entitas dunia nyata (Student, Car, dll).`,
        resources: [
          { title: "OOP Concepts", url: "https://en.wikipedia.org/wiki/Object-oriented_programming" },
        ],
      },
      {
        order: 2,
        title: "Inheritance & Polymorphism",
        description: "Pelajari pewarisan dan polimorfisme dalam OOP.",
        content: `Inheritance memungkinkan code reuse dan polymorphism memberikan fleksibilitas:
        
- Class hierarchy dan parent-child relationship
- Method overriding dan overloading
- Interfaces dan abstract classes
- Dynamic dispatch
        
Praktik: Buat hierarchy class untuk berbagai jenis vehicle.`,
        resources: [],
      },
      {
        order: 3,
        title: "Design Patterns",
        description: "Mengenal pola-pola desain yang umum digunakan.",
        content: `Design patterns adalah solusi proven untuk masalah umum:
        
- Creational patterns (Singleton, Factory)
- Structural patterns (Adapter, Decorator)
- Behavioral patterns (Observer, Strategy)
        
Praktik: Implementasikan Singleton pattern untuk database connection.`,
        resources: [],
      },
      {
        order: 4,
        title: "Project: Mini Application",
        description: "Aplikasi lengkap menggunakan konsep OOP.",
        content: `Integrasikan semua konsep dalam project nyata:
        
- Aplikasi manajemen inventori
- Sistem booking/reservasi
- Educational game
        
Pastikan menggunakan: classes, inheritance, interfaces, dan design patterns.`,
        resources: [],
      },
    ],
  },

  matematika: {
    slug: "matematika",
    title: "Matematika Teknik",
    description: "Matematika aplikatif untuk perhitungan teknis dan engineering problems.",
    duration: "6 weeks",
    level: "Intermediate",
    instructor: "Jordan Lee",
    learningOutcomes: [
      "Menguasai aljabar dan trigonometri",
      "Menerapkan logaritma dan eksponensial",
      "Memahami geometri dan transformasi",
      "Memecahkan masalah teknis dengan matematika",
    ],
    steps: [
      {
        order: 1,
        title: "Aljabar & Fungsi",
        description: "Dasar aljabar dan teori fungsi.",
        content: `Aljabar adalah fondasi matematika teknik:
        
- Persamaan linear dan kuadrat
- Sistem persamaan
- Fungsi dan grafik
- Domain dan range
        
Praktik: Selesaikan sistem persamaan dengan berbagai metode.`,
        resources: [],
      },
      {
        order: 2,
        title: "Trigonometri",
        description: "Trigonometri untuk perhitungan sudut dan gelombang.",
        content: `Trigonometri penting untuk engineering dan physics:
        
- Sin, Cos, Tan dan reciprocals
- Trigonometric identities
- Persamaan trigonometri
- Aplikasi: wave, oscillation
        
Praktik: Hitung tinggi bangunan menggunakan trigonometri.`,
        resources: [],
      },
      {
        order: 3,
        title: "Logaritma & Eksponensial",
        description: "Fungsi logaritma dan eksponensial dalam aplikasi.",
        content: `Logaritma dan eksponensial penting untuk modeling:
        
- Exponential growth dan decay
- Logarithmic scale
- Applications: decibel, pH, Richter scale
        
Praktik: Model pertumbuhan bakteri menggunakan fungsi eksponensial.`,
        resources: [],
      },
      {
        order: 4,
        title: "Geometri & Aplikasi",
        description: "Geometri untuk perhitungan area, volume, dan transformasi.",
        content: `Geometri aplikatif dalam konstruksi dan desain:
        
- Luas dan volume
- Transformasi (rotasi, scaling, translasi)
- Coordinate geometry
        
Praktik: Hitung volume dan luas permukaan berbagai bangun.`,
        resources: [],
      },
    ],
  },

  "basis-data": {
    slug: "basis-data",
    title: "Basis Data",
    description: "Desain dan implementasi database relasional dengan SQL.",
    duration: "7 weeks",
    level: "Intermediate",
    instructor: "Ahmad Dahlan",
    learningOutcomes: [
      "Memahami model relasional dan normalisasi",
      "Menulis query SQL yang efisien",
      "Mendesain database schema yang baik",
      "Mengimplementasikan relasi antar tabel",
    ],
    steps: [
      {
        order: 1,
        title: "Pengenalan Database",
        description: "Konsep dasar database relasional.",
        content: `Database menyimpan dan mengelola data aplikasi:
        
- Tabel, record, dan field
- Primary key dan foreign key
- Relasi antar tabel (1-to-1, 1-to-many, many-to-many)
- Database normalization
        
Praktik: Identifikasi entitas dan relasi untuk sistem akademik.`,
        resources: [],
      },
      {
        order: 2,
        title: "SQL SELECT & WHERE",
        description: "Membuat query untuk mengambil dan memfilter data.",
        content: `SELECT adalah statement paling dasar untuk data retrieval:
        
- SELECT columns FROM table
- WHERE clause untuk filtering
- AND, OR, NOT operators
- LIKE dan pattern matching
        
Praktik: Query database akademik untuk berbagai skenario.`,
        resources: [],
      },
      {
        order: 3,
        title: "JOIN & Agregasi",
        description: "Menggabungkan data dari multiple tables.",
        content: `JOIN memungkinkan pengambilan data dari multiple tables:
        
- INNER, LEFT, RIGHT, FULL JOIN
- Agregasi: COUNT, SUM, AVG, MAX, MIN
- GROUP BY dan HAVING
        
Praktik: Buat laporan dari multiple tables.`,
        resources: [],
      },
      {
        order: 4,
        title: "Database Design & Optimization",
        description: "Mendesain schema database yang optimal.",
        content: `Database design yang baik mempengaruhi performance:
        
- Normalization forms (1NF, 2NF, 3NF)
- Indexing dan query optimization
- Backup dan recovery
- Security dan access control
        
Praktik: Redesign database schema untuk optimal performance.`,
        resources: [],
      },
    ],
  },

  rpl: {
    slug: "rpl",
    title: "Rekayasa Perangkat Lunak",
    description: "Metodologi pengembangan software dari planning hingga deployment.",
    duration: "8 weeks",
    level: "Intermediate",
    instructor: "Fatimah Azzahra",
    learningOutcomes: [
      "Memahami lifecycle development software",
      "Menerapkan metodologi Agile/Scrum",
      "Membuat dokumentasi teknis yang baik",
      "Implementasi testing dan quality assurance",
    ],
    steps: [
      {
        order: 1,
        title: "SDLC & Metodologi",
        description: "Siklus pengembangan software dan berbagai metodologi.",
        content: `Software development membutuhkan proses terstruktur:
        
- Waterfall, Agile, DevOps
- Planning, Analysis, Design, Implementation, Testing, Deployment
- Roles dalam tim development
        
Praktik: Buat project charter untuk aplikasi sederhana.`,
        resources: [],
      },
      {
        order: 2,
        title: "Requirements & Design",
        description: "Menganalisis requirement dan membuat design document.",
        content: `Requirement analysis adalah fondasi project yang sukses:
        
- Functional vs non-functional requirements
- User stories dan use cases
- System architecture dan design patterns
- UML diagrams
        
Praktik: Buat requirement specification dan design document.`,
        resources: [],
      },
      {
        order: 3,
        title: "Version Control & Collaboration",
        description: "Bekerja efektif dalam tim menggunakan Git dan collaboration tools.",
        content: `Collaboration tools essential untuk tim yang tersebar:
        
- Git dan branching strategy
- Code review dan pull requests
- CI/CD pipelines
- Team communication tools
        
Praktik: Setup repository dan workflow Git untuk tim.`,
        resources: [],
      },
      {
        order: 4,
        title: "Testing & Deployment",
        description: "Quality assurance dan deployment ke production.",
        content: `Testing memastikan aplikasi berkualitas dan reliable:
        
- Unit testing, integration testing, system testing
- Test-driven development (TDD)
- Deployment strategies
- Monitoring dan logging
        
Praktik: Buat test cases dan deploy aplikasi ke server.`,
        resources: [],
      },
    ],
  },
};

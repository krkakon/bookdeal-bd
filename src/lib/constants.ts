export const BD_EDUCATION = {
  prePrimary: {
    label: "Pre-Primary / কিন্ডারগার্টেন",
    levels: ["Nursery", "KG", "Prep"],
    subjects: ["Bangla", "English", "Math", "Drawing", "Moral Science"],
  },
  primary: {
    label: "Primary / প্রাথমিক (Class 1-5)",
    levels: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
    subjects: ["Bangla", "English", "Mathematics", "Science", "Bangladesh & Global Studies", "Religion & Moral Education", "ICT"],
  },
  juniorSecondary: {
    label: "Junior Secondary / নিম্ন মাধ্যমিক (Class 6-8)",
    levels: ["Class 6", "Class 7", "Class 8"],
    subjects: ["Bangla", "English", "Mathematics", "Science", "Bangladesh & Global Studies", "Religion", "ICT", "Agriculture/Home Science", "Arts & Crafts", "Physical Education"],
  },
  sscScience: {
    label: "SSC Science / বিজ্ঞান (Class 9-10)",
    levels: ["Class 9", "Class 10"],
    subjects: ["Bangla 1st Paper", "Bangla 2nd Paper", "English 1st Paper", "English 2nd Paper", "Mathematics", "Physics", "Chemistry", "Biology", "Higher Mathematics", "ICT", "Religion"],
  },
  sscHumanities: {
    label: "SSC Humanities / মানবিক (Class 9-10)",
    levels: ["Class 9", "Class 10"],
    subjects: ["Bangla", "English", "Mathematics", "Bangladesh History & World Civilization", "Geography & Environment", "Civics & Citizenship", "Economics", "ICT", "Religion"],
  },
  sscCommerce: {
    label: "SSC Commerce / ব্যবসায় শিক্ষা (Class 9-10)",
    levels: ["Class 9", "Class 10"],
    subjects: ["Bangla", "English", "Mathematics", "Accounting", "Business Entrepreneurship", "Finance & Banking", "Economics", "ICT", "Religion"],
  },
  hscScience: {
    label: "HSC Science / বিজ্ঞান (Class 11-12)",
    levels: ["Class 11", "Class 12"],
    subjects: ["Bangla", "English", "Physics 1st Paper", "Physics 2nd Paper", "Chemistry 1st Paper", "Chemistry 2nd Paper", "Biology 1st Paper", "Biology 2nd Paper", "Higher Mathematics 1st Paper", "Higher Mathematics 2nd Paper", "ICT"],
  },
  hscHumanities: {
    label: "HSC Humanities / মানবিক (Class 11-12)",
    levels: ["Class 11", "Class 12"],
    subjects: ["Bangla", "English", "History", "Islamic History", "Economics", "Political Science", "Logic", "Social Work", "Geography", "ICT"],
  },
  hscCommerce: {
    label: "HSC Commerce / ব্যবসায় শিক্ষা (Class 11-12)",
    levels: ["Class 11", "Class 12"],
    subjects: ["Bangla", "English", "Accounting 1st Paper", "Accounting 2nd Paper", "Management", "Finance Banking & Insurance", "Business Organization & Management", "Economics", "ICT"],
  },
  bachelor: {
    label: "Bachelor / স্নাতক",
    levels: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    subjects: ["Computer Science & Engineering", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Architecture", "Business Administration (BBA)", "Law (LLB)", "Medicine (MBBS)", "Pharmacy", "Economics", "English Literature", "Bangla Literature", "History", "Political Science", "Sociology", "Psychology", "Mathematics", "Physics", "Chemistry", "Biology", "Agriculture", "Nursing", "Textile Engineering", "Marine Engineering"],
  },
  masters: {
    label: "Masters / স্নাতকোত্তর",
    levels: ["1st Year", "2nd Year"],
    subjects: ["Computer Science", "Business Administration (MBA)", "Economics", "English", "Bangla", "History", "Law", "Education", "Public Administration", "Development Studies", "Physics", "Chemistry", "Mathematics", "Statistics"],
  },
  admissionPrep: {
    label: "Admission Preparation / ভর্তি পরীক্ষা",
    levels: ["Medical", "Engineering", "University"],
    subjects: ["DU (Ka Unit)", "DU (Kha Unit)", "DU (Ga Unit)", "DU (Gha Unit)", "BUET Admission", "Medical/MBBS Admission", "CUET Admission", "RUET Admission", "KUET Admission", "JU Admission", "NSU Admission", "BRAC University", "IBA BBA", "IBA MBA", "Dental Admission", "Agricultural University", "Veterinary University", "Textile University"],
  },
  guideBooks: {
    label: "Guide Books / গাইড বই",
    levels: ["All Classes"],
    subjects: ["Panjeree Guide", "Lecture Guide", "Adarsha Guide", "Srijoni Guide", "Udvash", "Joykoli", "MP3 Series", "Saifur's English", "Saifur's Math", "Mentors Guide", "Question Bank", "Model Test Papers", "Previous Year Papers"],
  },
};

export const BOOK_CONDITIONS = [
  { value: "like-new", label: "Like New / একদম নতুন" },
  { value: "very-good", label: "Very Good / খুব ভালো" },
  { value: "good", label: "Good / ভালো" },
  { value: "acceptable", label: "Acceptable / গ্রহণযোগ্য" },
];

export const BOOK_CATEGORIES = [
  { id: "pre-primary", label: "Pre-Primary", icon: "🌱", bengali: "প্রাক-প্রাথমিক" },
  { id: "primary", label: "Primary", icon: "📗", bengali: "প্রাথমিক" },
  { id: "junior-secondary", label: "Junior Secondary", icon: "📘", bengali: "নিম্ন মাধ্যমিক" },
  { id: "ssc", label: "SSC", icon: "📙", bengali: "এসএসসি" },
  { id: "hsc", label: "HSC", icon: "📕", bengali: "এইচএসসি" },
  { id: "bachelor", label: "Bachelor", icon: "🎓", bengali: "স্নাতক" },
  { id: "masters", label: "Masters", icon: "🏛️", bengali: "স্নাতকোত্তর" },
  { id: "admission", label: "Admission Prep", icon: "🎯", bengali: "ভর্তি পরীক্ষা" },
  { id: "guide", label: "Guide Books", icon: "📚", bengali: "গাইড বই" },
];

export const DIVISIONS_BD = [
  "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh"
];

export const SITE_DEFAULTS = {
  name: "BookDeal BD",
  tagline: "Buy Smart. Sell Easy. Study More.",
  taglineBengali: "সেরা দামে বই কিনুন, সহজে বিক্রি করুন",
  primaryColor: "#0ea5e9",
  secondaryColor: "#6366f1",
  accentColor: "#22d3ee",
  heroTitle: "Bangladesh's #1 Used Book Marketplace",
  heroBengali: "বাংলাদেশের সেরা পুরনো বই বিক্রয়ের প্ল্যাটফর্ম",
  heroSubtitle: "Buy & sell used textbooks, guides, and academic books at student-friendly prices.",
  announcementBanner: "🎉 Special Offer: Get 10% off on first purchase! Use code: BOOKDEAL10",
  footerText: "© 2024 BookDeal BD. All rights reserved. Made with ❤️ for Bangladeshi students.",
};

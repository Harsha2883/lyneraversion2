
export interface CourseItem {
  id: string;
  title: string;
  description: string;
  image: string;
  creator: {
    name: string;
    image?: string;
  };
  category: string;
  certifications: string[];
  price: string;
  duration: string;
  rating: number;
  enrolled: number;
  trending: number;
  createdAt: string;
  isForMembers: boolean;
}

export const MOCK_COURSES: CourseItem[] = [
  {
    id: "1",
    title: "Introduction to ESG Reporting",
    description: "Learn the fundamentals of Environmental, Social, and Governance reporting for businesses.",
    image: "https://images.unsplash.com/photo-1587613865763-4b8b0d19e8ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    creator: {
      name: "Dr. Emma Watson",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    category: "ESG",
    certifications: ["ACTD", "EAHEA"],
    price: "$1,499",
    duration: "6 weeks",
    rating: 4.8,
    enrolled: 1243,
    trending: 98,
    createdAt: "2023-09-15",
    isForMembers: false
  },
  {
    id: "2",
    title: "Carbon Credit Trading Fundamentals",
    description: "Master the principles of carbon credit markets and learn effective trading strategies.",
    image: "https://images.unsplash.com/photo-1611273426858-450e7620370d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    creator: {
      name: "Prof. James Harrison",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    category: "Carbon",
    certifications: ["MEPSC", "Others"],
    price: "Free",
    duration: "4 weeks",
    rating: 4.5,
    enrolled: 856,
    trending: 76,
    createdAt: "2023-11-20",
    isForMembers: false
  },
  {
    id: "3",
    title: "Corporate Social Responsibility: Strategy & Implementation",
    description: "Develop comprehensive CSR strategies that align with business objectives and stakeholder expectations.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    creator: {
      name: "Sarah Chen, MBA",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    category: "CSR",
    certifications: ["ACTD", "Lynera"],
    price: "$2,199",
    duration: "8 weeks",
    rating: 4.9,
    enrolled: 1589,
    trending: 100,
    createdAt: "2023-08-05",
    isForMembers: false
  },
  {
    id: "4",
    title: "Climate Change Mitigation Techniques",
    description: "Explore practical approaches to reducing greenhouse gas emissions across various industry sectors.",
    image: "https://images.unsplash.com/photo-1623603807271-21764cadbe0e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    creator: {
      name: "Dr. Michael Torres",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    category: "Climate",
    certifications: ["MEPSC", "EAHEA"],
    price: "Members Only",
    duration: "10 weeks",
    rating: 4.7,
    enrolled: 945,
    trending: 85,
    createdAt: "2024-01-10",
    isForMembers: true
  },
  {
    id: "5",
    title: "ESG Investing: Financial Analysis & Portfolio Management",
    description: "Learn to integrate ESG factors into investment decision-making and portfolio construction.",
    image: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    creator: {
      name: "Alicia Johnson",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    category: "ESG",
    certifications: ["ACTD", "Others"],
    price: "$1,799",
    duration: "6 weeks",
    rating: 4.6,
    enrolled: 1123,
    trending: 90,
    createdAt: "2023-10-15",
    isForMembers: false
  },
  {
    id: "6",
    title: "Carbon Footprint Calculation & Reduction",
    description: "Master the methodologies for calculating organizational carbon footprints and developing reduction plans.",
    image: "https://images.unsplash.com/photo-1569163139599-0f4519e8b103?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    creator: {
      name: "Thomas Williams",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    category: "Carbon",
    certifications: ["MEPSC", "Lynera"],
    price: "$999",
    duration: "4 weeks",
    rating: 4.4,
    enrolled: 762,
    trending: 70,
    createdAt: "2023-12-01",
    isForMembers: false
  },
  {
    id: "7",
    title: "Sustainable Supply Chain Management",
    description: "Learn to design and implement environmentally and socially responsible supply chains.",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    creator: {
      name: "Prof. Robert Chang",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    category: "CSR",
    certifications: ["EAHEA", "Others"],
    price: "Free",
    duration: "5 weeks",
    rating: 4.3,
    enrolled: 689,
    trending: 65,
    createdAt: "2023-09-30",
    isForMembers: false
  },
  {
    id: "8",
    title: "Climate Risk Assessment for Businesses",
    description: "Develop skills to identify, assess, and manage climate-related risks in business operations.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    creator: {
      name: "Dr. Lisa Rodriguez",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    category: "Climate",
    certifications: ["ACTD", "MEPSC"],
    price: "Members Only",
    duration: "7 weeks",
    rating: 4.8,
    enrolled: 1056,
    trending: 95,
    createdAt: "2024-02-15",
    isForMembers: true
  }
];

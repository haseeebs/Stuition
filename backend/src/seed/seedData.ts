
import { hashSync } from 'bcrypt';

export const predefinedCategories = [
    { name: "Web Development", description: "Courses related to web development, including front-end and back-end." },
    { name: "Data Science", description: "Courses about data analysis, machine learning, and statistical methods." },
    { name: "Design", description: "Courses focused on design principles, graphic design, and UI/UX." },
    { name: "Marketing", description: "Courses on digital marketing strategies, SEO, and content marketing." },
    { name: "Python", description: "Courses covering Python programming language and its applications." },
    { name: "JavaScript", description: "Courses about JavaScript programming, including frameworks like React and Node.js." },
    { name: "Machine Learning", description: "Courses focused on machine learning algorithms, models, and applications." },
    { name: "Data Visualization", description: "Courses on visualizing data using tools and libraries like D3.js and Tableau." },
    { name: "Cybersecurity", description: "Courses related to cybersecurity practices, ethical hacking, and information security." },
    { name: "Project Management", description: "Courses on project management methodologies, tools, and techniques." },
    { name: "Mobile Development", description: "Courses about developing applications for mobile platforms like iOS and Android." },
    { name: "Cloud Computing", description: "Courses on cloud services and architecture, including AWS, Azure, and Google Cloud." },
    { name: "Game Development", description: "Courses focused on game design, development, and programming." },
    { name: "Database Management", description: "Courses on database design, SQL, NoSQL, and database administration." },
    { name: "Networking", description: "Courses related to computer networks, protocols, and network security." },
    { name: "Artificial Intelligence", description: "Courses on AI concepts, algorithms, and applications." },
    { name: "Entrepreneurship", description: "Courses on starting and managing a business, including startup strategies and growth." },
    { name: "Finance", description: "Courses on financial management, investment strategies, and financial analysis." },
    { name: "Health & Wellness", description: "Courses on physical and mental health, wellness practices, and fitness." },
    { name: "Education", description: "Courses on teaching methods, educational technologies, and curriculum development." }
];


// Sample users
export const sampleUsers = [
  {
    firstName: "Haseeb",
    lastName: "Shaikh",
    email: "haseebshaikh25ks@gmail.com",
    password: hashSync("haseebAdmin", 10), // Hashed password
    accountType: "instructor",
    contactNumber: "1234567890",
    image: "https://api.dicebear.com/5.x/initials/svg?seed=Haseeb Shaikh"
  },
  {
    firstName: "Hanzala",
    lastName: "Shaikh",
    email: "hanzalashaikh@example.com",
    password: hashSync("haseebAdmin", 10), // Hashed password
    accountType: "student",
    contactNumber: "2345678901",
    image: "https://api.dicebear.com/5.x/initials/svg?seed=hanzala Shaikh"
  },
  {
    firstName: "Aaquib",
    lastName: "Shaikh",
    email: "aaquibshaikh@example.com",
    password: hashSync("haseebAdmin", 10), // Hashed password
    accountType: "instructor",
    contactNumber: "3456789012",
    image: "https://api.dicebear.com/5.x/initials/svg?seed=aaquib Shaikh"
  }
];

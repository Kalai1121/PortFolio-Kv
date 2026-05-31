import { Component } from '@angular/core';

interface Skill {
  name: string;
  percentage: number;
  icon: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface Certificate {
  title: string;
  issuer: string;
  credentialUrl: string;
  icon: string;
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  // Skill Categories with progress percentage meters
  skillCategories: SkillCategory[] = [
    {
      title: 'Front-End Development',
      skills: [
        { name: 'Angular (12-16)', percentage: 90, icon: 'devicon-angularjs-plain colored' },
        { name: 'React.js', percentage: 85, icon: 'devicon-react-original colored' },
        { name: 'TypeScript', percentage: 88, icon: 'devicon-typescript-plain colored' },
        { name: 'JavaScript (ES6+)', percentage: 90, icon: 'devicon-javascript-plain colored' },
        { name: 'HTML5 / CSS3', percentage: 95, icon: 'devicon-html5-plain colored' },
        { name: 'Tailwind CSS', percentage: 88, icon: 'devicon-tailwindcss-original colored' },
        { name: 'Bootstrap', percentage: 90, icon: 'devicon-bootstrap-plain colored' }
      ]
    },
    {
      title: 'Back-End & Databases',
      skills: [
        { name: 'Node.js', percentage: 80, icon: 'devicon-nodejs-plain colored' },
        { name: 'Express.js', percentage: 82, icon: 'devicon-express-original' },
        { name: 'MongoDB', percentage: 85, icon: 'devicon-mongodb-plain colored' },
        { name: 'SQL / MySQL', percentage: 75, icon: 'devicon-mysql-plain colored' },
        { name: 'C#', percentage: 70, icon: 'devicon-csharp-plain colored' }
      ]
    },
    {
      title: 'Design, QA & DevOps',
      skills: [
        { name: 'Google UX / Figma', percentage: 85, icon: 'devicon-figma-plain colored' },
        { name: 'API Testing (Postman)', percentage: 88, icon: 'fas fa-vial' },
        { name: 'Playwright (Automation)', percentage: 75, icon: 'fas fa-robot' },
        { name: 'Git & GitHub', percentage: 90, icon: 'devicon-github-original' },
        { name: 'Vercel / Netlify / Render', percentage: 85, icon: 'fas fa-cloud-upload-alt' }
      ]
    }
  ];

  // Professional Certifications Checklist
  certificates: Certificate[] = [
    {
      title: 'Google UX Design Professional Certificate',
      issuer: 'Coursera (Google)',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/DBN07XRBR40X',
      icon: 'fab fa-google'
    },
    {
      title: 'Responsive Web Design Certification',
      issuer: 'freeCodeCamp',
      credentialUrl: 'https://freecodecamp.org/certification/fccbb8da542-1bdf-4543-b0b7-3f3067f53f51/responsive-web-design',
      icon: 'fab fa-free-code-camp'
    },
    {
      title: 'Foundational C# Certification',
      issuer: 'freeCodeCamp & Microsoft',
      credentialUrl: 'https://www.freecodecamp.org/certification/fccbb8da542-1bdf-4543-b0b7-3f3067f53f51/foundational-c-sharp-with-microsoft',
      icon: 'fab fa-microsoft'
    },
    {
      title: 'Web Development Certificate',
      issuer: 'IBM',
      credentialUrl: 'https://www.credly.com/badges/dcfea366-8b2a-484f-9375-68096427fbc8/linked_in_profile',
      icon: 'fas fa-server'
    },
    {
      title: 'Python Programming Specialization',
      issuer: 'Guvi Geek Networks, IITM Research Park',
      credentialUrl: 'https://kalai1121.github.io/Portfolio-Kalai/uploads/Kalaivani%20S%20CPDA%20Certificate.pdf',
      icon: 'fab fa-python'
    }
  ];
}

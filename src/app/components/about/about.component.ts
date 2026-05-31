import { Component } from '@angular/core';

interface TimelineEvent {
  year: string;
  role: string;
  organization: string;
  description: string;
  tech?: string[];
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  // Experience timeline data
  workTimeline: TimelineEvent[] = [
    {
      year: 'Jan 2026 - Present',
      role: 'Software Developer (Intern → Trainee)',
      organization: 'ECBEE Innovations Pvt Ltd',
      description: 'Worked on 5+ live production apps using Angular, TypeScript, and MongoDB. Implemented JSON-driven product listings, custom RBAC administration dashboards, SSR evaluation platforms (AMS, eProov), and resolved production-level bugs.',
      tech: ['Angular', 'TypeScript', 'RxJS', 'REST APIs', 'MongoDB', 'SSR']
    },
    {
      year: 'Jan 2025 - May 2025',
      role: 'Developer Intern',
      organization: 'Letzbizz',
      description: 'Gained hands-on experience in MERN stack development. Designed responsive web layouts with Tailwind, integrated React Hooks, established Node/Express router endpoints, and structured MongoDB CRUD collections.',
      tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS']
    },
    {
      year: 'Aug 2024 - Nov 2024',
      role: 'Software Development Intern',
      organization: 'TEMS Tech Solutions',
      description: 'Assisted in desktop development using C# and SQL server database queries. Conducted system debugging and documented tech guides.',
      tech: ['C#', 'SQL', 'Documentation', 'Debugging']
    },
    {
      year: 'Mar 2024 - Jun 2024',
      role: 'Web Development Intern',
      organization: 'VeriTech Software Services',
      description: 'Developed responsive user forms and registration cards with MySQL database saves. Collaborated on Figma design wireframes.',
      tech: ['HTML5', 'CSS3', 'Bootstrap', 'MySQL', 'Figma']
    }
  ];

  // Academic timeline data
  academicTimeline: TimelineEvent[] = [
    {
      year: '2019 - 2023',
      role: 'Bachelor of Engineering (ECE) - CGPA: 9.03',
      organization: 'AAA College of Engineering & Technology',
      description: 'Graduated with high honours. Recognized as the "Most Outstanding Student" of the 2019-2023 batch. Consistently ranked 1st/2nd/3rd in the department and presented research papers at 2 International Conferences.'
    }
  ];
}

import { Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';
 
const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/VihangaR11',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/your-linkedin', // ✏️ Replace with your LinkedIn URL
    icon: Linkedin,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/your-twitter', // ✏️ Replace or remove
    icon: Twitter,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/your-instagram', // ✏️ Replace or remove
    icon: Instagram,
  },
  {
    label: 'Email',
    href: 'mailto:your@email.com', // ✏️ Replace with your email
    icon: Mail,
  },
];
 
const LeftSideBar = () => {
  return (
    <div className="hidden lg:flex fixed left-6 bottom-0 z-40 flex-col items-center gap-5">
      {/* Social Icons */}
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:-translate-y-1 transform"
          >
            <Icon className="w-5 h-5" />
          </a>
        );
      })}
 
      {/* Vertical Line */}
      <div className="w-px h-24 bg-gradient-to-b from-gray-400 to-transparent" />
    </div>
  );
};
 
export default LeftSideBar;
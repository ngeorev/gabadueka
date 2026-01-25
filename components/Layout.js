import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  const currentPath = router.pathname;
  // Determine active link
  const isActive = (path) => currentPath === path;
  return (
    <>
      <header>
        <div className="brand">
          <Image src="/assets/images/FinalLogo.jpg" alt="DevOps Lab Logo" width={48} height={48} />
          <div className="brand-text">
            <div className="name">DevOps&nbsp;Lab</div>
            <div className="tagline">Modern infrastructure • Premium experience</div>
          </div>
        </div>
        <nav>
          <Link href="/">
            <a className={isActive('/') ? 'active' : ''}>Home</a>
          </Link>
          <Link href="/about">
            <a className={isActive('/about') ? 'active' : ''}>About</a>
          </Link>
          <Link href="/training">
            <a className={isActive('/training') ? 'active' : ''}>Training</a>
          </Link>
          <Link href="/contact">
            <a className={isActive('/contact') ? 'active' : ''}>Contact</a>
          </Link>
        </nav>
      </header>
      {children}
      <footer>
        <p>&copy; 2025 DevOps Lab. Built with passion and a broken grid.</p>
      </footer>
    </>
  );
}
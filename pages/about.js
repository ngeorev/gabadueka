import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <section
        className="content-section"
        style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}
      >
        <h2 style={{ marginBottom: '16px', fontSize: '32px' }}>About Me</h2>
        <p style={{ marginBottom: '16px', color: 'var(--secondary-text)' }}>
          Welcome to my DevOps Lab — a blend of modern, elegant design and
          powerful backend engineering. This project is more than a website;
          it’s a demonstration of infrastructure, automation and continuous
          improvement.
        </p>
        <p style={{ marginBottom: '16px', color: 'var(--secondary-text)' }}>
          My background combines fitness discipline with a DevOps mindset:
          consistency, iteration, metrics and always aiming for better
          performance.
        </p>
        <p style={{ color: 'var(--secondary-text)' }}>
          I’m building this platform as both a portfolio and a playground for my
          humble DevOps home lab to play around with.
        </p>
      </section>
    </Layout>
  );
}
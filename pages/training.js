import Layout from '../components/Layout';

export default function Training() {
  return (
    <Layout>
      <section
        className="content-section"
        style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}
      >
        <h2 style={{ marginBottom: '16px', fontSize: '32px' }}>Training Philosophy</h2>
        <p style={{ marginBottom: '16px', color: 'var(--secondary-text)' }}>
          Whether it’s fitness or building infrastructure, the principles are
          the same:
        </p>
        <ul
          style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '24px' }}
        >
          <li style={{ marginBottom: '8px' }}>
            <strong>Consistency:</strong> small improvements over time.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Automation:</strong> build systems that remove
            friction.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Measurability:</strong> track progress with real data.
          </li>
          <li>
            <strong>Performance:</strong> optimize bottlenecks.
          </li>
        </ul>
        <p style={{ color: 'var(--secondary-text)' }}>
          This page is still under construction …
        </p>
      </section>
    </Layout>
  );
}
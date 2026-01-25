import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function Projects() {
  return (
    <Layout>
      <section
        style={{
          maxWidth: '900px',
          margin: '60px auto',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        <Image
          src="/assets/images/construction.jpg"
          alt="Under Construction"
          width={900}
          height={600}
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            marginBottom: '24px',
          }}
        />
        <p style={{ fontSize: '18px', color: 'var(--secondary-text)' }}>
          This part is under heavy construction.
        </p>
        <Link href="/">
          <a className="btn btn-outline" style={{ marginTop: '20px' }}>
            Back to Home
          </a>
        </Link>
      </section>
    </Layout>
  );
}
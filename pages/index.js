import { useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';

// Client-only Quiz component
const Quiz = dynamic(() => import('../components/Quiz'), {
  ssr: false,
});

function HomeComponent() {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);

  function handlePasswordSubmit() {
    if (password.trim() === '135') {
      setAuthorized(true);
      setShowModal(false);
    } else {
      alert('Incorrect password. Please try again.');
    }
  }

  return (
    <Layout>
      {/* Hero section */}
      <section className="hero">
        <div>
          <h1>DevOps, but make it aesthetic.</h1>
          <p>
            A clean, training-style front end powered by serious infrastructure.
          </p>
          <div className="actions">
            <Link href="/projects" legacyBehavior>
              <a className="btn btn-primary">View infrastructure projects</a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a className="btn btn-outline">About the lab</a>
            </Link>
          </div>
        </div>

        <div>
          <div className="stat-card">
            <div className="label">Server uptime</div>
            <div className="value" id="uptime">Always on</div>
            <div className="note">Always evolving.</div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="grid-section">
        <div className="grid-item item-span-2">
          <h3>Consistency</h3>
          <p>Small improvements add up.</p>
        </div>
      </section>

      {/* Quiz */}
      <section className="quiz-section">
        {!authorized && (
          <button
            id="izzaza-button"
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            izzaza
          </button>
        )}

        {showModal && (
          <div
            className="password-modal"
            id="password-modal"
            style={{ display: 'flex' }}
          >
            <div className="modal-content">
              <h3>Enter Password</h3>
              <input
                type="password"
                id="quiz-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button
                id="password-submit"
                className="btn btn-primary"
                onClick={handlePasswordSubmit}
              >
                Enter
              </button>
            </div>
          </div>
        )}

        {authorized && <Quiz />}
      </section>
    </Layout>
  );
}

// Forces dynamic rendering (prevents static optimization)
export async function getServerSideProps() {
  return { props: {} };
}

// Disable SSR and fully client-render this page
const Home = dynamic(() => Promise.resolve(HomeComponent), {
  ssr: false,
});

export default Home;


import Layout from '../components/Layout';

export default function Contact() {
  return (
    <Layout>
      <section
        className="content-section"
        style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}
      >
        <h2 style={{ marginBottom: '16px', fontSize: '32px' }}>Contact</h2>
        <p style={{ marginBottom: '24px', color: 'var(--secondary-text)' }}>
          If you want to get in touch, send me a message using the form below:
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Thank you for your message!');
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input
              id="name"
              type="text"
              name="name"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: '#090a13',
                color: 'var(--primary-text)',
              }}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              id="email"
              type="email"
              name="email"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: '#090a13',
                color: 'var(--primary-text)',
              }}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <br />
            <textarea
              id="message"
              name="message"
              rows={5}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: '#090a13',
                color: 'var(--primary-text)',
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ alignSelf: 'flex-start' }}
          >
            Send
          </button>
        </form>
      </section>
    </Layout>
  );
}
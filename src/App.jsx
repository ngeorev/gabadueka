export default function App() {
  return (
    <div className="page">
      <div className="bg" />
      <div className="vignette" />

      <main className="wrap">
        <header className="titlebar">
          <div className="crest">☠</div>
          <div>
            <h1 className="title">Lich King DevOps Lab</h1>
            <p className="subtitle">Static demo build — forged for a quick flex.</p>
          </div>
        </header>

        <section className="panel">
          <h2 className="panelTitle">Wrath of the Lich King Facts</h2>
          <ul className="list">
            <li><span className="icon">❄</span> Northrend: frozen continent of dread and glory</li>
            <li><span className="icon">⚔</span> Death Knight: first Hero Class (runic power + presence)</li>
            <li><span className="icon">🏰</span> Icecrown Citadel: throne of Arthas Menethil</li>
            <li><span className="icon">🛡</span> Ulduar: ancient titan city and one of the best raids ever</li>
          </ul>
        </section>

        <section className="panel">
          <h2 className="panelTitle">Class Spotlight</h2>
          <div className="grid">
            <article className="card">
              <div className="cardTop">
                <span className="badge">Hero Class</span>
                <span className="badge blue">Death Knight</span>
              </div>
              <h3>Runeblade Protocol</h3>
              <p>
                Blood • Frost • Unholy — fueled by runes and runic power.
                Tanks like a wall, hits like a truck, looks like a raid boss.
              </p>
              <div className="meta">
                <span>🧊 Frost</span>
                <span>🩸 Blood</span>
                <span>🦠 Unholy</span>
              </div>
            </article>

            <article className="card">
              <div className="cardTop">
                <span className="badge">Caster</span>
                <span className="badge blue">Priest</span>
              </div>
              <h3>Discipline of the Light</h3>
              <p>
                Shields and heals — or go Shadow and melt minds.
                The original “support carry”.
              </p>
              <div className="meta">
                <span>✨ Holy</span>
                <span>🛡 Discipline</span>
                <span>🕳 Shadow</span>
              </div>
            </article>
          </div>
        </section>

        <section className="panel">
          <h2 className="panelTitle">The Frozen Throne</h2>
          <p className="lore">
            “No king rules forever, my son.”
            <span className="subLore">— Terenas Menethil</span>
          </p>

          <div className="ctaRow">
            <a className="btn primary" href="#!" onClick={(e) => e.preventDefault()}>
              ⚔ Enter the Citadel
            </a>
            <a className="btn secondary" href="#!" onClick={(e) => e.preventDefault()}>
              🧊 View the Raid Board
            </a>
          </div>

          <div className="footerChant">For the Horde and the Alliance!</div>
        </section>

        <footer className="footer">
          <span>© Lich King DevOps Lab — static build.</span>
          <span className="frosty">Made for show-and-tell.</span>
        </footer>
      </main>
    </div>
  );
}

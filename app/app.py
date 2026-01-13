"""
Flask application configured with a gaming‑oriented front‑end inspired by
Wrath of the Lich King.  This app defines a single route that renders
an HTML page with a hero section, navigation links, and a dark, icy
background to evoke the atmosphere of Northrend.

To run the application directly, execute this module.  In a production
environment, Gunicorn or another WSGI server should import and call
``create_app``.
"""
from flask import Flask, render_template_string, url_for

def create_app() -> Flask:
    """Factory function to create and configure the Flask application."""
    app = Flask(__name__)

    @app.route("/")
    def index() -> str:
        """Home page route that returns a rich HTML response."""
        stylesheet = url_for("static", filename="css/style.css")
        return render_template_string(
            """
            <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lich King DevOps Lab</title>
  <link rel="stylesheet" href="{{ stylesheet }}">
</head>

<body>
  <div class="bg"></div>
  <div class="frost-vignette"></div>

  <!-- Snow layers -->
  <div class="snow snow-1"></div>
  <div class="snow snow-2"></div>
  <div class="snow snow-3"></div>

  <header class="topbar">
    <div class="brand">
      <span class="brand-mark">☠</span>
      <div class="brand-text">
        <div class="brand-title">Lich King DevOps Lab</div>
        <div class="brand-subtitle">Northrend Infrastructure • CI/CD • Observability</div>
      </div>
    </div>

    <nav class="nav">
      <a href="#projects">Projects</a>
      <a href="#pipeline">Pipeline</a>
      <a href="#status">Status</a>
      <a href="#about">About</a>
    </nav>

    <div class="top-actions">
      <span class="pill">LIVE</span>
      <a class="ghost" href="#projects">Enter the Lab</a>
    </div>
  </header>

  <main>
    <section class="hero" id="home">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <!-- keep this if your test still expects it -->
        <div class="test-anchor">Welcome to my portfolio</div>

        <h1 class="hero-title">
          <span class="frost">WRATH</span> OF THE <span class="frost">PIPELINE</span>
        </h1>

        <p class="hero-lead">
          A DevOps stronghold behind the Frozen Throne.
          <br/>
          Docker • Jenkins • Nginx • Gunicorn • Cloudflare Tunnel • Prometheus/Grafana
        </p>

        <div class="hero-cta">
          <a class="btn primary" href="#projects">⚔ View Projects</a>
          <a class="btn secondary" href="#pipeline">🧊 See the Pipeline</a>
        </div>

        <div class="sigils">
          <div class="sigil">
            <div class="sigil-title">Release Rune</div>
            <div class="sigil-value">AUTO</div>
          </div>
          <div class="sigil">
            <div class="sigil-title">Deploy Gate</div>
            <div class="sigil-value">SSH</div>
          </div>
          <div class="sigil">
            <div class="sigil-title">Realm</div>
            <div class="sigil-value">PROXMOX</div>
          </div>
          <div class="sigil">
            <div class="sigil-title">Frost Aura</div>
            <div class="sigil-value">ON</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="projects">
      <div class="section-head">
        <h2>Raid Board</h2>
        <p>Stuff that actually runs. Not just screenshots.</p>
      </div>

      <div class="grid">
        <article class="card">
          <div class="card-top">
            <span class="badge">CI/CD</span>
            <span class="badge blue">Jenkins</span>
          </div>
          <h3>Frostforge Pipeline</h3>
          <p>
            Tests → build → push → deploy. Webhook triggers, immutable tags, and clean rollouts.
          </p>
          <div class="meta">
            <span>⚙ Stages: 4</span>
            <span>✅ Unit tests</span>
          </div>
        </article>

        <article class="card">
          <div class="card-top">
            <span class="badge">Edge</span>
            <span class="badge blue">Cloudflare</span>
          </div>
          <h3>Icegate Tunnel</h3>
          <p>
            Public access without opening ports. Tunnel connector stays healthy and controlled.
          </p>
          <div class="meta">
            <span>🛡 Zero Trust</span>
            <span>🌍 DNS + Tunnel</span>
          </div>
        </article>

        <article class="card">
          <div class="card-top">
            <span class="badge">Runtime</span>
            <span class="badge blue">Docker</span>
          </div>
          <h3>Necropolis Stack</h3>
          <p>
            Flask behind Nginx/Gunicorn, Postgres, secrets, and clean restart policies.
          </p>
          <div class="meta">
            <span>🐳 Compose</span>
            <span>🔐 Secrets</span>
          </div>
        </article>

        <article class="card">
          <div class="card-top">
            <span class="badge">Observability</span>
            <span class="badge blue">Grafana</span>
          </div>
          <h3>Frozen Metrics</h3>
          <p>
            Dashboards, logs, and alerts. If it breaks, you *know* why.
          </p>
          <div class="meta">
            <span>📈 Metrics</span>
            <span>🧾 Logs</span>
          </div>
        </article>
      </div>
    </section>

    <section class="section" id="pipeline">
      <div class="section-head">
        <h2>The Ritual of Deployment</h2>
        <p>Summon the image, bind it to the registry, awaken the containers.</p>
      </div>

      <div class="timeline">
        <div class="step">
          <div class="step-icon">①</div>
          <div class="step-body">
            <div class="step-title">Test</div>
            <div class="step-desc">pytest validates the realm before any summon.</div>
          </div>
        </div>
        <div class="step">
          <div class="step-icon">②</div>
          <div class="step-body">
            <div class="step-title">Build</div>
            <div class="step-desc">Docker builds the artifact: immutable, portable, ruthless.</div>
          </div>
        </div>
        <div class="step">
          <div class="step-icon">③</div>
          <div class="step-body">
            <div class="step-title">Push</div>
            <div class="step-desc">Image is sealed in the registry vault (Docker Hub).</div>
          </div>
        </div>
        <div class="step">
          <div class="step-icon">④</div>
          <div class="step-body">
            <div class="step-title">Deploy</div>
            <div class="step-desc">Remote host pulls and restarts. No mercy. No downtime (ideally).</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="status">
      <div class="section-head">
        <h2>Citadel Status</h2>
        <p>For the flex. Looks cool in front of friends.</p>
      </div>

      <div class="status-grid">
        <div class="panel">
          <div class="panel-title">App</div>
          <div class="panel-value ok">RUNNING</div>
          <div class="panel-foot">gabadueka-app</div>
        </div>
        <div class="panel">
          <div class="panel-title">Gateway</div>
          <div class="panel-value ok">ONLINE</div>
          <div class="panel-foot">gabadueka-nginx</div>
        </div>
        <div class="panel">
          <div class="panel-title">Database</div>
          <div class="panel-value ok">STABLE</div>
          <div class="panel-foot">postgres:16</div>
        </div>
        <div class="panel">
          <div class="panel-title">Threat Level</div>
          <div class="panel-value warn">FROST</div>
          <div class="panel-foot">“Chill. Everything is fine.”</div>
        </div>
      </div>
    </section>

    <section class="section" id="about">
      <div class="section-head">
        <h2>About</h2>
        <p>Just enough lore.</p>
      </div>

      <div class="about">
        <div class="about-card">
          <h3>The Builder</h3>
          <p>
            This lab is a self-hosted DevOps playground: pipelines, containers, reverse proxy,
            monitoring, and secured exposure via tunnel.
          </p>
          <p class="tiny">
            Fan-made theme for fun. World of Warcraft and related marks belong to Blizzard.
          </p>
        </div>

        <div class="about-card">
          <h3>Tech Stack</h3>
          <ul class="list">
            <li>🧊 Flask + Gunicorn</li>
            <li>🛡 Nginx reverse proxy</li>
            <li>🐳 Docker Compose</li>
            <li>⚙ Jenkins CI/CD</li>
            <li>🕳 Cloudflare Tunnel</li>
            <li>📈 Prometheus + Grafana (optional)</li>
          </ul>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div>© Lich King DevOps Lab — forged in Northrend.</div>
      <div class="footer-right">“The pipeline must flow.”</div>
    </footer>
  </main>
</body>
</html>
            """,
            stylesheet=stylesheet,
        )

    return app

if __name__ == "__main__":
    # When running directly, create the app and serve it with Flask's built‑in server.
    # In production, Gunicorn will import `create_app` and serve the app.
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)

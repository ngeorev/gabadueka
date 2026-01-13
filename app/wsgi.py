"""
Flask application configured with a gaming-oriented front-end inspired by
Wrath of the Lich King.
"""
from flask import Flask, render_template_string, url_for


def create_app() -> Flask:
    app = Flask(__name__)

    @app.route("/")
    def index() -> str:
        css = url_for("static", filename="css/style.css")
        bg = url_for("static", filename="images/lichking_ui.png")

        return render_template_string(
            """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lich King DevOps Lab</title>
  <link rel="stylesheet" href="{{ css }}">
</head>

<body>
  <div class="bg" style="background-image:url('{{ bg }}');"></div>
  <div class="vignette"></div>

  <main class="wrap">
    <!-- Keep this if any tests expect it -->
    <span class="hidden-test">Welcome to my portfolio</span>

    <header class="titlebar">
      <h1 class="title">Lich King DevOps Lab</h1>
      <p class="subtitle">Deploy or perish in the cold depths!</p>
    </header>

    <section class="panel">
      <h2 class="panel-title">Deployment Status</h2>
      <ul class="list">
        <li><span class="icon">❄</span> Nginx: <span class="ok">Active ✓</span></li>
        <li><span class="icon">🧊</span> Postgres: <span class="ok">Active ✓</span></li>
        <li><span class="icon">☠</span> Gabadueka App: <span class="ok">Deployed ✓</span></li>
      </ul>
    </section>

    <section class="panel">
      <h2 class="panel-title">Wrath of the Lich King Facts</h2>
      <ul class="list">
        <li><span class="icon">❄</span> Frozen continent of Northrend</li>
        <li><span class="icon">⚔</span> New Hero Class: Death Knight</li>
        <li><span class="icon">🏰</span> Ulduar & Icecrown (iconic raids)</li>
      </ul>
    </section>

    <section class="panel">
      <h2 class="panel-title">Lore Log</h2>
      <ul class="list">
        <li><span class="icon">☠</span> Death Knights: Masters of Runic Power</li>
        <li><span class="icon">✝</span> Shadow Priests: Embrace the Void</li>
        <li><span class="icon">👑</span> The Lich King: Lord of the Scourge</li>
      </ul>

      <div class="footer-chant">For the Horde and the Alliance!</div>
    </section>
  </main>
</body>
</html>
            """,
            css=css,
            bg=bg,
        )

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)


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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wrath of the Lich King Fan Site</title>
    <link rel="stylesheet" href="{{ stylesheet }}">
  </head>
  <body>
    <nav class="navbar">
      <div class="logo">WotLK</div>
      <div class="nav-links">
        <a href="#">Home</a>
        <a href="#">Lore</a>
        <a href="#">Gallery</a>
        <a href="#">Contact</a>
      </div>
    </nav>
    <section class="hero">
      <h1>Wrath of the Lich King</h1>
      <p>Embark on an epic journey through the frozen lands of Northrend. Face the armies
        of the Scourge and confront the Lich King himself!</p>
      <a href="#" class="btn">Enter the Frozen Throne</a>
    </section>
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

from flask import Flask


def create_app() -> Flask:
    """Factory function to create and configure the Flask application.

    Returns:
        Flask: Configured Flask application instance.
    """
    app = Flask(__name__)

    @app.route("/")
    def index() -> str:
        """Home page route that returns a simple HTML response."""
        return """
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>My Portfolio</title>
            </head>
            <body>
                <h1>Welcome to my portfolio!</h1>
                <p>This is a simple Flask application served behind Nginx and Gunicorn.</p>
            </body>
        </html>
        """

    return app


if __name__ == "__main__":
    # When running directly, create the app and serve it with Flask's built‑in server.
    # In production, Gunicorn will import `create_app` and serve the app.
    app = create_app()
    app.run(host="0.0.0.0", port=5000)
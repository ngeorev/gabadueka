import pytest
from app.app import create_app


@pytest.fixture
def client():
    """Fixture to create a test client for the Flask application."""
    app = create_app()
    app.testing = True
    return app.test_client()


def test_index(client):
    """Ensure that the index page returns HTTP 200 and contains welcome text."""
    response = client.get("/")
    assert response.status_code == 200
    assert b"Welcome to my portfolio" in response.data
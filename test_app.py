import unittest
from app import app

class TestApp(unittest.TestCase):
    def test_hello_world(self):
        tester = app.test_client(self)
        response = tester.get('/')
        assert response.status_code == 200
        assert response.data == b'Hello, World!'

if __name__ == "__main__":
    unittest.main()

from http import client
from unittest.mock import patch
from django.test import (
    Client,
    TestCase,
)

class TestSpending(TestCase):

    def setUp(self) -> None:
        self.client = Client()
        super().setUp()

    @patch('spendings.models.Spending.objects.all')
    def test_get_spending(self, mock_spendings):
        mock_spendings.return_value = [{
            "description": "Mango",
            "amount": 1200,
            "spent_at": "2022-02-23T14:47:20.381Z",
            "currency": "USD"
        }]
        response = self.client.get('/spendings/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(b'[{"description":"Mango","amount":1200,"spent_at":"2022-02-23T14:47:20.381Z","currency":"USD"}]', response.content)

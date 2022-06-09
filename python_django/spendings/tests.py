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

    @patch('spendings.models.Spending.objects.create')
    def test_post_spending(self, mock_spending_create):
        new_spending = {
            "description": "Mango",
            "amount": 1200,
            "spent_at": "2022-02-23T14:47:20.381Z",
            "currency": "USD"
        }
        response = self.client.post('/spendings/', new_spending, content_type='application/json')
        self.assertEqual(200, response.status_code)
        mock_spending_create.assert_called_with(description="Mango", amount=1200, currency="USD")

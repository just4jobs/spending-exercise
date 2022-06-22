import json
from datetime import datetime
from unittest.mock import patch
from django.test import (
    Client,
    TestCase,
)

from spendings.models import Spending


class TestSpending(TestCase):

    def setUp(self) -> None:
        self.client = Client()
        super().setUp()

    @patch('spendings.models.Spending.objects.order_by')
    def test_get_spending(self, mock_spendings):
        mock_spendings.return_value = [{
            "description": "Mango",
            "amount": 1200,
            "spent_at": "2022-02-23T14:47:20.381Z",
            "currency": "USD"
        }]
        response = self.client.get('/spendings/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(
            b'[{"description":"Mango","amount":1200,"spent_at":"2022-02-23T14:47:20.381Z","currency":"USD"}]',
            response.content
        )

    @patch('spendings.models.Spending.objects.order_by')
    def test_get_spending_ordering(self, mock_ordering):
        response = self.client.get('/spendings/?order_by=amount')
        mock_ordering.assert_called_with('amount')
        self.assertEqual(200, response.status_code)

    @patch('spendings.models.Spending.objects.filter')
    def test_get_spending_filtering(self, mock_filter):
        response = self.client.get('/spendings/?order_by=amount&filtering=HUF')
        mock_filter.assert_called_with(currency='HUF')
        self.assertEqual(200, response.status_code)

    @patch('spendings.models.Spending.objects.create')
    def test_post_spending(self, mock_spending_create):
        new_spending = {
            "description": "Mango",
            "amount": 1200,
            "currency": "USD"
        }
        mock_spending_create.return_value = Spending(
            description="Mango",
            amount=1200,
            spent_at=datetime.strptime("2022-02-23T14:47:20.381Z", "%Y-%m-%dT%H:%M:%S.%fZ"),
            currency="USD",
        )
        response = self.client.post('/spendings/', json.dumps(new_spending), content_type='application/json')
        self.assertEqual(200, response.status_code)
        self.assertEqual(
            b'{"description": "Mango", "amount": 1200, "spent_at": "2022-02-23T14:47:20.381", "currency": "USD"}',
            response.content
        )
        mock_spending_create.assert_called_with(description="Mango", amount=1200, currency="USD")

    def test_post_incomplete_spending(self):
        new_spending = {
            "description": "Mango",
            "spent_at": "2022-02-23T14:47:20.381Z",
            "currency": "USD"
        }
        response = self.client.post('/spendings/', new_spending)
        self.assertEqual(400, response.status_code)

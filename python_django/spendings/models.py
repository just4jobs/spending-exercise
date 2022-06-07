from django.db import models


class Spending(models.Model):
    description = models.TextField()
    amount = models.IntegerField()
    spent_at = models.DateTimeField(auto_now=True)
    currency = models.TextField()

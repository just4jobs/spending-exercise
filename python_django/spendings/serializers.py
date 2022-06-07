from rest_framework import serializers

from spendings.models import Spending


class SpendingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Spending
        fields = ("description", "amount", "spent_at", "currency")

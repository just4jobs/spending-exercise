from rest_framework.decorators import api_view
from rest_framework.response import Response

from spendings.models import Spending
from spendings.serializers import SpendingSerializer


@api_view(['GET'])
def spendings(request):
    if request.method == 'GET':
        spendings = Spending.objects.all()
        serializer = SpendingSerializer(spendings, many=True)
        return Response(serializer.data)

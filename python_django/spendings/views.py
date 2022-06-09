import logging
from email import message
import json

from rest_framework.decorators import api_view
from rest_framework.response import Response

from spendings.models import Spending
from spendings.serializers import SpendingSerializer


@api_view(['GET', 'POST'])
def spendings(request):
    if request.method == 'GET':
        spendings = Spending.objects.all()
        serializer = SpendingSerializer(spendings, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        request_body = request.body
        try:
            new_spending_data = json.loads(request_body.decode('utf-8'))
        except Exception as ex:
            logging.error(ex)
            return Response({'message': 'Inappropriate spending data'}, status=400, content_type='application/json')
        if new_spending_data:
            new_spending_serializer = SpendingSerializer(data=new_spending_data)
            if new_spending_serializer.is_valid():
                new_spending_serializer.save()
                return Response(new_spending_data, content_type='application/json')
            else:
                return Response({'message': 'Invalid spending data'}, status=400, content_type='application/json')
        else:
            return Response({'message': 'No spending data'}, status=400, content_type='application/json')

import logging
import json

from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from spendings.helpers import serialize_model_to_single_dict
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
                data = new_spending_serializer.save()
                serialized_data = serialize_model_to_single_dict(data)
                return JsonResponse(serialized_data)
            else:
                return Response({'message': 'Invalid spending data'}, status=400, content_type='application/json')
        else:
            return Response({'message': 'No spending data'}, status=400, content_type='application/json')

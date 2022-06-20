import json

from django.core.serializers import serialize
from django.db.models import Model


def serialize_model_to_single_dict(data: Model) -> dict:
    serialized_data = serialize('json', [data])
    json_data = json.loads(serialized_data)[0]
    return json_data['fields']

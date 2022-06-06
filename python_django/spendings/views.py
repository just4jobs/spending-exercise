from django.http import JsonResponse


# TODO: eliminate safe turned off
def spendings(request):
    if request.method == 'GET':
        return JsonResponse([{
            "description": "Mango",
            "amount": 1200,
            "spent_at": "2022-02-23T14:47:20.381Z",
            "currency": "USD",
        }], safe=False)

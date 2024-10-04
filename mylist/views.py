from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import ShoppingItem  # Korrigiert auf ShoppingItem

# Create your views here.
def mylist(request):
    if request.method == 'POST':
        print('Received data:', request.POST['itemName'])
        ShoppingItem.objects.create(name=request.POST['itemName'])
    all_items = ShoppingItem.objects.all()
    return render(request, 'shopping_list.html', {'all_items': all_items})

def delete_item(request, item_id):
    if request.method == 'DELETE':
        item = get_object_or_404(ShoppingItem, id=item_id)  # Korrigiert auf ShoppingItem
        item.delete()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'error': 'Ungültige Anfrage'}, status=400)
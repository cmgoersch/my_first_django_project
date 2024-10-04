from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import ShoppingItem  # Korrigiert auf ShoppingItem
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
def mylist(request):
    if request.method == 'POST':
        item_name = request.POST.get('itemName')
        if item_name:  # Überprüfe, ob ein Name vorhanden ist
            ShoppingItem.objects.create(name=item_name)
    all_items = ShoppingItem.objects.all()
    return render(request, 'shopping_list.html', {'all_items': all_items})

def delete_item(request, item_id):
    if request.method == 'DELETE':
        item = get_object_or_404(ShoppingItem, id=item_id)
        item.delete()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'error': 'Ungültige Anfrage'}, status=400)

@csrf_exempt  # Deaktiviert den CSRF-Schutz für diese View
def toggle_done(request, item_id):
    if request.method == 'POST':
        item = get_object_or_404(ShoppingItem, id=item_id)
        data = json.loads(request.body)
        done_status = data.get('done')
        if done_status is not None:  # Überprüfe, ob 'done' im JSON vorhanden ist
            item.done = done_status
            item.save()  # Speichert den aktualisierten Zustand in der Datenbank
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Feld "done" fehlt'}, status=400)
    return JsonResponse({'error': 'Ungültige Anfrage'}, status=400)
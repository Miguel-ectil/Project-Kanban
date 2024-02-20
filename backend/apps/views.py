# kanban/views.py
from ninja import NinjaAPI
from .models import Card

back_api = NinjaAPI()

@back_api.get("/data-kanban")
def list_cards(request):
    return Card.objects.all()

@back_api.post("/create-task")
def create_card(request, title: str, text: str, footer: str, priority: str):
    return Card.objects.create(title=title, text=text, footer=footer, priority=priority)

# Adicione outras visualizações conforme necessário

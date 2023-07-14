from django.urls import path
from .views import RegisterView, RetrieveUserView, CryptocurrenciesView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('me', RetrieveUserView.as_view()),
    path('cryptocurrencies', CryptocurrenciesView.as_view(), name='cryptocurrencies'),
]

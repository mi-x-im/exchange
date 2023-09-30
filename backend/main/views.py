from rest_framework.response import Response
from django.contrib.auth import get_user_model
from bs4 import BeautifulSoup
from rest_framework import permissions, status
from rest_framework.views import APIView
from .serializers import UserCreateSerializer, UserSerializer, CryptocurrenciesSerializer
from django.core.exceptions import ObjectDoesNotExist
import requests
from rest_framework import serializers
from .models import Cryptocurrencies

User = get_user_model()


class RegisterView(APIView):
    def post(self, request):
        data = request.data

        serializer = UserCreateSerializer(data=data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_201_CREATED)


class RetrieveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        user = UserSerializer(user)
        return Response(user.data, status=status.HTTP_200_OK)


class CryptocurrenciesView(APIView):

    def get(self, request):
        cryptocurrencies = Cryptocurrencies.objects.all()

        url = "https://invlab.ru/akcii/rossiyskie/"

        headers = {
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Mobile Safari/537.36"
        }

        result = requests.get(url, headers=headers).text
        soup = BeautifulSoup(result, "lxml")

        tbody = soup.find("tbody")
        coins = tbody.find_all("tr")

        comps = []
        for coin in coins:
            name = coin.find(class_="action_title")
            price = coin.find(class_="action_price")
            if name and price:
                name = name.text
                price = price.text
                Cryptocurrencies.objects.update_or_create(name=name, defaults={'price': price})
            cryptocurrencies = Cryptocurrencies.objects.all()
            serializer = CryptocurrenciesSerializer(cryptocurrencies, many=True)
        return Response(serializer.data)


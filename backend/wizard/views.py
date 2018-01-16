from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Test
from .serializers import TestSerializer

# Create your views here.
class TestView(APIView):
    def get(self, request):
        test = Test.objects.all()
        serializer = TestSerializer(test, many=True)
        return Response(serializer.data)

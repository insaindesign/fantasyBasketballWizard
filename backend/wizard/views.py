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
        # you can return an http response with html to display a page
        return Response(serializer.data)
    def post(self, request):
        #post request

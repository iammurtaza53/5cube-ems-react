from django.shortcuts import render

from .serializers import BreakSerializer
from .models import Breaks


from rest_framework import viewsets


# Create your views here.
class BreakViewSet(viewsets.ModelViewSet):
    serializer_class = BreakSerializer
    # import pdb; pdb.set_trace()
    queryset = Breaks.objects.all().order_by('-created_at')
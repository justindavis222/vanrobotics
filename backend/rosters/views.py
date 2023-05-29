from django.shortcuts import render
from rest_framework import generics
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rosters.models import ClassBatch, Learner
from rosters.serializers import (
        ClassBatchViewSerializer, LearnerViewSerializer
)

class ClassBatchList(APIView):
    """
    List all class_batches, or create a new learner.
    """
    def get(self, request, format=None):
        class_batches = ClassBatch.objects.all()
        serializer = ClassBatchViewSerializer(class_batches, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ClassBatchViewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClassBatchDetailView(APIView):
    serializer_class = ClassBatchViewSerializer

    """
    Retrieve, update or delete a classbatch instance.
    """
    def get_object(self, pk):
        try:
            return ClassBatch.objects.get(pk=pk)
        except ClassBatch.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        class_batch = self.get_object(pk)
        if isinstance(class_batch, Response):
            return class_batch
        serializer = ClassBatchViewSerializer(class_batch)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        class_batch = self.get_object(pk)
        if isinstance(class_batch, Response):
            return class_batch
        serializer = ClassBatchViewSerializer(class_batch, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        class_batch = self.get_object(pk)
        if isinstance(class_batch, Response):
            return class_batch
        class_batch.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class LearnerList(APIView):
    """
    List all learners, or create a new learner.
    """
    def get(self, request, format=None):
        learners = Learner.objects.all()
        serializer = LearnerViewSerializer(learners, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = LearnerViewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LearnerDetailView(APIView):

    serializer_class = LearnerViewSerializer

    """
    Retrieve, update or delete a learner instance.
    """
    def get_object(self, pk):
        try:
            return Learner.objects.get(pk=pk)
        except Learner.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        learner = self.get_object(pk)
        if isinstance(learner, Response):
            return learner
        serializer = LearnerViewSerializer(learner)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        learner = self.get_object(pk)
        if isinstance(learner, Response):
            return learner
        serializer = LearnerViewSerializer(learner, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        learner = self.get_object(pk)
        if isinstance(learner, Response):
            return learner
        learner.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

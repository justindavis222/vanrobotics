from rest_framework import serializers
from rosters.models import ClassBatch, Learner

class ClassBatchViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassBatch
        fields = "__all__"

class LearnerViewSerializer(serializers.ModelSerializer):
    class_batches = ClassBatchViewSerializer(many=True, read_only=True)
    class Meta:
        model = Learner
        fields = "__all__"

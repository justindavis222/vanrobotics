from django.db import models

class Learner(models.Model):
    """
    Corresponds to a single student.
    """
    first_name = models.TextField(max_length=100, blank=True, null=True)
    last_name = models.TextField(max_length=100, blank=True, null=True)
    grade = models.TextField(max_length=2, blank=True, null=True)
    secret_id = models.CharField(max_length=100, unique=True)

class ClassBatch(models.Model):
    """
    Corresponds to groups of Learners led by an instructor, colloquially "classes".
    """
    name = models.TextField(max_length=100, blank=True, null=True)
    instructor = models.TextField(max_length=100, blank=True, null=True)
    learners = models.ManyToManyField(Learner, related_name='class_batches')


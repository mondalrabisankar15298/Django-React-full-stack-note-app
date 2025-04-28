from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE,related_name="notes")
    #cascade means that if the user is deleted, all the notes associated with the user will be deleted
    #related_name is the name of the reverse relationship

    def __str__(self):
        return self.title

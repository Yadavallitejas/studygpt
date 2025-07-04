from django.db import models

class Question(models.Model):
    user_question = models.TextField()
    subject = models.CharField(max_length=100)
    language = models.CharField(max_length=50)
    answer = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject} Question in {self.language}"
from django.db import models


class Position(models.Model):
    name = models.CharField(max_length=50, unique=True)
    # Specialist positions (front row and second row) are restricted for safety
    isSpecialist = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Player(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    age = models.IntegerField()
    email = models.EmailField(blank=True)
    positions = models.ManyToManyField(Position, blank=True)

    def __str__(self):
        return f"{self.firstName} {self.lastName}"

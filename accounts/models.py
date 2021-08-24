from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass


class Portfolio(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=20)
    slug = models.CharField(max_length=20, null=True)
    name = models.CharField(max_length=30)
    amount = models.DecimalField(max_digits=20, decimal_places=7)

    def __str__(self):
        return f'{self.user} has {self.amount} {self.symbol}'
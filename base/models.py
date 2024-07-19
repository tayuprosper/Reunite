from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Item(models.Model):
    founder = models.ForeignKey(User, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=50)
    item_desc = models.TextField(max_length=256)
    found_location = models.TimeField(max_length=56)
    item_img_url = models.TextField(max_length=50, null=True, blank=True)
    data_found = models.DateTimeField(auto_now_add=True)
    date_posted = models.DateTimeField(auto_now_add=True)

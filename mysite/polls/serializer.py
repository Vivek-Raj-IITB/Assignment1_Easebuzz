from . import models
from rest_framework import serializers
from rest_framework.fields import CharField, IntegerField, DecimalField



class bhavSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.bhav
		fields = [
			'code',
			'name',
			'open',
			'high',
			'low',
			'close',
        ]
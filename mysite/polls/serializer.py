from . import models
from rest_framework import serializers
from rest_framework.fields import CharField, IntegerField, DecimalField



class bhavSerializer(serializers.ModelSerializer):

	# name = CharField(source="title", required=True)
	# message = CharField(source="description", required=True)
	# email = EmailField(required=True)
	
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
from . import models
from rest_framework import serializers
from rest_framework.fields import CharField, IntegerField, DecimalField



class bhavSerializer(serializers.ModelSerializer):
	class Meta:
		# x=1
		model = models.bhav
		fields = '__all__'
		# fields = [
		# 	'code',
		# 	'name',
		# 	'open',
		# 	'high',
		# 	'low',
		# 	'close',
        # ]	

# class bhavSerializer(serializers.Serializer):
# 	# id = serializers.IntegerField(read_only=True)
# 	code = serializers.IntegerField()
# 	name = serializers.CharField(max_length = 100)
# 	open = serializers.DecimalField(max_digits=10, decimal_places=2)
# 	high = serializers.DecimalField(max_digits=10, decimal_places=2)
# 	low = serializers.DecimalField(max_digits=10, decimal_places=2)
# 	close = serializers.DecimalField(max_digits=10, decimal_places=2)
    
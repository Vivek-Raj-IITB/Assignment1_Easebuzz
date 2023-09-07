from django.shortcuts import render
from django.http import Http404
from django.http import HttpResponse, JsonResponse
from polls.models import *
import polls
from django.template import loader
from django.urls import reverse
from django.views import generic
from django.shortcuts import redirect, render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.template.loader import render_to_string 
import requests
import zipfile
from io import BytesIO
from datetime import datetime, timedelta
import requests
import shutil
import os
import urllib
from urllib.request import urlopen
import pandas as pd
import csv
from rest_framework.views import APIView
from rest_framework.response import Response
from . serializer import *
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import viewsets
from django.contrib.auth.models import User
from polls.serializer import bhavSerializer
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.renderers import JSONRenderer

@api_view(['GET'])
def bhav_list(request):
    bhavs= bhav.objects.all()
    serializer = bhavSerializer(bhavs, many = True)
    json_data = JSONRenderer().render(serializer.data)
    # print(type(serializer.data), "hello")
    return Response(serializer.data)
    # return Response(json_data)
    # return JsonResponse(serializer.data,safe=False)

# @api_view(['GET', 'PUT', 'DELETE','POST'])
# def bhav_details(request,pk):
#     bhavs= bhav.objects.get(pk=pk)
#     serializer = bhavSerializer(bhavs, many = False)
#     return Response(serializer.data)
@api_view(['GET', 'PUT', 'DELETE','POST'])
def bhav_add(request):
    if request.method == 'POST':
        serializer = bhavSerializer(data =  request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE','POST'])
def bhav_detail(request, pk=1):
    """
    Retrieve, update or delete a code snippet.
    """
    # print("printing pk ", pk)
    # try:
    # cur_instance = bhav.objects.get(pk=pk)
    # except bhav.DoesNotExist:
        # bhavs= bhav.objects.all()
        # serializer = bhavSerializer(bhavs, many = True)
        # return Response(serializer.data)

        # return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        if pk!=1:
            cur_instance = bhav.objects.get(pk=pk)
            serializer = bhavSerializer(cur_instance)
            return Response(serializer.data)
        else:
            bhavs= bhav.objects.all()
            serializer = bhavSerializer(bhavs, many = True)
            return Response(serializer.data)


    elif request.method == 'PUT':
        cur_instance = bhav.objects.get(pk=pk)
        serializer = bhavSerializer(cur_instance, data=request.data)
        # print(cur_instance.code)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    elif request.method == 'POST':
        serializer = bhavSerializer(data =  request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        cur_instance = bhav.objects.get(pk=pk)
        cur_instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class UserViewSet(viewsets.ModelViewSet):
    queryset  = bhav.objects.all()
    serializer_class = bhavSerializer
    permission_classes =[]


# class ReactView(APIView):
#     def get(self,request):
#         output = [{"code":output.code,
#                    "name":output.name,
#                    "open":output.open,
#                    "high":output.high,
#                    "low":output.low,
#                    "close":output.close}
#                    for output in bhav.objects.all()]
#         return Response(output)

    # def get(self,request,pk):
    #     output = [{"code":output.code,
    #                "name":output.name,
    #                "open":output.open,
    #                "high":output.high,
    #                "low":output.low,
    #                "close":output.close}
    #                for output in bhav.objects.all()]
    #     return Response(output)
    
    # def post(self,request):
    #     serializer = bhavSerializer(data=request.data)
    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save()
    #         return Response(serializer.data)
    
    # def delete(self,request,pk):
    #     snippet = self.get_object(pk)
    #     snippet.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT) 
    



def previous_business_day():
    # today's date
    test_date = datetime.now()
 
    # printing original date
    # print("The original date is : " + str(test_date))
    # Creating Timestamp
    # ts = pd.Timestamp(str(test_date))
    # Create an offset of 1 Business days
    offset = pd.tseries.offsets.BusinessDay(n=1)
    
    # getting result by subtracting offset
    res = test_date - offset
    
    # printing result
    # print("Last business day : " + str(res))

    # extrctin date from the previous business day
    yesterday_date=datetime.strftime(res, '%Y-%m-%d')
    
    date_to_append_in_url = yesterday_date[-2]+yesterday_date[-1]+yesterday_date[-5]+yesterday_date[-4]+yesterday_date[2]+yesterday_date[3]
   
    return date_to_append_in_url

def add_to_database():
    
    filename = previous_business_day()
    filename = 'EQ'+filename+'.CSV'

    print(filename)
    
    with open('./extractedFiles/'+filename) as file:
        reader = csv.reader(file)
        next(reader)  # Advance past the header

        bhav.objects.all().delete()

        for row in reader:
            # print(row)
            bhav1 = bhav(code = row[0],
                         name = row[1],
                         open = row[4],
                         high = row[5],
                         low  = row[6],
                         close= row[7])
            bhav1.save()


def fetch_and_save(request):
    print('Downloading started')
    
    date_to_append_in_url = previous_business_day()
    # print(date_to_append_in_url)
    url = 'https://www.bseindia.com/download/BhavCopy/Equity/EQ'+date_to_append_in_url+'_CSV.ZIP'
    # url = 'https://www.bseindia.com/download/BhavCopy/Equity/EQ180823_CSV.ZIP' # original link for date 18/08/23
    headers_1 = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'}\
    #extrating the file name of the zip file
    filename = url.split('/')[-1]
    # Outputs
    output_path = "./zipFiles/"+filename
    # request the file from website
    req = urllib.request.Request(url, headers=headers_1)

    # open it in a file and write it to save it in local
    with urlopen(req) as response, open(output_path, 'wb') as f:
        shutil.copyfileobj(response, f)
    with zipfile.ZipFile("./zipFiles/"+filename, 'r') as zip_ref:
        zip_ref.extractall("./extractedFiles")

    add_to_database()
    return HttpResponse("✅ ZIP downloaded on: "+output_path+" from "+ url + "\n and csv file is also parsed")
 


def fetch_and_display(request):
    '''
    not in use
    '''
    # bhav_list = bhav.objects.all()
    # return render(request, 'polls/detail.html', {'bhav_list':bhav_list})
    """View function for home page of site."""

    # Generate counts of some of the main objects
    bhav_list = bhav.objects.all()

    # number_of_records = bhav.objects.filter(id=20096)

    context = {
        'previous_day_bhav' : bhav_list

        # 'name' : bhav_list.values_list('name'),

        # 'open' : bhav_list.values_list('open'),

        # 'high' : bhav_list.values_list('high'),

        # 'low' : bhav_list.values_list('low'),

        # 'close' : bhav_list.values_list('close')

    }

    # Render the HTML template index.html with the data in the context variable
    return render(request, 'polls/detail.html',context=context)

def delete_record(request, bhav_code):
    '''
    not in use
    '''
    record = get_object_or_404(bhav, pk=bhav_code)
    output  = str(record.code)+" and "+record.name
    record.delete()
    return HttpResponse("Record with the following code and name:  " + output + " is deleted")


from django.shortcuts import render
from django.http import Http404
from django.http import HttpResponse
from polls.models import bhav
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


def index(request):
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



def fetch_data(request):
    # bhav_list = bhav.objects.all()
    # return render(request, 'polls/detail.html', {'bhav_list':bhav_list})
    """View function for home page of site."""

    # Generate counts of some of the main objects
    bhav_list = bhav.objects.all()

    # number_of_records = bhav.objects.filter(id=20096)

    context = {
        'code' : bhav_list
        # 'code': bhav.objects.get(code=)
        # 'name': name,
        # 'open': open,
        # 'high': high,
        # 'low' : low,
        # 'close':close
    }

    # Render the HTML template index.html with the data in the context variable
    return render(request, 'polls/detail.html',context=context)

from django.shortcuts import render
from django.http import Http404
from django.http import HttpResponse
from .models import Question,Choice
from django.template import loader
from django.urls import reverse
from django.views import generic
from django.shortcuts import redirect, render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.template.loader import render_to_string 
import requests, zipfile, io
from datetime import datetime, timedelta


def index(request):
    print('Downloading started')
    yesterday = datetime.now() - timedelta(1)
    # type(yesterday)
    yesterday_date=datetime.strftime(yesterday, '%Y-%m-%d')
    
    url_append = yesterday_date[-2]+yesterday_date[-1]+yesterday_date[-5]+yesterday_date[-4]+yesterday_date[2]+yesterday_date[3]
    print(url_append)
    url = 'https://www.bseindia.com/download/BhavCopy/Equity/EQ'+url_append+'_CSV.ZIP'
    # url = 'https://www.bseindia.com/download/BhavCopy/Equity/EQ170823_CSV.ZIP'

    #
    # Downloading the file by sending the request to the URL
    req = requests.get(url)
    
    # Split URL to get the file name
    filename = 'EQ170823_CSV.ZIP'
    
    # Writing the file to the local file system
    with open(filename,'wb') as output_file:
        output_file.write(req.content)
    print('Downloading Completed')
    return HttpResponse("Zip file downloaded"+url)
    
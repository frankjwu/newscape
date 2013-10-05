import pylab, matplotlib, numpy, scipy
import json, pickle
from operator import itemgetter
import datetime, calendar

def convertJsontoDict(obj):
    python_dict = json.loads(obj);
    return python_dict

def parseAndSort(python_dict):
    search = python_dict['query'];
    results = python_dict['results'];
    listofDates = [];
    for hashing in results:
        listofDates.append(hashing['created_at']);
    order = compareDates(listofDates);
    new_results = [];
    for num in order:
        new_results.append(results[num]);
    return search, new_results

def compareDates(listofDates):
    dateList = [];
    combined_dateList = [];
    for date in listofDates:
        temp = date.split();
        dateList.append(temp);
    dateList_sorted = sorted(dateList, key=itemgetter(3, 2, 1, 4))
    for i in dateList_sorted:
        initial = ' ';        
        combined_i = initial.join(i);
        combined_dateList.append(combined_i);
    order = []
    for date in combined_dateList:
        for orig in range(len(listofDates)):
            if date == listofDates[orig]:
                order.append(orig);
    return order 

def add_months(sourcedate,months):
    month = sourcedate.month - 1 + months
    year = sourcedate.year + month / 12
    month = month % 12 + 1
    day = min(sourcedate.day,calendar.monthrange(year,month)[1])
    return datetime.date(year,month,day)

def splitByTime(sorted_results):
    start = sorted_results[0]['created_at'];
    start_split = start.split();
    
    ##INTIALIZING OUR THRESHOLDS
    dictionary_hash = {'Jan':1,'Feb':2,'Mar':3,'Apr':4,'May':5,'Jun':6,'Jul':7,'Aug':8,'Sep':9,'Oct':10,'Nov':11,'Dec':12}
    u = datetime.date(int(start_split[3]),int(dictionary_hash[start_split[2]]),int(start_split[1]));
    d = datetime.timedelta(days=1);
    one_day = u + d;
    d = datetime.timedelta(days=7);
    one_week = u + d;
    one_month =  add_months(u, 1);
    one_year = add_months(u, 12);
    #print (u, one_day, one_week, one_month, one_year);
    
    ##INITIALIZING OUR CATEGORIES
    within_one_day = [];
    within_one_week = [];
    within_one_month = [];
    within_one_year = [];
    
    ##Applying it to our tweet
    for i in sorted_results:
        date = i['created_at'];
        date_split = date.split()
        u = datetime.date(int(date_split[3]), int(dictionary_hash[date_split[2]]), int(date_split[1]));
        if ((one_day-u) <= datetime.timedelta(days=1)):
            within_one_day.append(i);
        if ((one_week-u) <= datetime.timedelta(days=7)):
            within_one_week.append(i);
        if ((one_week-u) <= datetime.timedelta(days=30)):
            within_one_month.append(i);
        if ((one_week-u) <= datetime.timedelta(days=365)):
            within_one_year.append(i);
    
    return within_one_day, within_one_week, within_one_month, within_one_year


import requests
import json
import math

# print(len(data["eventList"]))

def GetTotalPages():
    headers = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache, no-store, must-revalidate",
        "content-type": "application/json",
        "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "strict-transport-security": "max-age=16070400; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-frame-options": "deny",
        "x-xss-protectio": "1; mode=block"
    }

    url = "https://deprem.afad.gov.tr/EventData/GetEventsByFilter"

    payload = {
        "EventSearchFilterList": [
            {"FilterType": 9, "Value": "2023-08-19T19:41:24.157Z"},
            {"FilterType": 8, "Value": "2023-07-20T19:41:24.157Z"}
        ],
        "Skip": 0,
        "Take": 20,
        "SortDescriptor": {"field": "eventDate", "dir": "desc"}
    }

    response = requests.post(url, headers=headers, json=payload, cookies={'cookie-name': 'cookie-value'})
    data = response.json()
    totalData = data["totalCount"]

    return totalData

def GetAllData(total):
    events = []
    totalPage = math.ceil(total/20)

    for skip in range(0,totalPage) :

        print(f"( {skip+1} / {totalPage} )")

        headers = {
            "accept": "application/json, text/plain, */*",
            "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "no-cache, no-store, must-revalidate",
            "content-type": "application/json",
            "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "strict-transport-security": "max-age=16070400; includeSubDomains",
            "x-content-type-options": "nosniff",
            "x-frame-options": "deny",
            "x-xss-protectio": "1; mode=block"
        }

        url = "https://deprem.afad.gov.tr/EventData/GetEventsByFilter"

        payload = {
            "EventSearchFilterList": [
                {"FilterType": 9, "Value": "2023-08-19T19:41:24.157Z"},
                {"FilterType": 8, "Value": "2023-07-20T19:41:24.157Z"}
            ],
            "Skip": skip*20,
            "Take": 20,
            "SortDescriptor": {"field": "eventDate", "dir": "desc"}
        }

        response = requests.post(url, headers=headers, json=payload, cookies={'cookie-name': 'cookie-value'})
        data = response.json()["eventList"]

        for event in data:
            events.append(event)

    return events

totalData = GetTotalPages()
data = GetAllData(totalData)

dumpers = {"data":data}
filename = './gui/data.json'

with open(filename, 'w') as json_file:
    json.dump(dumpers, json_file, indent=4)
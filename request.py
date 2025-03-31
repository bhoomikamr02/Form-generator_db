import requests

url = "http://localhost:8000/forms/"
data = {
    "field_name_1": "Test Data",
    "field_name_2": 123
}

response = requests.post(url, json=data)
print(response.json())
import requests
import os

ListName = "The Return of the Disaster Class Hero"

pre_url = "https://www.go-manga.com/wp-content/uploads/2024/02/Solo-Leveling-ep" 
input_url = input("ep : ")
url = pre_url + input_url

base_url = url + "-{index}.jpg"
input = int(input("input end : "))

def download_images(base_url, start_index, end_index, output_folder="public/schema/"+ListName[0]+"/episode"+input_url):
    os.makedirs(output_folder, exist_ok=True)
    headers = {
        'User-Agent': 'Mozilla/5.0'
    }

    for i in range(start_index, end_index + 1):
        url = base_url.format(index=i)
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            file_name = os.path.join(output_folder, f'image_{i}.jpg')
            with open(file_name, 'wb') as f:
                f.write(response.content)
            print(f"Downloaded: {url}")
        except Exception as e:
            print(f"Cannot Downloaded {url}: {e}")

download_images(base_url, start_index=1, end_index=input)
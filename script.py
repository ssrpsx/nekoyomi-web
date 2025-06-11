import requests
import os

ListName = [
    "The Return of the Disaster Class Hero/",
    "Swordmaster is Youngest Son/",
    "Return of the Frozen Player/",
    "Return of the Flowery Mountain Sect/",
    "Mercenary Enrollment/",
    "Life of a Magic Academy Mage/",
    "The Infinite Mage/",
    "Duke Pendragon: Master of the White Dragon Archives/",
    "Damn Reincarnation/",
    "Absolute Person in Every Corner/",
    "The Beginning After the End/",
    "The Reason Why I Quit Demon King/",
    "I Obtained a Mythic Item/",
    "The Count’s Youngest Son is A Player/",
    "Apocalyptic Chef Awakening/",
    "Academy’s Genius Swordmaster/",
    "I am Drako Majstor/",
    "My Passive Skills Are Invincible/",
    "The Villain’s Match Is Too Perfect/",
    "Fated to Be Loved by Villains/"
            ]

url = input("url : ")
Manga = int(input("schema : "))

base_url = url + "-{index}.jpg"
input_folder = "episode" + url[-1]
input = int(input("input end : "))

def download_images(base_url, start_index, end_index, output_folder="src/schema/"+ListName[Manga]+input_folder):
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
            print(f"ดาวน์โหลด: {url}")
        except Exception as e:
            print(f"ไม่สามารถโหลด {url}: {e}")

download_images(base_url, start_index=1, end_index=input)
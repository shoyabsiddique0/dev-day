# 10x Developers DevDay 2024

## Web

Please locate all web projects in the /web directory.

### Blog


- Check the blog folder, import the postman collection into Postman for testing
- Run the server
- Use the /api/posts route directly from Postman to perform CRUD operations
- Please check out the code for detailed usage.
- All CRUD operations are listed in the below image


```cmd
npm install
npm start
```

![](https://raw.githubusercontent.com/shoyabsiddique0/dev-day/main/assets/web.1.blog.1.png?token=GHSAT0AAAAAACPVHDZTHCETOACSCE4JFVHAZP5PONQ)
![](https://github.com/shoyabsiddique0/dev-day/blob/main/assets/web.1.blog.2.png?raw=true)


### Canvas

Open `index.html` in the browser

![](https://raw.githubusercontent.com/shoyabsiddique0/dev-day/main/assets/web.2.canvas.1.png?token=GHSAT0AAAAAACPVHDZSQBGD6YKDJOAO6GLSZP5PR4A)

### URL Shortner

- Check the URL shortner folder, import the postman collection into Postman for testing
- Run the server
- Use the /shorten route to shorten any url by passing it into the body
- Then use the generated short link by typing locahlost:3000/<short-url> in the browser and you'll be redirected to the original link.
- It also supports expiry by time, so the link will be expired after the time you set.
- Please check out the code for detailed usage.

![](https://raw.githubusercontent.com/shoyabsiddique0/dev-day/main/assets/web.3.shortner.png?token=GHSAT0AAAAAACPVHDZTTMKISRNRTT33GZ3WZP5PPYA)

![](https://raw.githubusercontent.com/shoyabsiddique0/dev-day/main/assets/web.1.blog.2.png?token=GHSAT0AAAAAACPVHDZTJLDZDBBJWAQDTQ52ZP5PO3A)

### Collaborative DocEditor

By the time you review this, the link may have expired but if not test it by visiting https://4df3-14-139-162-2.ngrok-free.app/ and open the link in two different tabs to see the real-time collaboration.

- Enter ID 1 in both tabs to begin editing the same document.

Recorded Demo Here -> (Click on the below image to watch it)
[![YouTube Video](https://img.youtube.com/vi/dGf55YUMrBE/0.jpg)](https://www.youtube.com/watch?v=dGf55YUMrBE)


### Translation

Open `index.html` in the browser
![](https://raw.githubusercontent.com/shoyabsiddique0/dev-day/main/assets/web.5.translate.png?token=GHSAT0AAAAAACPVHDZS2XTTDWQKXBJ4RNW2ZP5PS7Q)


### SlackBot

- Create a test workspace
- Creat a test app
- Run the server by running the `main.ipynb`
- Replace the code with your Access Token and Refresh Token

- **Create a Slack Bot App**
![](https://raw.githubusercontent.com/shoyabsiddique0/dev-day/main/assets/web.6.slack.1.png?token=GHSAT0AAAAAACPVHDZSDIWLJS7TLRX2J4IWZP5PT4Q)

- **Add DevDay Slackbot to workspace**
![](https://raw.githubusercontent.com/shoyabsiddique0/dev-day/main/assets/web.6.slack.2.png?token=GHSAT0AAAAAACPVHDZS3JXHCZXF34INILTIZP5PT5Q)

### BookMark Management

- Open Chrome Browser
- Search for chrome://extensions
- Add the folder as an extension with "Load Unpacked"
- Click on the extension to see the bookmark manager
- Add, Delete, Update bookmarks

![](https://raw.githubusercontent.com/shoyabsiddique0/dev-day/main/assets/web.7.bookmark.1.png)

![](https://raw.githubusercontent.com/shoyabsiddique0/dev-day/main/assets/web.7.bookmark.2.png)

## ML

Please locate all web projects in the /ML directory. There are Jupyter Notebooks (.ipynbs) with cells running

### House Price Prediction - Please Check Folder
![](https://raw.githubusercontent.com/shoyabsiddique0/dev-day/main/assets/ml.housing.1.png?token=GHSAT0AAAAAACPVHDZS6OMU6OHMSIULEREKZP5PMBA)

*Note: Units is in 1000s* I.e 1000$ = 1

### Fraud Transaction Detection -
All code resides in this notebook.

- Before running please go to `ML/Kaggle.json` and upload it in the notebook instance before running all the cells.We are fetching the dataset from Kaggle's API due to high size.
<https://colab.research.google.com/drive/1yU5t4QwEShQyY6VEJx2lulsb0-HS9s1T?usp=sharing>

### Customer Churn Prediction - Please check folder

### Movie Recommendation System - Please check folder
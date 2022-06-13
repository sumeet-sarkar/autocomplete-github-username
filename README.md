# Autocomplete github users
An autocomplete component in react which fetches details of github users.

# Table of Content
<ol>
  <li><a href=#howIBuiltIt>How I built it</a></li>
  <li><a href=#looking>Details about things you are looking for as mentioned in assignment doc</a></li>
  <li><a href=#building>Building</a></li>
  <li><a href=#running>Running</a></li>
</ol>

# <span id='howIBuiltIt'>How I built it</span>

It is pretty straight forward and there wasn't any tough decision that I had to take so, I'll just explain the flow in which i build this project.

I started with create-react-app boilerplate.
Then developed the html css part to as good as I could imagine it to be. The reason to develop it first before any functionalities is so that I could have a look and feel from a user's point of view. I would also get some ideas on how the UX could be made better. For example, having the focus on the searchbar on render.
The UX developed is also very much inspired from google.

Then I slowly added basic features one by one. I could explore some bugs while developing new features which I fixed. Not saying there wouldn't be any more though.

I tried to separate the logic of different parts as much as I could but I'm not very happy with SearchBar component since the file has already become a bit huge. But since it's all related logic and it barely could be used somewhere else, not sure how can I separate those out.

I'm not very happy with using "Loading" feature in this project from a UX standpoint. But for the sake of displaying how I'd implement it if I couldn't convince my boss to not add this feature, its been added in this app.

The delay for debouncing is set to 1 sec, only for testing and easy to visualise purpose. It can be configured in "src/utils/config.ts:5". Please do not think that my code sucks for that delay only.

In the end, I formatted the file using Prettier and to got some consistency in the way I wrote code.

# <span id='looking'>Details about things you are looking for as mentioned in assignment doc</span>

## Handling a large query result
Github does send a large query result. From the network standpoint, there's very little I could do since I also couln't find any parameter that would limit the number of users. To not overpopulate the dom unnecessarily, I sliced the entire list to have only 5 results and displayed that.

## Frequency of requests
There are 3 scenarios when the requests are made:
1. if the response of request is not cached
2. if there is a gap of 1 second between input value changing. It could be either by typing, clicking on select button, through pressing up and down arrows or pressing tab.
3. if the searchbar is got back to focus and the response is not cached.

## Caching strategy used
I don't think there is a name for it but I'm storing the request path and params with a separator as the key and the response to it as the value. It can be further optimised to store only number of responses that we display in the UI but the logic remains the same.
Reference to where I got the caching logic from can be found in this link: https://dev.to/nosyminotaur/caching-network-requests-on-the-frontend-dmh

## Loading, empty and error states
Loading and empty states are being shown on the UI in the search results.

Error states are consoled to the browser.

I tried alerting the error but it goes on an infinite loop. I'll look into that in my free time.

# <span id='building'>Building</span>
[Yarn package manager](https://classic.yarnpkg.com/)

[Installation steps for yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

```js
yarn install
```

# <span id='running'>Running</span>

```js
yarn start
```

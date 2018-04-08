chrome.storage.sync.get(['websites'],function(data)
{
  let websites = data.websites || [];

  //i need to set the website url before the set storage function
  let aButton= document.getElementById("addButton");
  let cButton= document.getElementById("resetButton");


  function addButton()
  {
    let website = prompt("enter the website url");
    if (!website) {
      return;
    }
    websites.push(website);
    setStorage();
  }

  function resetButton()
  {
    chrome.storage.sync.set({websites: []},function(){});
     websites=[];
  }

  function buttonClicked()
  {
      chrome.storage.sync.get(['websites'],function(websites)
      {
        for(const website of websites.websites)
        {
          chrome.tabs.create({url:website});
        }
      }
    );
  }

  chrome.browserAction.onClicked.addListener(buttonClicked);

  function setStorage()
  {
      chrome.storage.sync.set({websites},function(){});
  }



  aButton.addEventListener("click", addButton);
  cButton.addEventListener("click",resetButton);




}
);

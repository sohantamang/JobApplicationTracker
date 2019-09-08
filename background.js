console.log("Background script run");

chrome.browserAction.onClicked.addListener(buttonClicked);
chrome.runtime.onMessage.addListener(gotMessage);

//require 'strict';

console.log("Job to txt");


function buttonClicked(tab) {

  console.log(tab);
  let msg = {
    txt: "hello"
  }
  chrome.tabs.sendMessage(tab.id, msg);
}


function gotMessage(message, sender, sendResponse){
  console.log(message);
  var blob = new Blob([message.title,'\n', message.company,'\n', message.location, '\n', '\n','\n', message.description], {type: "text/plain"});
  var url = URL.createObjectURL(blob);
  var date = new Date();
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();
  var year = date.getUTCFullYear();
  var time = month + '-' + day + '-' + year;
  var file_name = message.company + '-' + message.title + time +'.txt';
  chrome.downloads.download({
    url: url,
    filename: file_name // Optional
  });
}
//message.title,'\n', message.company,'\n', message.location, '\n', '\n','\n', message.description

'use strict';

console.log('Background script');

chrome.browserAction.onClicked.addListener(buttonClicked);
chrome.runtime.onMessage.addListener(gotMessage);


function buttonClicked(tab) {
  console.log('Extension clicked');
  let msg = { txt: 'initiated' };
  chrome.tabs.sendMessage(tab.id, msg);
}


function gotMessage(message, sender, sendResponse){
  console.log(message);
  var blob = new Blob([message.title,'\n', message.company,'\n', message.location, '\n', message.URL, '\n','\n', message.description], {type: "text/plain"});
  var url = URL.createObjectURL(blob);
  var date = new Date();
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();
  var year = date.getUTCFullYear();
  var time = month + '-' + day + '-' + year;
  var file_name = message.company + '-' + time +'.txt';
  chrome.downloads.download({
    url: url,
    filename: 'job-applications/' + file_name
  });
}

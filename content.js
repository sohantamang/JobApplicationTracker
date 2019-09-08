console.log("Anime ad blocker extension runing");

/*var iframes = document.querySelectorAll('[id^=adsIfrme]')
for(elt of iframes){
  console.log(elt);
  elt.parentNode.removeChild(elt);

}*/
//$("input[name^='adsIfrme']").remove();

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
  var title = '';
  var company = '';
  var location = '';
  var job_description = '';
  console.log(message);
  current_url = window.location.toString();
  console.log(current_url);
  title = $("#vjs-jobtitle").text();
  company = $("#vjs-cn").text();
  location = $("#vjs-loc").text();
  childrens = $("#vjs-desc").children();
  for(var i=0; i<childrens.length; i++){
    console.log(childrens);
    job_description += childrens[i].innerText;
    job_description += '\n\n';
  }

  var response = {
    title: title,
    company: company,
    location: location,
    description: job_description,
  };
  console.log(job_description);
  if(job_description !== '')
    chrome.runtime.sendMessage(response);
}
/*
  job_desc:
  title:
  company:
  location:
  date:

  filename: timestamp-position-company.txt
  */

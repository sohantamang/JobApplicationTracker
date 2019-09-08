console.log("Job Application Tracker running");

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
  var current_url = window.location.toString();
  console.log(current_url);
  var jobsite = '';

  if(current_url.startsWith('https://www.indeed.com/jobs?')){
    jobsite = 'indeed';
    title = document.getElementById("vjs-jobtitle").innerText;
    company = document.getElementById("vjs-cn").innerText;
    location = document.getElementById("vjs-loc").innerText;
    document.querySelectorAll('#vjs-desc > *').forEach((child) => {
      job_description += child.innerText;
      job_description += '\n\n';
    });
  }

  else if(current_url.startsWith('https://www.glassdoor.com/Job/')){
    console.log("glassdoor");
    jobsite = 'glassdoor';
    company = document.querySelector('.employerName').innerText;
    title = document.querySelector('.header h1').innerText;
    location = document.querySelector('.compInfo').lastElementChild.innerText;
    document.querySelectorAll('#JobDescriptionContainer > *').forEach((child) => {
      job_description += child.innerText;
      job_description += '\n\n';
    });
  }

  var response = {
    jobsite: jobsite,
    URL: current_url,
    title: title,
    company: company,
    location: location,
    description: job_description,
  };

  console.log(response);
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

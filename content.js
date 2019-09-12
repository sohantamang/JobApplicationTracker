'use strict';

console.log("Job Application Tracker running");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
  var job_info = {
    jobsite: '',
    URL: '',
    title: '',
    company: '',
    location: '',
    description: ''
  };

  job_info.URL = window.location.toString();
  console.log(message);
  console.log(job_info.URL);

  if(job_info.URL.startsWith('https://www.indeed.com/jobs?')){
    job_info.jobsite = 'indeed';
    job_info.title = document.getElementById("vjs-jobtitle").innerText;
    job_info.company = document.getElementById("vjs-cn").innerText;
    job_info.location = document.getElementById("vjs-loc").innerText;
    document.querySelectorAll('#vjs-desc > *').forEach((child) => {
      job_info.description += child.innerText;
      job_info.description += '\n\n';
    });
  }

  else if(job_info.URL.startsWith('https://www.glassdoor.com/Job/')){
    console.log("glassdoor");
    job_info.jobsite = 'glassdoor';
    job_info.company = document.querySelector('.employerName').innerText;
    job_info.title = document.querySelector('.header h1').innerText;
    job_info.location = document.querySelector('.compInfo').lastElementChild.innerText;
    document.querySelectorAll('#JobDescriptionContainer > *').forEach((child) => {
      job_info.description += child.innerText;
      job_info.description += '\n\n';
    });
  }

  console.log(response);
  if(job_description !== '')
    chrome.runtime.sendMessage(response);
}

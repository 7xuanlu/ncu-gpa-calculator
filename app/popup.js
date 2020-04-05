'use strict'

import GPACalculator from './gpa-calculator.js';

let gpaBtn = document.getElementById('gpaBtn');
let gradeDoc = null;  // Grade root node

// chrome.storage.sync.get('color', function (data) {
//     changeColor.style.backgroundColor = data.color;
//     changeColor.setAttribute('value', data.color);
// });

/**
 * Callback to request html from https://cis.ncu.edu.tw/ScoreInquiries/student/student_record.php
 * function
 * @param {cookies} cookies 
 */
const callback = (cookies) => {
    let cookieHeader = "";
    cookies.map((cookie) => {
        cookieHeader += `${cookie.name}=${cookie.value}; `
    });
    console.log(cookieHeader);

    let url = 'https://cis.ncu.edu.tw/ScoreInquiries/student/student_record.php';
    let headers = new Headers();
    headers.append('Cookie', cookieHeader);

    const init = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };

    const getHtmlAsync = async (url) => {
        console.log('Getting students grade records');
        let response = await fetch(url);
        let htmlString = await response.text()

        let parser = new DOMParser();
        let doc = parser.parseFromString(htmlString, 'text/html');
        console.log(doc);
        return doc;
    }

    getHtmlAsync(url, init)
        .then(doc => { gradeDoc = doc.getElementsByTagName('table')[0].children[0] });
}

// Get browser's cookies
chrome.cookies.getAll({ url: 'https://cis.ncu.edu.tw' }, callback);

// Calculate overall GPA when the button is clicked
gpaBtn.onclick = () => {
    const gpaCalculator = new GPACalculator();

    console.log(gradeDoc);
    let allGradeNodes = gradeDoc.childNodes;
    allGradeNodes.forEach((item, index) => {
        if (item.className === 'list3') return; // Skip semester row
        let grade = item.lastChild.innerHTML;
        let credit = item.children[3].innerHTML;
        gpaCalculator.accumulate(grade, credit);
    });

    document.getElementById('gpa').innerHTML = gpaCalculator.gpa;
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //     chrome.tabs.executeScript(
    //         tabs[0].id,
    //         { code: 'document.body.style.backgroundColor = "' + color + '";' });
    // });
};
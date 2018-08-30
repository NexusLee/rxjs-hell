import './whotofollow.css';

import { Observable } from 'rxjs';
import { map, flatMap, startWith, combineLatest, merge } from 'rxjs/operators';
import { interval }  from 'rxjs/observable/interval';
import { timer }  from 'rxjs/observable/timer';
import { fromEvent }  from 'rxjs/observable/fromEvent';
import { fromPromise }  from 'rxjs/observable/fromPromise';

let refreshButton = document.querySelector('.refresh');
let closeButton1 = document.querySelector('.close1');
let closeButton2 = document.querySelector('.close2');
let closeButton3 = document.querySelector('.close3');


let refreshClickStream = fromEvent(refreshButton, 'click');
let close1ClickStream = fromEvent(closeButton1, 'click');
let close2ClickStream = fromEvent(closeButton2, 'click');
let close3ClickStream = fromEvent(closeButton3, 'click');

let requestStream = refreshClickStream.pipe(
    startWith('startup click'),
    map(() => {
        var randomOffset = Math.floor(Math.random() * 500);
        return 'https://api.github.com/users?since=' + randomOffset;
    })
);

let responseStream = requestStream.pipe(
    flatMap((requestUrl: string) => {
        return fromPromise(
            fetch(requestUrl).then((res: any) => {
                console.log(res);

                return res.ok ? res.json() : Promise.reject(`${res.statusText} ${res.status}`);
            })
        );
    }),
    shareReplay(1)
);

let suggestion1Stream = close1ClickStream.pipe(
    startWith('startup click'),
    combineLatest(responseStream, (click: any, listUsers: Array<any>) => {
        return listUsers[Math.floor(Math.random() * listUsers.length)];
    }),
    merge(refreshClickStream.pipe(
        map(() => { return null; })
    )),
    startWith(null)
);
let suggestion2Stream = close2ClickStream.pipe(
    startWith('startup click'),
    combineLatest(responseStream, (click: any, listUsers: Array<any>) => {
        return listUsers[Math.floor(Math.random() * listUsers.length)];
    }),
    merge(refreshClickStream.pipe(
        map(() => { return null; })
    )),
    startWith(null)
);
let suggestion3Stream = close3ClickStream.pipe(
    startWith('startup click'),
    combineLatest(responseStream, (click: any, listUsers: Array<any>) => {
        return listUsers[Math.floor(Math.random() * listUsers.length)];
    }),
    merge(refreshClickStream.pipe(
        map(() => { return null; })
    )),
    startWith(null)
);

suggestion1Stream.subscribe((suggestion) => {
    if (suggestion === null) {

    } else {
        renderSuggestion(suggestion, '.suggestion1');
    }
});
suggestion2Stream.subscribe((suggestion) => {
    if (suggestion === null) {

    } else {
        renderSuggestion(suggestion, '.suggestion2');
    }
});
suggestion3Stream.subscribe((suggestion) => {
    if (suggestion === null) {

    } else {
        renderSuggestion(suggestion, '.suggestion3');
    }
});

function renderSuggestion(suggestion, selector) {
    console.info(suggestion);
    let suggestionEl = document.querySelector(selector);
    if (suggestion === null) {
        suggestionEl.style.visibility = 'hidden';
    } else {
        suggestionEl.style.visibility = 'visible';
        var usernameEl = suggestionEl.querySelector('.username');
        usernameEl.href = suggestion.html_url;
        usernameEl.textContent = suggestion.login;
        var imgEl = suggestionEl.querySelector('img');
        imgEl.src = '';
        imgEl.src = suggestion.avatar_url;
    }
}

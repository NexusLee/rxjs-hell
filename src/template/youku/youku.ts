import './youku.css';

import { Observable } from 'rxjs';

const video = document.getElementById('video');
const anchor = document.getElementById('anchor');

const scroll = Observable.fromEvent(document, 'scroll');
const mouseDown = Observable.fromEvent<MouseEvent>(video, 'mousedown');
const mouseUp = Observable.fromEvent<MouseEvent>(document, 'mouseup');
const mouseMove = Observable.fromEvent<MouseEvent>(document, 'mousemove');

const validValue = (value, max, min) => {
    return Math.min(Math.max(value, min), max);
};

scroll
    .map(e => anchor.getBoundingClientRect().bottom < 0)
    .subscribe(bool => {
        if (bool) {
            video.classList.add('video-fixed');
        } else {
            video.classList.remove('video-fixed');
        }
    });

mouseDown
    .filter(e => video.classList.contains('video-fixed'))
    .map(e => mouseMove.takeUntil(mouseUp))
    .concatAll()
    .withLatestFrom(mouseDown, (move, down) => {
        return {
            x: validValue(move.clientX - down.offsetX, window.innerWidth - 320, 0),
            y: validValue(move.clientY - down.offsetY, window.innerHeight - 180, 0)
        };
    })
    .subscribe(pos => {
        video.style.top = pos.y + 'px';
        video.style.left = pos.x + 'px';
    });

import './cube.css';

import { of }  from 'rxjs/observable/of';
import { interval }  from 'rxjs/observable/interval';
import { map, merge, mergeMap }  from 'rxjs/operators';

const interval$ = interval(2000);
let cube = document.querySelector('.cube');
let source = of(cube);
source.pipe(
    mergeMap(
        v => interval$, (e: any, res: any) => {
            if (res % 2 === 0) {
                e.style.transform = `translate(100px, 0)`;
            } else {
                e.style.transform = `translate(0, 0)`;
            }
        }
    )
).subscribe();
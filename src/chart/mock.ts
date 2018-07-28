export class Mock {

    static fetch(): Promise<Number> {
        return fetch('https://zan.wilddogio.com/age.json')
            .then((res: any) => {
                    return 20 + Mock.randomAge(10);
                }
            );
    }

    static randomAge(x) {
        return  Math.floor(1 + Math.random() * x);
    }
}

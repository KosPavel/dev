function rand() {
    let used = [];
    let num, status;

    return function() {

        if (used.length === 100) {
            return console.log('array is full');
        } else {
            while (used.length < 100) {
                status = false;
                num = newNum();

                for (let i = 0; i < used.length; i++) {
                    if (num === used[i]) {
                        status = true;
                        break;
                    };
                };

                if (status === false) {
                    used.push(num);
                    return console.log(num, used);
                };
            };
        };

        function newNum() {
            return Math.floor(Math.random() * (100) + 1);
        };
    };
};


let myRand = rand();

for (let i = 0; i < 101; i++) {
    myRand();
};
// async function testing() {
//     const print = new Promise((resolve) =>
//         setTimeout(() => {
//             console.log('ini line 1');
//             resolve('test')
//         }, 1000)
//     );
//     console.log(print);
//     console.log('ini line 2');
// }

// async function coba() {
//     try {
//         const coba = await testing();
//         console.log(coba);
//     } catch (error) {
//         console.log(error);
//     }
// }

// testing();

function cobaPromise() {
    const waktu = 5000;
    return new Promise((resolve, reject) => {
        if (waktu < 5000) {
            setTimeout(() => {
                resolve('selesai')
            }, 3000);
        } else {
            reject('kelamaan');
        }
    })
};

async function cobaAsync() {
    try {
        const coba = await cobaPromise();
        console.log(coba);
    } catch (error) {
        console.log(error);
    }

}
cobaAsync();
console.log('line 2');
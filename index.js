const transTheStringArray = (str) => {
    try {
        const strArr = str.split(' ');
        return strArr;
    } catch (err) {
        console.log(err);
    }
}

const showTheQuestion = (str) => {
    const arr = transTheStringArray(str);
    let indexCurr = 0;
    arr.map((word, id) => {
        if (word === '?') {
            const newArr = arr.slice(indexCurr, id);
            console.log(newArr);
            indexCurr = id + 1;
        }
        else if (word === '.') {
            indexCurr = id + 1;
        }
    }) 
}

showTheQuestion('is output');
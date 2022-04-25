

export function AddStorage(value){
    let historic =  JSON.parse(localStorage.getItem('historic')) ? JSON.parse(localStorage.getItem('historic')) : value ;

    console.log(historic)

    if (historic === undefined){
        historic.push(value);
        JSON.parse(localStorage.setItem('historic', historic));
        console.log(historic);
    }
}

export function Three (data, all){
    let ctr = all;
    let list = [];
    if (ctr === 3){
        for (let i = 0; i < ctr; i++){
            list.push(data[i]);
        }
        return list;
    }

    if (ctr > 3 && ctr < 100){
        for (let i = ctr - 3; i < ctr; i++){
            list.push(data[i]);
        }
        return list;
    }

    if (ctr === 100){
        list = data;
    }
    return list;
}


export function AddStorage(value){
    let historic =  JSON.parse(localStorage.getItem('historic')) ? JSON.parse(localStorage.getItem('historic')) : value ;

    console.log(historic)

    if (historic === undefined){
        historic.push(value);
        JSON.parse(localStorage.setItem('historic', historic));
        console.log(historic);
    }
}
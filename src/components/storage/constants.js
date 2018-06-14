var listtitle = null;
var listitemarray=[];


export const setTitle = (title) => {
    listtitle = title;
}

export const getTitle = () => {
    return listtitle;
}

export const setListItems=(listitem)=>{
    return listitemarray=listitem;
}

export const getListItems=()=>{
    return listitemarray;
}
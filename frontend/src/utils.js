function binSearch(arr, id, start, end){
    if(start > end){
        return false;
    }

    let mid = Math.floor((start + end)/2);

    if(arr[mid] < id){
        return binSearch(arr, id, start, mid-1);
    }
    else{
        return binSearch(arr, id, mid+1, end);
    }
}

export { binSearch }
export function verifiedTaskExisted (taskObj, arrayTask) { 
    if (arrayTask.lenght <= 0) return
    const existed = arrayTask.some(value => value.task === taskObj.task)
    if (existed === true) console.log(true);
    return false;
}


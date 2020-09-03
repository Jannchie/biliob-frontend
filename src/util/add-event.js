function addEvent(obj, type, fn) {
    if (obj.attachEvent) { //ie
        obj.attachEvent('on' + type, function () {
            fn.call(obj);
        })
    } else {
        obj.addEventListener(type, fn, false);
    }
}
export default addEvent;
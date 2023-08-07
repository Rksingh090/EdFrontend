export var slugify = (str) => {
    // trim leading/trailing whitespace
    str = str.replace(/^\s+|\s+$/g, ''); 
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/\s+/g, '-'); // replace multiple spaces with a single space
    str = str.replace(/-+/g, '-'); // replace multiple hyphens with a single hyphen

    return str;
};
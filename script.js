/**
 * Created by Bikram Pandit on 8/18/2018.
 */
function submit() {
    let s = document.getElementById("json_data").value;
    document.getElementById('yaml_out').value = '';
    let json_object = JSON.parse(s);
    parse(json_object, '')
}

function isEmpty(obj) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

function parse(s, indent) {
    if (Array.isArray(s)) {
        write(indent + 'type: array');
        write(indent + 'items:');
        if (s.length !== 0) {
            parse(s[0], indent + '  ');
        } else {
            write(indent + '  type: object');
        }
    } else if (typeof s === 'object') {
        write(indent + 'type: object');
        if (isEmpty(s)) {
            return;
        }
        write(indent + 'properties:');
        for (let key in s) {
            write(indent + '  ' + key + ':');
            if(s.hasOwnProperty(key)){
                parse(s[key], indent + '    ');
            }
        }
    } else {
        write(indent + 'type: ' + (typeof s));
    }
}

function write(s) {
    // console.log(s);
    document.getElementById('yaml_out').value += s + "\n";
}
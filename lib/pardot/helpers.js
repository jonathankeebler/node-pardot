/**
 * Recursively encode an object as application/x-www-form-urlencoded.
 *
 * @param value Value to encode
 * @param key Key to encode (not required for top-level objects)
 * @return Encoded object
 */
var serialize = module.exports.serialize = function (value, key) {

  var output;

  if (!key && key !== 0)
    key = '';

    if (Array.isArray(value)) {
        output = [];
        value.forEach(function(val, index) {
            if (key !== '') index = key + '[' + index + ']';
            output.push(serialize(val, index));
        }, this);
        return output.join('&');
    } else if (typeof(value) == 'object') {
        output = [];
        for (var name in value) {
            if (value[name] && value.hasOwnProperty(name)) {
                output.push(serialize(value[name], key !== '' ? key + '[' + name + ']' : name));
            }
        }
        return output.join('&');
    } else {
        return key + '=' + encodeURIComponent(value);
    }

};

/**
 * Creates an Error with information received from Pardot. In addition to an
 * error message it also includes an error code.
 *
 *
 * @param message The error message
 * @param code The error code
 * @return Instance of {@link Error}
 */
var createPardotError = module.exports.createPardotError = function (response) {
  var code = response['@attributes']['err_code']
  code = parseInt(code, 10) || "CODE NOT FOUND"

  var message = response.err || "Message not found";

  var error = new Error(message);
  error.code = code;

  return error;
};

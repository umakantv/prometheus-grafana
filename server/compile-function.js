// Just testing compile function from morgan

function compile (format) {
  if (typeof format !== 'string') {
    throw new TypeError('argument format must be a string')
  }

  var fmt = String(JSON.stringify(format))

  console.log(fmt)
  var js = '  "use strict"\n  return ' + fmt.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function (_, name, arg) {
    var tokenArguments = 'req, res'
    var tokenFunction = 'tokens[' + String(JSON.stringify(name)) + ']'

    if (arg !== undefined) {
      tokenArguments += ', ' + String(JSON.stringify(arg))
    }

    return '" +\n    (' + tokenFunction + '(' + tokenArguments + ') || "-") + "'
  })

  console.log(js);
  // eslint-disable-next-line no-new-func
  return new Function('tokens, req, res', js)
}

let fn = compile(':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms')

console.log(fn.toString())

':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'.replace(/:[^a-z][]/g)

// Colorful output
// console.log('\x1b[32mHey')
// create a tree of directories using https://github.com/substack/node-mkdirp
var mkdirp   = require('mkdirp');
// delete the temporary directory tree using https://github.com/isaacs/rimraf
var rimraf   = require('rimraf');
var fs       = require('fs');
var path     = require('path');
var chalk    = require('chalk');
var green    = chalk.green;
var rootdir  =  __dirname+'/fixture'; // root temporary directory
var dirtree  = rootdir + '/foo/bar/baz';
var filename = dirtree + '/hello.txt';
var empty    = dirtree + '/empty';

/** setup creates a sample directory tree:

tmp/
 |-- hi.js
 |-- foo/
      |-- bar/
      |    |-- baz/
      |         |-- hello.txt
      |         |-- empty/
      |-- bit/
      |-- bat/
      |-- bye.js
**/

var setup = function(callback) {
  mkdirp(empty, function(err){
    if (err) console.error(err)
  })

  mkdirp(rootdir+"/foo/bit", function(err){
    if (err) console.error(err)
  })

  mkdirp(rootdir+"/foo/bat", function(err){
    if (err) console.error(err)
  })


  mkdirp(dirtree, function (err) {
    if (err) console.error(err)
    // else console.log('pow!')

    // create a file that will be *Modified* in our test
    var filepath = path.join(rootdir+'/hi.js')
    fs.writeFile(filepath, "alert('hi!');", function(err) {
      if(err) {
        return console.log(err, filepath);
      }
      console.log(green("✓ " + filepath + " saved!"));
    });
    // create a file that will be *Modified* in our test
    fs.writeFile(filename, "Hi!", function(err) {
      if(err) {
        return console.log(err);
      }
      console.log(green("✓ " + filename + " saved!"));
      callback();
    });

    var filepath3 = rootdir+'/foo/bye.js'
    fs.writeFile(filepath3, "alert('bye!');", function(err) {
      if(err) {
        return console.log(err, filepath3);
      }
      console.log(green("✓ " + filepath3 + " saved!"));
    });

  });
}

var teardown = function(callback) {
  rimraf(rootdir, function() {
    callback();
  })
}

// module.exports = {
//   setup    : setup,     // export these methods for use in the test
//   teardown : teardown,
//   filename : filename,  // we will update this in our test
//   rootdir  : rootdir,   // and add a file to this dir
//   dirtree  : dirtree,   // and add a file to the grandchild dir
//   empty    : empty      // empty dir
// }
module.exports = setup;
// setup(function(){
//   console.log("DONE!!");
// })
// teardown(function(){
//   console.log("DONE!!");
// })

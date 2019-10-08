const brain = require('brain.js');
const data = require('./models.js');
const fs = require('fs');
//console.log(data);

let trainedNet;

const encode = (arg) => {
  return arg.split('').map(x => (x.charCodeAt(0) / 255));
}

const processTrainingData = (data) => {
  return data.map(d => {
      return {
          input: encode(d.input),
          output: d.output
      }
  })
}

const train = (data) => {
  let net = new brain.NeuralNetwork();
  net.train(processTrainingData(data));
  trainedNet = net.toFunction();
  console.log('Finished training...');
};

function execute(input) {
  let results = trainedNet(encode(input));
  let output = results.question >= results.normal ? 'Question' : 'Normal';
  console.log(results);
  return output;
}

train(data);

// Processing

console.log(execute("And with that in mind, let’s dive into data types in JavaScript and see if we can figure out their quirks"));

const processText = (path) => {
    const contents = fs.readFileSync(path, 'utf8');
    //console.log(contents);
    let indexCurr = 0;
    for (let id = 0; id < contents.length; id++) {
      let value = contents[id]; 
      if (value === '?' || value === '.' || value === '!') {
        const newArr = contents.slice(indexCurr, id);
        indexCurr = id + 1; 
        console.log(newArr + ': ' + execute(newArr));
      }
    }
}

//processText('./text.txt');
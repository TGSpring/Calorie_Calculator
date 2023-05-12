const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to calculate daily caloric needs
function calculateDailyCaloricNeeds(weight, height, age, gender, activityLevel) {
  let bmr;

  // Calculate BMR based on gender
  if (gender === 'M') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === 'F') {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    console.log('Invalid gender input!');
    return;
  }

  // Adjust BMR based on activity level
  let activityFactor;
  switch (activityLevel) {
    case 'sedentary':
      activityFactor = 1.2;
      break;
    case 'light':
      activityFactor = 1.375;
      break;
    case 'moderate':
      activityFactor = 1.55;
      break;
    case 'heavy':
      activityFactor = 1.725;
      break;
    default:
      console.log('Invalid activity level input!');
      return;
  }

  const dailyCaloricNeeds = Math.round(bmr * activityFactor);
  return dailyCaloricNeeds;
}

// Function to prompt user for inputs
function getUserInputs() {
  rl.question('Please enter your weight in pounds: ', (weight) => {
    rl.question('Please enter your height in inches: ', (height) => {
      rl.question('Please enter your age in years: ', (age) => {
        rl.question('Please enter your gender (M/F): ', (gender) => {
          rl.question('Please enter your activity level (sedentary/light/moderate/heavy): ', (activityLevel) => {
            const dailyCaloricNeeds = calculateDailyCaloricNeeds(parseFloat(weight), parseFloat(height), parseInt(age), gender.toUpperCase(), activityLevel.toLowerCase());
            console.log('Your daily caloric needs are:', dailyCaloricNeeds, 'calories per day');
            rl.close();
          });
        });
      });
    });
  });
}

getUserInputs();


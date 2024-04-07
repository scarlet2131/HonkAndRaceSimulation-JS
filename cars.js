class Car {
  constructor(brand, model, year, color, price, gas) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.color = color;
    this.price = price;
    this.gas = gas;
  }

  //honk class to print the value 
  honk() {
    return `Tuut tuut - ${this.brand} ${this.model}, Year: ${this.year}, Color: ${this.color}, Price: $${this.price}, Gas: ${this.gas} litres`;
  }

//updating gas based on year
  updateGas(currentYear) {
    const yearDifference = currentYear - this.year;
    const gasLoss = 5 + Math.max(yearDifference, 0);
    this.gas -= gasLoss;
    if (this.gas < 0) this.gas = 0;
  }
}

// Create car objects
const cars = [
  new Car('Honda', 'CR-V', 2023, 'Red', 50000, 45),
  new Car('Ford', 'F-150', 2020, 'Black', 25000, 30),
  new Car('BMW', 'X5', 2022, 'Green', 60000, 65),
  new Car('Mazda', 'CX-5', 2019, 'White', 15000, 60),
  new Car('Audi', 'Q7', 2018, 'Silver', 52000, 47),
  new Car('Kia', 'Forte', 2020, 'Blue', 21000, 56)
];

let raceInProgress = false;

function simulateRace() {
    if (raceInProgress) return; // Prevent multiple race instances
    raceInProgress = true;
    document.getElementById('startRace').disabled = true; // Disable the start button during the race

    const currentYear = new Date().getFullYear();
    const raceResultsContainer = document.getElementById('raceResults');
    raceResultsContainer.innerHTML = '';

    let turn = 1;
    const raceInterval = setInterval(() => {
        cars.forEach(car => car.updateGas(currentYear));
        cars.sort((a, b) => b.gas - a.gas);

        raceResultsContainer.innerHTML = `<strong>Turn ${turn}</strong><br>` +
            cars.map((car, index) => `${index === 0 ? '🏆' : ''}${car.honk()}`).join('<br>');

        if (cars.every(car => car.gas <= 0) || turn === 7) {
            clearInterval(raceInterval);
            raceResultsContainer.innerHTML += `<br><strong>Race Finished</strong>`;
            document.getElementById('startRace').disabled = false; // Re-enable the start button
            raceInProgress = false; // Allow race to be started again
        }

        turn++;
    }, 1000);
}

document.getElementById('startRace').addEventListener('click', () => {
    if (!raceInProgress) {
        simulateRace();
    }
});



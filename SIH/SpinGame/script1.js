const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 45, value: 2 },
  { minDegree: 46, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 135, value: 8 },
  { minDegree: 136, maxDegree: 180, value: 7 },
  { minDegree: 181, maxDegree: 225, value: 6 },
  { minDegree: 226, maxDegree: 270, value: 5 },
  { minDegree: 271, maxDegree: 315, value: 4 },
  { minDegree: 316, maxDegree: 360, value: 3 },
];
//Size of each piece
const data = [5, 5, 5, 5, 5, 6, 5, 5];
//background color for each piece
var pieColors = [
  "#F0E243",
  "#357CD3",
  "#F582F5",
  "#B6F05B",
  "#9F68F0",
  "#53E3F0",
  "#F0854F",
  "#F55D5B",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: ['Equality', 'Liberty', 'Fraternity', 'Justice', 'Republic', 'Democratic', 'Socialist', 'Secular'],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#000000",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 20 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= 0 && angleValue <= 45) {
      finalValue.innerHTML = <p>Liberty is the freedom to live your life in the way that you want, without interference from other people</p>;
      spinBtn.disabled = false;
      break;
    }

    if (angleValue >= 46 && angleValue <= 90) {
      finalValue.innerHTML = <p>Equality means treating everyone fairly and giving them the same rights and opportunities</p>;
      spinBtn.disabled = false;
      break;
    }

    if (angleValue >= 91 && angleValue <= 135) {
      finalValue.innerHTML = <p>Secular means not connected to any religion. It refers to treating all religions equally</p>;
      spinBtn.disabled = false;
      break;
    }

    if (angleValue >= 136 && angleValue <= 180) {
      finalValue.innerHTML = <p>Socialist means a system where the government or community manages resources and industries to ensure that benefits are shared more equally among everyone.</p>;
      spinBtn.disabled = false;
      break;
    }

    if (angleValue >= 181 && angleValue <= 225) {
      finalValue.innerHTML = <p>Democratic means that everyone has the right to participate in making decisions, usually by voting, and everyone is treated equally.</p>;
      spinBtn.disabled = false;
      break;
    }

    if (angleValue >= 226 && angleValue <= 270) {
      finalValue.innerHTML = <p>Republic means a system of government where the people elect their leaders.It's a country where the power rests with the people</p>;
      spinBtn.disabled = false;
      break;
    }

    if (angleValue >= 271 && angleValue <= 315) {
      finalValue.innerHTML = <p>Justice means fairness and making sure people are treated equally and right.</p>;
      spinBtn.disabled = false;
      break;
    }

    if (angleValue >= 316 && angleValue <= 360) {
      finalValue.innerHTML = <p>Fraternity means a sense of brotherhood and unity among people, where everyone supports and cares for each other, treating others as equals.</p>;
      spinBtn.disabled = false;
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = <p>Good Luck!</p>;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
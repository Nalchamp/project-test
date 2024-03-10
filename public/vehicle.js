function showError(error) {
    const errorElem = document.getElementById("errorContainer");
    const textNode = document.createTextNode(error);
    errorElem.appendChild(textNode);
    console.error(respJson.error)
}

async function fetchallVehicleName() {
    try {
        const response = await fetch("/vehicleName");
        return await response.json();
    } catch (err) {
        return { error: err };
    }

}

async function fetchSpeedData(vehicleName) {
    try {
        const url = `/vehicleSpeed?vehicleName=${vehicleName}`
        const response = await fetch(url);
        const jsonResponse = await response.json();
        console.debug({ url, jsonResponse });
        return jsonResponse;
    } catch (err) {
        return { error: err };
    }
}

async function initApp() {
    const nameSelectElem = document.getElementById("vehiclesDropdown");
    let myChart;
    nameSelectElem.addEventListener("change", async () => {
        const selectedName = nameSelectElem.value
        console.debug("nameSelectElem change handler:", { selectedName });
        if (!selectedName) {
            return;
        }

        if (selectedName == "maxSpeed") {
            fetch('/vehicle/speed')
                .then(response => response.json())
                .then(dat => {
                    // Extract the "label" column from the JSON data
                    console.log(dat)
                    const labels = dat.data.map(item => item.name);
                    const values = dat.data.map(item => item.max_atmosphering_speed);

                    //render chart
                    console.log(labels)
                    console.log(values)
                    const ctx = document.getElementById('myChart').getContext('2d');
                    if (myChart) {
                        myChart.destroy()
                    };
                    myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Max Atmospheric Speed',
                                // Use the "value" column as the data for the chart
                                data: values,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            }]
                        },
                    });
                })
                .catch(error => console.error('Error fetching data:', error));
        };

        if (selectedName == "length") {
            fetch('/vehicle/length')
                .then(response => response.json())
                .then(datal => {
                    // Extract the "label" column from the JSON data
                    console.log(datal)
                    const labels = datal.data.map(item => item.name);
                    const values = datal.data.map(item => item.length);

                    //render chart
                    console.log(labels)
                    console.log(values)
                    const ctx = document.getElementById('myChart').getContext('2d');
                    if (myChart) {
                        myChart.destroy()
                    };
                    myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Vehicle Length',
                                // Use the "value" column as the data for the chart
                                data: values,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            }]
                        },
                    });
                })
                .catch(error => console.error('Error fetching data:', error));
        };
    })
};


async function charApp() {
    const nameSelectElem = document.getElementById("characterDropdown");
    let charChart;
    nameSelectElem.addEventListener("change", async () => {
        const selectedName = nameSelectElem.value
        console.debug("nameSelectElem change handler:", { selectedName });
        if (!selectedName) {
            return;
        }

        if (selectedName == "height") {
            fetch('/character/height')
                .then(response => response.json())
                .then(datah => {
                    // Extract the "label" column from the JSON data
                    console.log(datah)
                    const labels = datah.data.map(item => item.name);
                    const values = datah.data.map(item => item.height);

                    //render chart
                    console.log(labels)
                    console.log(values)
                    const ctx = document.getElementById('charChart').getContext('2d');
                    if (charChart) {
                        charChart.destroy()
                    };
                    charChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Character Height',
                                // Use the "value" column as the data for the chart
                                data: values,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            }]
                        },
                    });
                })
                .catch(error => console.error('Error fetching data:', error));
        };

        // Render the heading.
        //  const graphTitleElem = document.getElementById("title");
        // const graphTitleText = document.createTextNode(`${selectedName} speed`)
        // graphTitleElem.replaceChildren(graphTitleText);
    })
};

initApp();

charApp();
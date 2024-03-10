function showError(error) {
    const errorElem = document.getElementById("errorContainer");
    const textNode = document.createTextNode(error);
    errorElem.appendChild(textNode);
    console.error(respJson.error)
}

async function fetchAllName() {
    try {
        const response = await fetch("/vehicleName");
        return await response.json();    
    } catch (err) {
        return { error: err };
    }
    
}

async function fetchSpeedData(name) {
    try {
        const url = `/model?vehicleName=${name}`
        const response = await fetch(url);
        const jsonResponse = await response.json();    
        console.debug({ url, jsonResponse });
        return jsonResponse;
    } catch (err) {
        return { error: err };
    }    
}

async function initApp() {
    const nameJson = await fetchAllName();
    if (nameJson.error) {
        showError(nameJson.error);        
        return;
    }

    const nameSelectElem = document.getElementById("vehiclesDropdown");
    for (const name of nameJson.data) {
        const option = document.createElement("option");        
        option.setAttribute("value", name)
        const textNode = document.createTextNode(name);
        option.appendChild(textNode);
        speciesSelectElem.appendChild(option);
    }

    // When the name select element changes, fetch the species's population data
    // from the server, and use the data to update the graph.
    nameSelectElem.addEventListener("change", async () => {
        const selectedName = nameSelectElem.value
        console.debug("nameSelectElem change handler:", { selectedName });
        if (!selectedName) {
            return;
        }
        
        const popResponse = await fetchSpeedData(selectedName)
        if (popResponse.error) {
            showError(popResponse.error);
            return;
        }

       document.addEventListener('DOMContentLoaded', () => {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            // Extract the "label" column from the JSON data
            const labels = data.map(item => item.name);

            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Max Atmospheric Speed',
                        // Use the "value" column as the data for the chart
                        data: data.map(item => item.max_atmosphering_speed),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

        const x = [];
        const y = [];
        for (item of popResponse.data) {
            x.push(item.model);
            y.push(item.max_atmosphering_speed);
        }

        

        // Render the heading.
      //  const graphTitleElem = document.getElementById("title");
       // const graphTitleText = document.createTextNode(`${selectedName} speed`)
       // graphTitleElem.replaceChildren(graphTitleText);
        })
    };



initApp();
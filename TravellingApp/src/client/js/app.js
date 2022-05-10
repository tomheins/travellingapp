function test() {

    const submit = document.querySelector(".submit");
    const startdate = document.querySelector(".startdate");
    const enddate = document.querySelector(".enddate");
    const resultclass = document.querySelector(".resultclass");
    const city = document.querySelector(".city");
    const startdateclass = document.querySelector(".startdateclass");
    const cityclass = document.querySelector(".cityclass");

    // using query selectors for different elements

    const baseURLpixabay = "https://pixabay.com/api/?key=";
    const apiKeypixabay = "25347807-6b80a9f2b42f69457f4280b02&q=";

    const baseURLgeonames = "http://api.geonames.org/searchJSON?q= ";
    const apiKeygeonames = "&maxRows=10&username=christlordoflight";

    const baseURLweather = "https://api.weatherbit.io/v2.0/forecast/daily?city=";
    const apiKeyweather = "&key=467d1ed7ca4c4be0a550bc7806663ea0";
    console.log("update");

   //Api connections

    submit.addEventListener("click", testfunction);
    const img = document.getElementById("myImg");

    function testfunction() {

        window.scrollTo(0, 0);

        //when the site reloads the page scrolls to the top

        const value = city.value;

        img.style.opacity = 0;

        city.style.borderColor = "white";
        startdate.style.borderColor = "white";
        enddate.style.borderColor = "white";

        let date1 = new Date(startdate.value);
        let date = new Date();
        let date2 = new Date(enddate.value);

        const startdatetime = date1.getTime();

        const enddatetime = date2.getTime();

        const currentdate = date.getTime();

        const difference = date2.getTime() - date1.getTime();

        const days = Math.ceil(difference / (1000 * 3600 * 24));
        console.log(days + " days between start date and end date");

        const difference1 = date1.getTime() - date.getTime();

        const days1 = Math.ceil(difference1 / (1000 * 3600 * 24));
        console.log(" the trip will start in " + days1 + " days");

        if (city.value == "") {
            console.log("fehler city");
            city.style.borderColor = "red";
            return null;
        }

        if (startdate.value == "") {
            console.log("fehler startdate");
            startdate.style.borderColor = "red";
            return null;
        }

        if (enddate.value == "") {
            console.log("fehler enddate");
            enddate.style.borderColor = "red";
            return null;
        }

        if (startdatetime >= enddatetime) {
            startdate.style.borderColor = "red";
            enddate.style.borderColor = "red";
            return null;
        }

        if (currentdate > startdatetime) {
            startdate.style.borderColor = "red";
            return null;
        }

        // calculating how many days are left and how long they will stay

        getData(baseURLgeonames, value, apiKeygeonames).then(function (geonames) {
            postData("/location", {
                country: geonames.geonames[0].countryName,
                long: geonames.geonames[0].lng,
                latitude: geonames.geonames[0].lat,
            });
            getData(baseURLpixabay, apiKeypixabay, value + "&image_type=photo").then(
                function (hits) {
                    postData("/picture", {picture1: hits.hits[0].webformatURL});
                    getData(baseURLweather, value, apiKeyweather).then(function (data) {
                        postData("/weather", {max_temp: data.data[0].app_max_temp}).then(
                            updateUI()

                            // sending data to the server and back. Then updating the side with the new received data.
                        );
                    });
                }
            );
        });

        fade();

        cityclass.removeChild(city);

        startdateclass.removeChild(document.querySelector(".from"));
        startdateclass.removeChild(startdate);

        const newenddate = document.createElement("div");
        const enddateclass = document.querySelector(".enddateclass");
        newenddate.classList.add("newenddate");

        if (days1 == 1 && days != 1) {
            const text3 = document.createTextNode(
                "Your trip from " +
                startdate.value +
                " to " +
                enddate.value +
                " will start in " +
                days1 +
                " day and will last " +
                days +
                " days "
            );
            newenddate.appendChild(text3);
        } else if (days == 1 && days1 != 1) {
            const text3 = document.createTextNode(
                "Your trip from " +
                startdate.value +
                " to " +
                enddate.value +
                " will start in " +
                days1 +
                " days and will last " +
                days +
                " day "
            );
            newenddate.appendChild(text3);
        } else if (days == 1 && days1 == 1) {
            const text3 = document.createTextNode(
                "Your trip from " +
                startdate.value +
                " to " +
                enddate.value +
                " will start in " +
                days1 +
                " day and will last " +
                days +
                " day "
            );
            newenddate.appendChild(text3);
        } else {
            const text3 = document.createTextNode(
                "Your trip from " +
                startdate.value +
                " to " +
                enddate.value +
                " will start in " +
                days1 +
                " days and will last " +
                days +
                " days "
            );
            newenddate.appendChild(text3);
        }


        enddateclass.appendChild(newenddate);

        enddateclass.removeChild(document.querySelector(".to"));
        enddateclass.removeChild(enddate);

        const submitclass = document.querySelector(".submitclass");
        submitclass.removeChild(submit);

        // deleting elements and adding elements as the submit button is pressed
    }
    function fade() {
        let opacity1 = 0;

        let intervalID = 0;

        intervalID = setInterval(fade, 50);

        opacity1 = Number(window.getComputedStyle(img).getPropertyValue("opacity"));

        if (opacity1 < 1) {
            opacity1 = opacity1 + 0.02;
            img.style.opacity = opacity1;
        } else {
            clearInterval(intervalID);
        }
    }

// fading function as picture is displayed

    const getData = async (URL, value, apiKey) => {
        const res = await fetch(URL + value + apiKey);

        try {
            const data = await res.json();
            console.log(data);
            console.log("before is the data")
            return data;
        } catch (error) {
            console.log("error", error);
            // appropriately handle the error
        }
    };

// showing the data received from the Api

    const postData = async (url = "", data = {}) => {
        const response = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            // Body data type must match "Content-Type" header
            body: JSON.stringify(data),
        });

        try {
            const newData = await response.json();
            console.log(newData);

            return newData;
        } catch (error) {
            console.log("error", error);
        }
    };

// sending data to the server

    const updateUI = async () => {
        const request = await fetch("/all");
        try {
            const allData = await request.json();
            document.getElementById("myImg").src = allData.data1.picture1;
            cityclass.innerHTML = city.value + ", " + allData.data3.country;
            resultclass.innerHTML =
                "Current temperature = " + allData.data2.max_temp + "°C";
            startdateclass.innerHTML =
                " longitude: " +
                allData.data3.long +
                " latitude: " +
                allData.data3.latitude;
        } catch (error) {
            console.log("error", error);
        }
    };


}

export{test};
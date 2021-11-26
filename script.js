const url = "https://cataas.com/";
const paths = {
  cat: "cat",
  allCats: "api/cats", //https://cataas.com/api/cats
  allTags: "api/tags", //https://cataas.com/api/tags
};

// Gif: boolean
// Tag: string
// Text: string
// Width: number
// Height: number
// TextSize: number
// TextColor: string
// Size: "or" | "sq" | "md" | "sm"
// Filter: "pixel" | "paint" | "mono" | "blur" | "sepia" | "negative"

let tagAndID = [];
let searchResult = 0;
/*
0 - True
1 - Minimum Keywords of 3 letters is required
2 - No data found
*/

let getMainContainer = document.getElementById("mainContainer");
getMainContainer.style.color = "white";
getMainContainer.style.fontFamily = "Georgia, serif";
let getSearchDiv = document.getElementById("searchDiv");
getSearchDiv.style.padding = "0px";
getSearchDiv.style.textAlign = "center";

let createTextBox = document.createElement("INPUT");
createTextBox.setAttribute("type", "text");
createTextBox.setAttribute("id", "searchText");
createTextBox.setAttribute("placeholder", "Type any cat activities");
createTextBox.style.padding = "5px";
// createBtn.style.placeho = "Type any cat activities";
createTextBox.style.marginRight = "5px";
createTextBox.style.borderRadius = "25px";
createTextBox.style.fontFamily = "georgia";
createTextBox.style.fontSize = "15px";
getSearchDiv.appendChild(createTextBox);

let createBtn = document.createElement("button");
createBtn.setAttribute("id", "mySearchBtn");
createBtn.style.padding = "5px";
createBtn.style.borderRadius = "25px";
createBtn.style.width = "100px";
createBtn.style.fontSize = "18px";
createBtn.innerHTML = "Search";
getSearchDiv.appendChild(createBtn);

let createSuggesDiv = document.createElement("div");
createSuggesDiv.setAttribute("id", "output");
getSearchDiv.appendChild(createSuggesDiv);

let tagInput = "";
tagInput = tagInput.toLowerCase();
let getSearchText = document.getElementById("searchText");

let getOutputDiv = document.getElementById("outputDiv");
getOutputDiv.style.textAlign = "center";

let headingText3 = document.createElement("p");
headingText3.style.margin = "0px";
headingText3.style.padding = "5px";
headingText3.style.color = "#EFDECD";
headingText3.style.fontFamily = "sans-serif";
let headingText = document.createElement("h1");
headingText.style.color = "black";

//Calling function to call api
loadApiData();

//creating function to fetch tag and image API using async and await
async function loadApiData() {
  try {
    headingText.innerHTML = "Fetching images....";
    getSearchDiv.appendChild(headingText);

    // Fetching tag API
    let fetchTagsApi = await fetch(`${url}${paths.allTags}`);
    let getTagsData = await fetchTagsApi.json();

    // Fetching Image ID and TAG API
    let fetchImgApi = await fetch(`${url}${paths.allCats}`);
    getImgData = await fetchImgApi.json();

    //looping image and tag API
    await getImgData.forEach((eachImgData) => {
      let objTagAndID = { id: eachImgData.id, tag: eachImgData.tags };
      tagAndID.push(objTagAndID);
    });
    // Loading all the images from API as default
    loadAllImg(tagAndID);

    // Creating click event on search button for the text entered on text box
    createBtn.addEventListener("click", () => {
      headingText.innerHTML = "";
      getSearchDiv.appendChild(headingText);
      tagInput = document.getElementById("searchText").value;
      tagInput = tagInput.toLowerCase();

      //Condition to check if user input has more than 2 character
      if (tagInput.length > 2) {
        let collectID = [];

        // Fetching all the tag names from API
        let results = getTagsData.filter(function (value) {
          return value.toLowerCase().indexOf(tagInput.toLowerCase()) >= 0;
        });

        //To populate all keyword suggestion when result array has specified length
        if (results.length > 0) {
          headingText3.innerHTML = `<h3 style="padding:1px; margin:0px; color:red">Suggested Keywords:</h3> "${results}"`;
          getSearchDiv.appendChild(headingText3);
        } else {
          headingText3.innerHTML = `<h3 style="padding:1px; margin:0px; color:red">Try with different keywords with Cat activities</h3>`;
          getSearchDiv.appendChild(headingText3);
        }

        //Pulling data one by one to look user input results
        tagAndID.forEach((data) => {
          //Condition to check if user given valid tag name
          if (data.tag.includes(tagInput)) {
            searchResult = 0;
            let objTagAndID = { id: data.id, tag: tagInput };
            collectID.push(objTagAndID);
          } else {
            searchResult = 2;
          }
        });

        //If user input is valid input loading images by passing the User input ID to load all images
        if (collectID.length > 0) {
          searchResult = 0;

          loadAllImg(collectID);
        } else {
          searchResult = 2;
          //loadAllImg(tagAndID);
        }
      } else {
        searchResult = 1;
        loadAllImg(tagAndID);
      }
      /*
0 - True
1 - Minimum Keywords of 3 letters is required
2 - No data found
*/

      //Switch condition to print headers in Webpage
      switch (searchResult) {
        case 0:
          headingText.innerHTML = `Viewing cats with keyword "${tagInput}"`;
          getSearchDiv.appendChild(headingText);
          break;
        case 1:
          headingText.innerHTML = `Minimum Keywords of 3 letters is required.`;
          getSearchDiv.appendChild(headingText);
          headingText3.innerHTML = "";
          getSearchDiv.appendChild(headingText3);
          break;
        case 2:
          headingText.innerHTML = `No data found with keyword "${tagInput}"`;
          getSearchDiv.appendChild(headingText);
          break;
      }
    });

    // Creating keyup event on textbox for the text entered
    getSearchText.addEventListener("keyup", () => {
      createSuggesDiv.innerHTML = "";
      getSearchDiv.appendChild(createSuggesDiv);
      headingText.innerHTML = "";
      getSearchDiv.appendChild(headingText);
      tagInput = document.getElementById("searchText").value;
      tagInput = tagInput.toLowerCase();

      //Condition to check if user input has more than 2 character
      if (tagInput.length > 2) {
        var results = getTagsData.filter(function (value) {
          return value.toLowerCase().indexOf(tagInput.toLowerCase()) >= 0;
        });
        if (results.length > 0) {
          headingText3.innerHTML = `<h3 style="padding:1px; margin:0px; color:red">Suggested Keywords:</h3> "${results}"`;
          getSearchDiv.appendChild(headingText3);
        } else {
          headingText3.innerHTML = `<h3 style="padding:1px; margin:0px; color:red">Try with different keywords with Cat activities</h3>`;
          getSearchDiv.appendChild(headingText3);
        }

        // let res = "<ul>";
        // results.forEach((e) => {
        //   res += "<li>" + e + "</li>";
        // });
        // res += "</ul>";
        // headingText3.innerHTML = res;
        // getSearchDiv.appendChild(headingText3);
        // createSuggesDiv.innerHTML = res;
        // getSearchDiv.appendChild(createSuggesDiv);

        let collectID = [];

        //Pulling data one by one to look user input results
        tagAndID.forEach((data) => {
          //Condition to check if user given valid tag name
          if (data.tag.includes(tagInput)) {
            searchResult = 0;
            let objTagAndID = { id: data.id, tag: tagInput };
            collectID.push(objTagAndID);
          } else {
            searchResult = 2;
          }
        });

        //If user input is valid input loading images by passing the User input ID to load all images
        if (collectID.length > 0) {
          searchResult = 0;
          loadAllImg(collectID);
        } else {
          searchResult = 2; //loadAllImg(tagAndID);
        }
      } else {
        searchResult = 1;
        loadAllImg(tagAndID);
      }

      //Switch condition to print headers in Webpage
      switch (searchResult) {
        case 0:
          headingText.innerHTML = `Viewing cats with keyword "${tagInput}"`;
          getSearchDiv.appendChild(headingText);
          break;
        case 1:
          headingText.innerHTML = `Minimum Keywords of 3 letters is required.`;
          getSearchDiv.appendChild(headingText);
          headingText3.innerHTML = "";
          getSearchDiv.appendChild(headingText3);
          break;
        case 2:
          headingText.innerHTML = `No data found with keyword "${tagInput}"`;
          getSearchDiv.appendChild(headingText);
          break;
      }
    });
  } catch (er) {
    console.log(er);
    headingText.innerHTML = `ERROR WHILE COOKING DATA FOR YOU.<BR>${er}`;
    getSearchDiv.appendChild(headingText);
  }
}

//Printing images on browser based on user input
function loadAllImg(getImgIDData) {
  // console.log(getImgIDData)
  headingText.innerHTML = "Building images on your webpage!";
  getSearchDiv.appendChild(headingText);

  getOutputDiv.innerHTML = "";

  getImgIDData.forEach((element) => {
    let getImgID = element.id;

    let createImgTag = document.createElement("img");
    createImgTag.setAttribute("id", getImgID);
    createImgTag.setAttribute("class", "domImg");
    createImgTag.style.width = "200px";
    createImgTag.style.height = "200px";
    createImgTag.style.padding = "5px";
    createImgTag.style.borderRadius = "20px";

    let getCurrentImg = document.getElementById(getImgID);

    createImgTag.src = `https://cataas.com/cat/${getImgID}`;
    getOutputDiv.appendChild(createImgTag);
    createImgTag.addEventListener("click", () =>
      loadSeperateImg(`https://cataas.com/cat/${getImgID}`)
    );
  });
  headingText.innerHTML = "";
  getSearchDiv.appendChild(headingText);
}

function loadSeperateImg(getLink) {

  var modal = document.getElementById("myModal");

  // Get the image and insert it inside the modal
  var modalImg = document.getElementById("modalImg");
  
  modal.style.display = "block";
  modalImg.src = getLink;
  // captionText.innerHTML = this.alt;

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };
}

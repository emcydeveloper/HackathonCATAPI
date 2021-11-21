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
let getSearchDiv = document.getElementById("searchDiv");
getSearchDiv.style.padding = "15px";
getSearchDiv.style.textAlign = "center";

let createTextBox = document.createElement("INPUT");
createTextBox.setAttribute("type", "text");
createTextBox.setAttribute("id", "searchText");
createTextBox.style.padding = "5px";
createTextBox.style.width = "30%";
createTextBox.style.marginRight = "5px";
getSearchDiv.appendChild(createTextBox);

let createBtn = document.createElement("button");
createBtn.setAttribute("id", "mySearchBtn");
createBtn.style.padding = "5px";
createBtn.innerHTML = "Search";
getSearchDiv.appendChild(createBtn);

let tagInput = "";
tagInput = tagInput.toLowerCase();
let getSearchText = document.getElementById("searchText");

let getOutputDiv = document.getElementById("outputDiv");
getOutputDiv.style.textAlign = "center";

let headingText = document.createElement("h1");

//Calling function to call api
loadApiData();

//creating function to fetch tag and image API using async and await
async function loadApiData() {
  try {
    headingText.innerHTML = "Loading Images....";
    getSearchDiv.appendChild(headingText);

    // Fetching tag API
    let fetchTagsApi = await fetch(`${url}${paths.allTags}`);
    let getTagsData = await fetchTagsApi.json();

    // Fetching Image ID and TAG API
    let fetchImgApi = await fetch(`${url}${paths.allCats}`);
    getImgData = await fetchImgApi.json();

    //looping image and tag API
    await getImgData.forEach((eachImgData) => {
      let objTagAndID = { id: eachImgData.id, tag: eachImgData.tags[0] };
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
      if (tagInput.length > 2) {
        let collectID = [];
        tagAndID.forEach((data) => {
          if (data.tag == tagInput) {
            searchResult = 0;
            let objTagAndID = { id: data.id, tag: data.tag };
            collectID.push(objTagAndID);
          } else {
            searchResult = 2;
          }
        });
        if (collectID.length > 1) {
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

      switch (searchResult) {
        case 0:
          headingText.innerHTML = `Viewing cats with keyword ${tagInput}`;
          getSearchDiv.appendChild(headingText);
          break;
        case 1:
          headingText.innerHTML = `Minimum Keywords of 3 letters is required.`;
          getSearchDiv.appendChild(headingText);
          break;
        case 2:
          headingText.innerHTML = `No data found with keyword ${tagInput}`;
          getSearchDiv.appendChild(headingText);
          break;
      }
    });

    getSearchText.addEventListener("keyup", () => {
      headingText.innerHTML = "";
      getSearchDiv.appendChild(headingText);
      tagInput = document.getElementById("searchText").value;
      tagInput = tagInput.toLowerCase();
      if (tagInput.length > 2) {
        let collectID = [];
        tagAndID.forEach((data) => {
          if (data.tag == tagInput) {
            searchResult = 0;
            let objTagAndID = { id: data.id, tag: data.tag };
            collectID.push(objTagAndID);
          } else {
            searchResult = 2;
          }
        });
        if (collectID.length > 1) {
          searchResult = 0;
          loadAllImg(collectID);
        } else {
          searchResult = 2; //loadAllImg(tagAndID);
        }
      } else {
        searchResult = 1;
        loadAllImg(tagAndID);
      }

      switch (searchResult) {
        case 0:
          headingText.innerHTML = `Viewing cats with keyword ${tagInput}`;
          getSearchDiv.appendChild(headingText);
          break;
        case 1:
          headingText.innerHTML = `Minimum Keywords of 3 letters is required.`;
          getSearchDiv.appendChild(headingText);
          break;
        case 2:
          headingText.innerHTML = `No data found with keyword ${tagInput}`;
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

function loadAllImg(getImgIDData) {
  headingText.innerHTML = "";
  getSearchDiv.appendChild(headingText);

  getOutputDiv.innerHTML = "";

  getImgIDData.forEach((element) => {
    let getImgID = element.id;

    let createImgTag = document.createElement("img");
    createImgTag.setAttribute("id", getImgID);
    createImgTag.setAttribute("class", "domImg");
    createImgTag.style.width = "200px";
    createImgTag.style.height = "200px";

    let getCurrentImg = document.getElementById(getImgID);

    createImgTag.src = `https://cataas.com/cat/${getImgID}`;
    getOutputDiv.appendChild(createImgTag);
  });
}

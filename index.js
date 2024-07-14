let thedata = document.getElementById("Data");
let searchdata = document.getElementById("search");





function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    thedata.innerHTML = cartoona
}



function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 400)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 400)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 400)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})








async function getCategories() {
    thedata.innerHTML = ""
    searchdata.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)

}

function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="categoryDetails('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    thedata.innerHTML = cartoona
}
async function categoryDetails(category) {
    thedata.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))

}
// start area //////////////////////////////////////////////////////////////

async function getArea() {
    thedata.innerHTML = ""

    searchdata.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)

}


function displayArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="areaDetails('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    thedata.innerHTML = cartoona
}

async function areaDetails(area) {
    thedata.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    

}


// start inggredients/////////////////////////////////////////////////////////


async function getIngredients() {
    thedata.innerHTML = ""

    searchdata.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))

}


function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="ingredientDetails('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    thedata.innerHTML = cartoona
}
async function ingredientDetails(ingredients) {
    thedata.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))

}





//  start search/////////////////////////////////////////////////////



function showSearchInputs() {
    searchdata.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="Searchitem(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    thedata.innerHTML = ""
}

async function Searchitem(term) {
    closeSideNav()
    thedata.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])

}





// <!-- =========================================================================== -->
// <!-- ===============================star contact US============================= -->
// <!-- =========================================================================== -->
function clickContactUs() {
  let ContactUsContainer = `
      <section   class="contact min-vh-100 d-flex justify-content-center align-items-center " id="">
        <div class="container w-75">
          <div class="row gy-3">
            <div class="col-md-6">
            
              <input
              onkeyup =" nameValidation()"
                type="text"
                class="form-control bg-transparent text-white"
                placeholder="please Enter Name "
                id="NameContact"
              />
          <div class="alert alert-danger mt-3 w-100 py-3 fs-6 d-none "  id="NameContactId" >
          Special characters and numbers not allowed
        </div>
            </div>
            <div class="col-md-6">
              <input
              onkeyup =" emailValidation()"
                type="email"
                class="form-control bg-transparent text-white"
                placeholder="please Enter Email "
                id="EmailContact"
              />
          <div class="alert alert-danger mt-3 w-100 py-3 fs-6 d-none "  id="EmailContactId" >
          Email not valid *exemple@yyy.zzz
        </div>
            </div>
            <div class="col-md-6">
              <input
              onkeyup =" numberValidation()"
                type="number"
                class="form-control bg-transparent text-white"
                placeholder="please Enter phone Number "
                id="NumberContact"
              />
          <div class="alert alert-danger mt-3 w-100 py-3 fs-6 d-none "  id="NumberContactId" >
        Enter valid Phone Number
        </div>
            </div>
            <div class="col-md-6">
              <input
              onkeyup =" ageValidation()"
                type="number"
                class="form-control bg-transparent text-white"
                placeholder="please Enter phone age "
                id="ageContact"
              />
        <div class="alert alert-danger mt-3 w-100 py-3 fs-6 d-none "  id="ageContactId" >
      Enter valid age
        </div>
            </div>
            <div class="col-md-6">
              <input
              onkeyup =" passwordValidation()"
                type="password"
                class="form-control bg-transparent text-white"
                placeholder="please Enter phone Password "
                id="PasswordContact"
              />
      <div class="alert alert-danger mt-3 w-100 py-3 fs-6 d-none "  id="PasswordContactId" >
      Enter valid password Minimum eight characters, at least one letter and one number:
        </div>
            </div>
            <div class="col-md-6">
              <input
              onkeyup =" repassedValidation()"
                type="password"
                class="form-control bg-transparent text-white"
                placeholder="please Enter phone RePassword "
                id="RePasswordContact"
              />
                 <div class="alert alert-danger mt-3 w-100 py-3 fs-6 d-none "  id="RePasswordContactId" >
                  Enter valid RePassword     </div>

            </div>
        <button  class="btn-danger btn disabled " id="btnContact"  > summit</button>
            <div class="alert alert-danger mt-3 w-100 py-3 fs-6 d-none "  id="btnContactId" >
                 good    </div>

          </div>
        </div>
      </section>
`;
  thedata.innerHTML = ContactUsContainer;
  

  let NameContact = document.getElementById("NameContact");
  let NameContactId = document.getElementById("NameContactId");
  //
  let EmailContactId = document.getElementById("EmailContactId");
  let EmailContact = document.getElementById("EmailContact");

  //
  let NumberContactId = document.getElementById("NumberContactId");
  let NumberContact = document.getElementById("NumberContact");

  //
  let ageContactId = document.getElementById("ageContactId");
  let ageContact = document.getElementById("ageContact");
  //
  let PasswordContactId = document.getElementById("PasswordContactId");
  let PasswordContact = document.getElementById("PasswordContact");

  //
  let RePasswordContact = document.getElementById("RePasswordContact");
  let RePasswordContactId = document.getElementById("RePasswordContactId");
  //
  let btnContact = document.getElementById("btnContact");
  // console.log(btnContact);
}
ContactUs.addEventListener("click", clickContactUs);

// 1
function nameValidation() {
  if (/^[a-zA-Z ]+$/.test(document.getElementById("NameContact").value)) {
    NameContact.classList.add("is-valid");
    NameContact.classList.remove("is-invalid");

    NameContactId.classList.add("d-none");
    NameContactId.classList.remove("d-block");
  } else {
    NameContact.classList.add("is-invalid");
    NameContact.classList.remove("is-valid");

    NameContactId.classList.remove("d-none");
    NameContactId.classList.add("d-block");
  }
}
// 2
function emailValidation() {
  if (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(
      document.getElementById("EmailContact").value
    )
  ) {
    EmailContact.classList.add("is-valid");
    EmailContact.classList.remove("is-invalid");

    EmailContactId.classList.add("d-none");
    EmailContactId.classList.remove("d-block");
  } else {
    EmailContact.classList.add("is-invalid");
    EmailContactId.classList.remove("is-valid");

    EmailContactId.classList.remove("d-none");
    EmailContactId.classList.add("d-block");
  }
  return;
}
// 3
function numberValidation() {
  if (
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
      document.getElementById("NumberContact").value
    )
  ) {
    NumberContact.classList.add("is-valid");
    NumberContact.classList.remove("is-invalid");

    NumberContactId.classList.add("d-none");
    NumberContactId.classList.remove("d-block");
  } else {
    NumberContact.classList.add("is-invalid");
    NumberContactId.classList.remove("is-valid");

    NumberContactId.classList.remove("d-none");
    NumberContactId.classList.add("d-block");
  }
  return;
}
// 4
function ageValidation() {
  if (
    /^(0?[0-9]{1,2}|1[01][0-9]|120)$/.test(
      document.getElementById("ageContact").value
    )
  ) {
    ageContact.classList.add("is-valid");
    ageContact.classList.remove("is-invalid");

    ageContactId.classList.add("d-none");
    ageContactId.classList.remove("d-block");
  } else {
    ageContact.classList.add("is-invalid");
    ageContact.classList.remove("is-valid");

    ageContactId.classList.remove("d-none");
    ageContactId.classList.add("d-block");
  }
}
//5
function passwordValidation() {
  if (
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
      document.getElementById("PasswordContact").value
    )
  ) {
    PasswordContact.classList.add("is-valid");
    PasswordContact.classList.remove("is-invalid");

    PasswordContactId.classList.add("d-none");
    PasswordContactId.classList.remove("d-block");
  } else {
    PasswordContact.classList.add("is-invalid");
    PasswordContact.classList.remove("is-valid");

    PasswordContactId.classList.remove("d-none");
    PasswordContactId.classList.add("d-block");
  }
}
//6
function repassedValidation() {
  if (
    document.getElementById("PasswordContact").value ==
    document.getElementById("RePasswordContact").value
  ) {
    RePasswordContact.classList.add("is-valid");
    RePasswordContact.classList.remove("is-invalid");

    RePasswordContactId.classList.add("d-none");
    RePasswordContactId.classList.remove("d-block");
  } else {
    RePasswordContact.classList.add("is-invalid");
    RePasswordContact.classList.remove("is-valid");

    RePasswordContactId.classList.remove("d-none");
    RePasswordContactId.classList.add("d-block");
  }
  mainContactUs();
}
function mainContactUs() {
  if (
    NameContact.classList.contains("is-valid") &&
    EmailContact.classList.contains("is-valid") &&
    NumberContact.classList.contains("is-valid") &&
    ageContact.classList.contains("is-valid") &&
    PasswordContact.classList.contains("is-valid") &&
    RePasswordContact.classList.contains("is-valid")
  ) {
    btnContact.classList.remove("disabled");
    console.log("hello 1");
  } else {
    btnContact.classList.add("disabled");
    console.log("hello 2");
  }
}
// <!-- =========================================================================== -->
// <!-- ===============================End contact US============================= -->
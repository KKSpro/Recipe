const uppermeal=document.getElementById("meals");
 const list = document.getElementById("ullu");
for(let i=0;i<5;i++){
getrandomMeal();}
localStorage.setItem("scrollY",0);
addmealtofav();
const searchbox = document.getElementById("searchbox");
const searchbtn = document.getElementById("searchbtn");

async function getrandomMeal()
{
    const randomMeal = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const newrandom = await randomMeal.json();
    const adding=await newrandom.meals[0];
     addmeal(adding);
    //  console.log(adding);
}
async function MealbyID(id)
{     
      const melt = await (await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id)).json();
      const moll = await melt.meals[0];
      return moll;
}
async function searchMeal(key)
{
    const meal = await (await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+ key)).json();
    return meal.meals

}
async function addmeal(randomMeal,random = false)
{  
    if(random===true || randomMeal === null)
    {   if(randomMeal ===null)
        {
            const dish =document.createElement("p")
            dish.classList.add("nothing");
           
            dish.innerHTML = `Nothing Found !!`;
            uppermeal.appendChild(dish);
            return;
        }
         const dish = document.createElement("div");
    dish.classList.add("meal");
  uppermeal.innerHTML='';
    const neat =await MealbyID(randomMeal);
       dish.innerHTML=` <div class="meal-photo">
               <img src="${neat.strMealThumb}" alt="${neat.strMeal}">
           </div>
           <div class="meal-info">
               <h4>${neat.strMeal}</h4>
               <button class="fav-btn" id="mc"><i class="fas fa-heart"></i>
               </button>
           </div>`;
            uppermeal.appendChild(dish);
            return ;
    }
    const dish = document.createElement("div");
    dish.classList.add("meal");
    dish.innerHTML=`           
           <div class="meal-photo"> <span class="random">Random recepie</span>
               <img src="${randomMeal.strMealThumb}" alt="${randomMeal.strMeal}" onclick=info(${randomMeal.idMeal}) >
           </div>
           <div class="meal-info">
               <h4>${randomMeal.strMeal}</h4>
               <button class="fav-btn" id="mc"><i class="fas fa-heart"></i>
               </button>
           </div>
    `; 
    const md=dish.querySelector("#mc");
    md.addEventListener("click",()=>{
        if(md.classList.contains("active"))
        {
            removeMealfromLS(randomMeal.idMeal);
            md.classList.remove("active");
            swift(randomMeal.idMeal);
        }
        else{
            addmealtoLS(randomMeal.idMeal);
            md.classList.add("active");
             if(!(JSON.stringify(randomMeal.idMeal) in localStorage))
            {switchfavmeals(randomMeal);
             }
        }
    });
    uppermeal.appendChild(dish);
}

function addmealtoLS(mealid)
{
    const meald=getmealLS();
    localStorage.setItem("MealIDs",JSON.stringify([...meald,mealid]));
}
function removeMealfromLS(mealid)
{
    const meald=getmealLS();
    localStorage.setItem("MealIDs",JSON.stringify(meald.filter(id => id!== mealid)));
}
 function getmealLS()
 {
        const mear=JSON.parse(localStorage.getItem("MealIDs"));
        return mear === null ? [] :mear;
 }

async function addmealtofav()
 {     list.innerHTML="";
     
    const mild =getmealLS();
    for (let i=0;i<mild.length;i++)
    {
        const mile = await MealbyID(mild[i]);
          switchfavmeals(mile);
    }
 }

function switchfavmeals(mile){ 
             const ele =  document.createElement("li");
             ele.classList.add(mile.idMeal);
             ele.innerHTML = `<img src="${mile.strMealThumb}" alt="${mile.strMeal}" onclick=info(${mile.idMeal},${true})>
             <button class="${mile.idMeal}" onclick=swift("${mile.idMeal}") id="pad"><i class="fas fa-times"></i></button>`;  
     list.appendChild(ele);
 }
 function swift(classid)
 {       
          removeMealfromLS(classid);
        const fall=document.getElementsByClassName(classid);
        fall[0].parentNode.removeChild(fall[0]);
        //   uppermeal.innerHTML='';
        //   getrandomMeal();
 }

 searchbtn.addEventListener("click",async ()=>{
    const walue = searchbox.value;
      uppermeal.innerHTML='';
     const meal= await searchMeal(walue);
     if(meal){
     meal.forEach(meal=> {
         addmeal(meal)
     });}
     else{addmeal(meal);}
     searchbox.value="";

})
async function info(obj)
{   try{throw rock();
        }
        catch(e){}
        // var pos=window.scrollTop();
    const ob1 = await MealbyID(obj);
    const data=[];
    for(let i=1;i<=20;i++)
    {  if(ob1['strIngredient'+i]!=='')
      {data.push(ob1['strIngredient'+i] + " / "+ ob1['strMeasure'+i]);}
      else{
      break;}
    }
    const frame = document.createElement('div');
    frame.classList.add("recepie");
    frame.innerHTML = ` <div class="pop-meal-items">
    <button onclick=rock()><i  class="fas fa-times" ></i></button>
      <h1>Meal Info</h1>
      <img src="${ob1.strMealThumb}" alt="${ob1.strMeal}">
      <p>${ob1.strInstructions}</p>
      <ul>
        ${data.map((ap)=> 
            `<li> ${ap}</li>`
            ).join("")}
      </ul></div>
    ` ;
 
    const take = document.getElementById("body");
    take.appendChild(frame);
      localStorage.setItem("scrollY",scrollY);
    scrollTo(0,0);
  
}
 function rock()
   {
       const recepie=document.getElementsByClassName("recepie");
       recepie[0].parentNode.removeChild(recepie[0]);
        scrollTo(0,localStorage.getItem("scrollY"));
    }


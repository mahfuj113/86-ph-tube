// fetch category
const handleCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await res.json();
    const tabContainer = document.getElementById("tab-container")

    data.data.forEach(items => {
        const div = document.createElement("div")
        div.innerHTML = `
    <button onclick="handleClick(${items.category_id})" class="p-2 bg-[#25252526] rounded">${items.category}</button>
    `;
        tabContainer.appendChild(div);
    });
}
// global variable 
let globalValue = 0;
// button click to show data and fetch items data
const handleClick = async (id = 1000) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json()
    globalValue = id;

    if (data.data.length > 0) {
        const noDataContainer = document.getElementById("no-data-section")
        noDataContainer.classList.add("hidden")
    }
    else {
        const noDataContainer = document.getElementById("no-data-section")
        noDataContainer.classList.remove("hidden")
    }
    displayCard(data.data);
}
// display card dynamically
const displayCard = (displayParameter) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.textContent = ''

    displayParameter.forEach(items => {
        const convertTime = items.others.posted_date
        const parseTime = Number(convertTime);
        let showTime = 0;
        if (convertTime !== "") {

            const hours = Math.floor(parseTime / 3600)
            const minutes = Math.floor(parseTime % 3600 / 60)
            showTime = hours + " hrs " + minutes + " min ago";

        }
        const div = document.createElement("div")
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl gap-6">
                <figure>
                <div class="relative flex flex-col">
                    <img class="w-80 h-52" src="${items.thumbnail}" alt="Shoes" />
                    <p id="remove-text" class="absolute bottom-2 right-5 bg-[black] text-white rounded">${showTime ? showTime : ''}</p>
                </div> 
                </figure>
                <div class="mt-5">
                    <div class="flex gap-3">
                        <div>
                            <div class="avatar online">
                                <div class="w-14 rounded-full">
                                    <img
                                        src="${items.authors[0].profile_picture}" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 class="text-base font-bold">${items.title}</h1>
                            <p class="flex items-center gap-2 mt-2 mb-2">${items.authors[0].profile_name}<span> ${items.authors[0].verified ? "<img src='./../images/verified.png' alt=''>" : ""}</span></p>
                            <p class="mb-2" id="views-list">${items.others.views} views</p>
                        </div>
                    </div>
                </div>
            </div>
    `;
        cardContainer.appendChild(div)
    });
}
// sort by views handler
const handleSort = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${globalValue}`)
    const data = await res.json()

    const objectSort = data.data
    objectSort.sort((a, b) => {
        const parseFirst = parseInt(a.others.views)
        const parseSecond = parseInt(b.others.views)
        return parseSecond - parseFirst;
    })
    displayCard(objectSort);
}
handleClick()
handleCategory()